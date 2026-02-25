<template>
    <Dialog class="dialog" v-model:visible="show" :showHeader="false" :modal="true" :dismissableMask="true">
        <ConfirmDialog/>

        <div class="register">
            <div class="card">
                <div class="logo-container">
                    <img :src="logo_src" />
                </div>

                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                    <div class="field">
                        <div class="p-float-label">
                            <InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" />
                            <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">Nome:</label>
                        </div>

                        <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">
                            O nome é obrigatório.
                        </small>
                    </div>

                    <div class="field">
                        <div class="p-float-label">
                            <InputMask id="cpf" v-model="v$.cpf.$model" mask="999.999.999-99" :class="{'p-invalid':v$.cpf.$invalid && submitted}"/>
                            <label for="cpf" :class="{'p-error':v$.cpf.$invalid && submitted}">Cpf:</label>
                        </div>

                        <small v-if="(v$.cpf.$invalid && submitted) || v$.cpf.$pending.$response" class="p-error">
                            O CPF é obrigatório.
                        </small>
                    </div>

                    <div class="field">
                        <div class="p-float-label">
                            <InputMask id="cep" v-model="v$.cep.$model" mask="99999-999" :class="{'p-invalid':v$.cep.$invalid && submitted}"/>
                            <label for="cep" :class="{'p-error':v$.cep.$invalid && submitted}">Cep:</label>
                        </div>

                        <small v-if="(v$.cep.$invalid && submitted) || v$.cep.$pending.$response" class="p-error">
                            O CEP é obrigatório.
                        </small>
                    </div>

                    <div class="field">
                        <div class="p-float-label">
                            <InputMask id="birthdate" v-model="v$.birthdate.$model" mask="99/99/9999" :class="{'p-invalid':v$.birthdate.$invalid && submitted}" />
                            <label for="birthdate" :class="{'p-error':v$.birthdate.$invalid && submitted}">Data de nascimento:</label>
                        </div>

                        <small v-if="(v$.birthdate.$invalid && submitted) || v$.birthdate.$pending.$response" class="p-error">
                            A data de nascimento é obrigatória.
                        </small>
                    </div>

                    <div class="field">
                        <div class="p-float-label p-input-icon-right">
                            <i class="pi pi-envelope" />
                            <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"/>
                            <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email*</label>
                        </div>

                        <span v-if="v$.email.$error && submitted">
                            <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                            <small class="p-error">{{error.$message}}</small>
                            </span>
                        </span>

                        <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">
                            O E-mail é obrigatório.
                        </small>
                    </div>

                    <div class="field">
                        <div class="p-float-label p-input-icon-right">
                            <i class="pi pi-phone" />
                            <InputMask id="phone" v-model="v$.phone.$model" mask="(99) 999999999" :class="{'p-invalid':v$.phone.$invalid && submitted}" aria-describedby="phone-error"/>
                            <label for="phone" :class="{'p-error':v$.phone.$invalid && submitted}">Telefone*</label>
                        </div>

                        <span v-if="v$.phone.$error && submitted">
                            <span id="phone-error" v-for="(error, index) of v$.phone.$errors" :key="index">
                            <small class="p-error">{{error.$message}}</small>
                            </span>
                        </span>

                        <small v-else-if="(v$.phone.$invalid && submitted) || v$.phone.$pending.$response" class="p-error">
                            O Telefone é obrigatório.
                        </small>
                    </div>

                    <div class="field">
                        <div class="p-float-label">
                            <InputText id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" />
                            <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Senha*</label>
                        </div>

                        <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">
                            A senha é obrigatória.
                        </small>
                    </div>

                    <div v-if="code" class="field">
                        <div class="p-float-label">
                            <InputText disabled id="code" v-model="v$.code.$model" />
                            <label for="code">Cód. de recomendação</label>
                        </div>
                    </div>
                
                    <Button type="submit" label="Cadastrar" :loading="loading"/>
                </form>
            </div>
        </div>
    </Dialog>
</template>


