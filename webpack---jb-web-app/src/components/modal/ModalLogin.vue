<template>
    <Dialog class="dialog" v-model:visible="show" :showHeader="false" :modal="true" :dismissableMask="true">
        <div class="login">   
            <div class="login-container">

                <div class="logo-container">
                    <img :src="logo_src" />
                </div>
    
                <form @submit.prevent="handleSubmit()">
                    <div class="form-header">
                        <div class="field">
                            <InputText placeholder="Email" id="email" v-model="email" aria-describedby="email-error" />
                        </div>
                        <div class="field">
                            <Password placeholder="Senha" id="password" v-model="password" toggleMask :feedback="false" />
                        </div>
                    </div>
                    <button class="submit-btn" :disabled="loading">
                        <div v-if="!loading"> Entrar</div>
                        <i class="pi pi-spinner pi-spin" v-else/>
                    </button>

                </form>
                
                <div>
                    Ainda não tem uma conta? 
                    <button @click="teste()" style="all: unset; cursor: pointer; font-weight: bold; color: var(--app-primary-color)" href="">
                        Criar Conta
                    </button>
                </div>

            </div>
        </div>
    </Dialog>
</template>

<script>
import { getUnixTime } from "date-fns";

import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

export default {

    name: "ModalLogin",

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
            site_id: null,

            // login
            access_token: "",
            user_logged: {},
            deferredInstallPrompt: null,
            showInstallButton: false,
            logo_src: ''
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
        this.logo_src = this.$store.getters.getSiteConfig?.logo_horizontal_url
        this.site_id = this.$store.getters.getSiteConfig?.id 

        window.addEventListener('beforeinstallprompt', (e) => {            
            // Impede que o mini-infobar apareça em mobile
            e.preventDefault();
            // Guarda evento para que possa ser disparado depois.
            this.deferredInstallPrompt = e;
            // Atualiza UI notifica usuário que pode instalar PWA
            this.showInstallButton = true;
        });
    },
    methods: {
        teste() {
            this.hideLoginModal()
            this.showRegisterModal()
        },

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
                password: this.password,
                site_id: this.site_id
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

                        if (this.user_logged.site_id != this.site_id) {
                            this.$toast.add({ severity: 'error', summary: 'Erro', detail: 'Verique os dados e tente novamente.', life: 3000 });

                            // KEEPING IN VUEX 
                            this.$store.dispatch("setLogged", {
                                isLogged: false,
                                user: {},
                                token: '',
                                expire: expire_date
                            });
                            return;
                        }

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
                    .catch((err) => {
                        this.loading = false
                        this.$toast.add({ severity: 'error', summary: 'Erro', detail: err.response.data.error, life: 3000 });
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


.login {
    display: flex;
    flex-direction: column;
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
    flex-direction: column;
    align-items: center;
    border-radius: 7px;
    gap: 15px;
    margin: 15px;
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


.login-title {
    font-size: 24px;
    font-weight: 600;
    color: white;
    font-family: "Roboto";
}

.logo-container > img {
    width: 220px;
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
 
    .login-container {
        min-width: none;
    }
}

</style>
