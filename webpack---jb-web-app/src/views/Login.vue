<template>
    <div class="login">
        <div style="margin-bottom: 20px;" class="logo-container">
            <img src="../assets/logo_color.svg" />
        </div>
            
        <div class="login-container">

            <div class="install-pwa" v-if="showInstallButton" @click="installPWA">
                <i class="pi pi-download"></i> Instalar
            </div>

            <div class="login-header">
               <h3>Banca única</h3>
               <span>Faça login para continuar</span>
            </div>
            
            <form @submit.prevent="handleSubmit()">
                <div class="form-header">
                    <div class="field">
                        <InputText id="email" v-model="email" aria-describedby="email-error" />
                    </div>
                    <div class="field">
                        <Password id="password" v-model="password" toggleMask :feedback="false" />
                    </div>
                </div>
                <button class="submit-btn" :disabled="loading">
                    <div v-if="!loading"> Entrar</div>
                    <i class="pi pi-spinner pi-spin" v-else/>
                </button>

            </form>
            
            <!-- <div class="box-register">
                <span>Ainda não tem uma conta?</span>

                <router-link @click="this.modalLogin = false" class="btn-register" to="/register">
                    Criar uma conta!
                </router-link>
            </div> -->
        </div>
    </div>
</template>

<script>
import { getUnixTime } from "date-fns";

import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

export default {

    name: "Login",

    props: {
        dialog: Boolean,
    },

    components: {
        Dialog,
        InputText,
        Password,
        Button,
    },

    data() {
        return {
            // form
            email: '',
            password: '',
            show: false,
            loading: false,

            // login
            access_token: "",
            user_logged: {},
            deferredInstallPrompt: null,
            showInstallButton: false,
        }
    },

    watch: {
        // WATCH THE VALUE TO OPEN THE MODAL
        dialog: function (val) {
            this.show = val;
        },

        show: function (val) {
            val || this.toggle();
        }
    },
    created() {
        console.log('Created');
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log(`'beforeinstallprompt' event was fired.`);
            
            // Impede que o mini-infobar apareça em mobile
            e.preventDefault();
            // Guarda evento para que possa ser disparado depois.
            this.deferredInstallPrompt = e;
            // Atualiza UI notifica usuário que pode instalar PWA
            this.showInstallButton = true;
        });
    },
    methods: {
        async installPWA() {
            // Esconde a promoção de instalação fornecida pelo app
            this.showInstallButton = false
            // Mostra prompt de instalação
            this.deferredInstallPrompt.prompt();
            // Espera usuário responder ao prompt
            const { outcome } = await this.deferredInstallPrompt.userChoice;
            // Opcionalmente, enviar evento analytics com resultado da escolha do usuário
            console.log(`User response to the install prompt: ${outcome}`);
            // Usamos o prompt e não podemos usar de novo; jogue fora
            this.deferredInstallPrompt = null;
        },
        handleSubmit () {
            this.loading = true
            this.$api.post("/auth/login", {
                username: this.email,
                password: this.password
            })
                .then(response => {
                    this.access_token = response.data.access_token;
                    let expire_date = getUnixTime(new Date);
                    expire_date += response.data.expires_in - 300;

                    this.$api.get("/auth/me", {
                        headers: {
                            Authorization: `Bearer ${response.data.access_token}`
                        }
                    })
                        .then(response => {
                            this.user_logged = response.data;
                            this.loading = false

                            // apenas cambistas tem acesso
                            if (this.user_logged.type != "cambista") {
                                this.$toast.add({ severity: 'error', summary: 'Erro', detail: 'Usuário não permitido.', life: 3000 });

                                // KEEPING IN VUEX 
                                this.$store.dispatch("setLogged", {
                                    isLogged: false,
                                    user: {},
                                    token: '',
                                    expire: expire_date
                                });
                                return;
                            }

                            if (this.user_logged.situation == "bloqueado") {
                                this.$toast.add({ severity: 'error', summary: 'Erro', detail: 'Terminal bloqueado.', life: 3000 });

                                // KEEPING IN VUEX 
                                this.$store.dispatch("setLogged", {
                                    isLogged: false,
                                    user: {},
                                    token: '',
                                    expire: expire_date
                                });
                                return;
                            }


                            // KEEPING IN VUEX 
                            this.$store.dispatch("setLogged", {
                                isLogged: true,
                                user: this.user_logged,
                                token: this.access_token,
                                expire: expire_date,
                                talao: this.user_logged.talao
                            });


                            this.$api.get('/regions/regionConfig', {
                                headers: {
                                    Authorization: this.accessToken()
                                },
                                params: {
                                    id: this.user_logged.region_id
                                }
                            })
                            .then((response) => {
                                this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Login realizado com sucesso!', life: 3000 });
                                this.resetFields()

                                this.$store.dispatch("setRegionConfig", {
                                    regionConfig: response.data,
                                });

                                this.$store.dispatch("setProducts", {
                                    products: {
                                        tradicional: {...response.data.products.find(product => product.name == 'tradicional')},
                                        ligeirinha: {...response.data.products.find(product => product.name == 'ligeirinha')},
                                        instantaneo: {...response.data.products.find(product => product.name == 'instantaneo')},
                                        bauzinho: {...response.data.products.find(product => product.name == 'bauzinho')},
                                        bolao_dezenas: {...response.data.products.find(product => product.name == 'bolao de dezenas')},
                                        quininha: {...response.data.products.find(product => product.name == 'quininha')},
                                        quina_brasil: {...response.data.products.find(product => product.name == 'quina brasil')},
                                        seninha: {...response.data.products.find(product => product.name == 'seninha')},
                                        lt: {...response.data.products.find(product => product.name == 'lt')},
                                    }
                                });

                                this.$router.push({
                                    path: "/"
                                })

                                setTimeout(() => {
                                    window.location.reload();
                                }, 300);

                            })

                        })
                        .catch(() => {
                            this.loading = false
                            this.$toast.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível realizar o login.', life: 3000 });
                        });

                })
                .catch(() => {
                    this.loading = false
                    this.$toast.add({ severity: 'error', summary: 'Erro', detail: 'Verique os dados e tente novamente.', life: 3000 });
                });

        },

        resetFields() {
            this.email = '';
            this.password = '';
            this.toggle();
        },

        toggle() {
            this.$emit('toggle');
        }
    },
}
</script>