<script>
    import Dialog from 'primevue/dialog';
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import InputMask from 'primevue/inputmask'
    import Divider from 'primevue/divider'
    import Password from 'primevue/password';
    import { useVuelidate } from "@vuelidate/core"
    import { required } from "@vuelidate/validators";
    import ConfirmDialog from 'primevue/confirmdialog';
    import axios from 'axios';

    export default {

        name: "ModalRegister",

        props: {
            dialog: Boolean,
        },
        
        components: {
            Dialog,
            Button,
            InputText,
            InputMask,
            Password,
            Divider,
            ConfirmDialog
        },

        setup: () => ({ v$: useVuelidate() }),

        data() {
            return {
                show: false,
                logo_src: '',
                region_id: null,
                site_id: null,

                name: null,
                code: null,
                email: null,
                phone: null,
                cpf: null,
                cep: null,
                password: null,
                user_cep: {},
                birthdate: null,
                submitted: false,
                loading: false,
            }
        },

        validations() {
            return {
                name: {
                    required
                },
                email: {
                    required
                },
                phone: {
                    required
                },
                cpf: {
                    required
                },
                code: {
                    required: false
                },
                cep: {
                    required
                },
                password: {
                    required
                },
                birthdate: {
                    required
                }
            }
        },
        
        watch: {
            dialog: function (val) {
                this.code = this.$store.getters.getRegisterCode
                this.show = val;
            },
        },

        created() {
		    this.logo_src = this.$store.getters.getSiteConfig?.logo_horizontal_url
            this.region_id = this.$store.getters.getSiteConfig?.region_id
            this.site_id = this.$store.getters.getSiteConfig?.id
        },

        methods: {

            validatePhone(phone) {
                // Remover todos os caracteres que não sejam dígitos
                const phoneString = phone.replace(/\D/g, '');

                // Verificar se o número tem a quantidade correta de dígitos
                if (phoneString.length !== 11) {
                    return false;
                }

                // Verificar se todos os dígitos do número são iguais (ex: 1111111111)
                const digitosIguais = /^(.)\1+$/;
                if (digitosIguais.test(phoneString)) {
                    return false;
                }

                // Verificar se o primeiro dígito é 0 ou 1 (no Brasil, os DDDs não começam com 0 ou 1)
                const primeiroDigito = phoneString.charAt(0);
                if (primeiroDigito === '0') {
                    return false;
                }

                // Se a função não retornou false até este ponto, o número é válido
                return true;
            },

            validateCpf(cpf) {
                cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
                
                if (cpf.length !== 11) {
                    return false;
                }
                
                // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
                if (/^(\d)\1+$/.test(cpf)) {
                    return false;
                }
                
                // Validação do primeiro dígito verificador
                let soma = 0;
                for (let i = 0; i < 9; i++) {
                    soma += parseInt(cpf.charAt(i)) * (10 - i);
                }
                let resto = 11 - (soma % 11);
                let digitoVerificador1 = (resto === 10 || resto === 11) ? 0 : resto;
                
                if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
                    return false;
                }
                
                // Validação do segundo dígito verificador
                soma = 0;
                for (let i = 0; i < 10; i++) {
                    soma += parseInt(cpf.charAt(i)) * (11 - i);
                }
                resto = 11 - (soma % 11);
                let digitoVerificador2 = (resto === 10 || resto === 11) ? 0 : resto;
                
                if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
                    return false;
                }
                
                return true;
            },

            handleSubmit(isFormValid) {
                this.submitted = true;

                if (!isFormValid) {
                    return;
                }

                if(!this.region_id || !this.site_id) {
                    this.$toast.add({severity:'error', summary: 'Erro', detail:'Ocorreu um erro inesperado. Tente novamente mais tarde.', life: 3000});
                    return
                }

                if(!this.validateCpf(this.cpf)) {
                    this.$toast.add({severity:'error', summary: 'Erro', detail:'Cpf inválido.', life: 3000});
                    return
                }

                if(!this.validatePhone(this.phone)) {
                    this.$toast.add({severity:'error', summary: 'Erro', detail:'Telefone inválido.', life: 3000});
                    return
                }

                
                this.loading = true
                
                axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
                .then((response) => {

                    if (response.data.erro) {
                        this.loading = false
                        return this.$toast.add({severity:'error', summary: 'Erro', detail:'Cep inválido.', life: 3000});
                    }

                    this.user_cep = response.data;

                    var createUser = {
                        name: this.name,
                        email: this.email,
                        phone: this.phone,
                        cpf: this.cpf,
                        password: this.password,
                        type: 'cambista',
                        online: 1,
                        cep: this.user_cep.cep,
                        uf: this.user_cep.uf,
                        city: this.user_cep.localidade,
                        neighborhood: this.user_cep.bairro,
                        birthdate: this.birthdate,
                        code: this.code,
                        region_id: this.region_id,
                        site_id: this.site_id
                    }

                    this.$api.post('/users/store', createUser, {
                        headers: {
                            Authorization: `Bearer ${this.accessToken()}`
                        },
                    })
                    .then(() => {
                        this.loading = false
                        this.$toast.add({
                            severity: 'success', 
                            summary: 'Sucesso', 
                            detail:  this.region_id == 25 ? 
                                ` Obrigado pelo seu cadastro! \n  Agora vá até a sua caixa de email e clique em validar para começar a apostar!` 
                                : 
                                'Cadastro realizado com sucesso!'
                            , 
                            life: 5000
                        });
                        
                        this.$router.push({
                            path: "/"
                        })

                        setTimeout(() => {
                            window.location.reload();
                        }, 5000); 
                    })
                    .catch((e) => {
                        this.loading = false
                        this.$toast.add({severity:'error', summary: 'Erro', detail:e.response.data.error, life: 3000});
                    });
                })
                .catch(() => {
                    this.loading = false
                    this.$toast.add({severity:'error', summary: 'Erro', detail:'Cep inválido.', life: 3000});
                })
            },

            resetForm() {
                this.name = '';
                this.submitted = false;
            },

            toggle() {
                this.$emit('toggle');
            }
        },

    }
</script>


<style scoped lang="scss">
.logo-container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}
.logo-container > img {
    width: 220px;
}
.register {

    .field {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

.card{
    display: flex;
    flex-direction: column;
    min-width: 400px;
}

form {
    width: 100%;
}

.field {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1.5rem;

  img {
    width: 100px;
  }
}

.p-float-label {
    width: 100%;
}

.btn-submit-login {
    width: 100%;
    cursor: pointer;
    color: white;
    font-weight: 600;
    font-size: 14px;
    margin-right: 10px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: var(--app-primary-color);
}

.calendar {
    z-index: 9999;
}

@media screen and (max-width: 800px) {
    .card {
        width: 100%;
        min-width: 0;
    }
}

.container {
    display: flex;
    justify-content: center;

    .field {
        display: flex;
        flex-direction: column;
    }
}
</style>