<style>

.p-input-icon-right > .p-inputtext {
    padding-right: 2.5rem;
    width: 100%;
}

</style>

<style scoped lang="scss">

:deep(.p-inputtext) {
    border: solid white 2px;
}
:deep(.p-inputtext:enabled:hover) {
    border: solid white 2px;
}

.login {
    background-color: #49515f;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
}

.install-pwa{
    position: absolute;
    padding: 8px 15px;
    border-radius: 10px;
    top: 0;
    right: 40px;
    transform: translateY(-50%);
    background-color: var(--app-primary-color);
    color: white;
    cursor: pointer;
    &:hover{
        filter: brightness(1.1);
    }
}

.login-container {
    display: flex;
    background: #293241;
    position: relative;
    flex-direction: column;
    align-items: center;
    border-radius: 7px;
    padding: 30px;
    margin: 20px;
    gap: 15px;
    width: 400px;
    margin: 15px;
    box-shadow: 0 4px 10px rgba(0,0,0,.03),0 0 2px rgba(0,0,0,.06),0 2px 6px rgba(0,0,0,.12)!important;
}

.box-register {
    margin: 15px 0;
    font-size: 14px;
    display: flex;
    gap: 10px;
    align-items: center;

    .btn-register {
        text-align: center;
        font-family: Montserrat, sans-serif;
        font-weight: 600;
        color: var(--text-white);
        display: block;
        cursor: pointer;
        text-decoration: none;

        //text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
}

.login-header {
   width: 100%;
}

.logo-container {
    height: 120px;
    width: 120px;
}

.login-title {
    font-size: 24px;
    font-weight: 600;
    color: white;
    font-family: "Roboto";
}

.logo-container > img {
    height: 100%;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    height: 100%;
}

.form-header {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.field {
    display: flex;
    font-size: 14px;
    font-weight: bold;
    width: 100%;
    flex-direction: column;
    gap: 10px;
}

.submit-btn {
    background: var(--app-primary-color);
    border-radius: 5px;
    border: none;
    padding: 10px;
    color: white;
    font-size: 16px;
}

@media screen and (max-width: 800px) {

    .login {
        background-image: url('../assets/app-background.png');
        background-size: cover;
    }

    .login-container {
        padding: 20px;
        width: 90%;
    }
}

</style>