<template>
    <ModalWallet :dialog="$store.getters.getWalletModal" @hide="hideWalletModal()"/>
    <ModalRegister :dialog="$store.getters.getRegisterModal" @hide="hideRegisterModal()"/>
    <ModalLogin :dialog="$store.getters.getLoginModal" @hide="hideLoginModal()"/>

    <Dialog class="dialog" v-model:visible="showSellerCode" :showHeader="false" :modal="true" :dismissableMask="true">
		<div class="showcode-container">
			<span class="code-label">Código de recomendação</span>
            <div id="copyCode">
                {{ getCopyCode() }}
            </div>
            <div style="display: flex; gap: 10px">
				<Button @click="handleButtonCopy()">
					<i class="fas fa-copy"></i>
				</Button>
				<Button @click="handleButtonShare()">
					<i class="fas fa-share-alt"></i>
				</Button>
			</div>
		</div>
  	</Dialog>

    <div class="header">
        <nav class="header-desktop">
            <div class="logo-container">
                <router-link to="/">
                    <img class="logo" :src="logo_horizontal_url" :alt="'logo horizontal'" id="logo">
                </router-link> 
            </div>

            <div v-if="is_logged" class="menu">
                <button v-if="this.loggedUser().online == 1" class="btn-refresh" @click="this.loadBalance();">
                    <i class="fas fa-sync"></i>
                </button>
                <button v-if="this.loggedUser().online == 1" @click="toggleWallet()" class="btn-balance">
                    <span>R$ {{this.formatCurrency(parseFloat($store.getters.getBalance ?? 0) + parseFloat($store.getters.getBonusBalance ?? 0))}}</span>
                    <i class="fas fa-plus"></i>
                </button>

                <SplitButton class="btn-profile" icon="fas fa-user" :model="profile_items"/>
            </div>

            <div v-else class="menu">
                <button @click="toggleRegister()" class="btn-register">
                    <i class="fas fa-user"></i>
                    Cadastrar
                </button>
                <button @click="toggleLogin()" class="btn-login">
                    <i class="fas fa-sign-in"></i>
                    Entrar
                </button>
            </div>
        </nav>

        <nav class="header-mobile">
            <router-link to="/">
                <img class="logo-mobile" :src="logo_icon_url" :alt="'logo icon'" id="logo">
            </router-link> 
            <div></div>

            <div v-if="is_logged">
                <button class="btn-refresh" v-if="this.loggedUser().online == 1" @click="this.loadBalance()">
                    <i class="fas fa-sync"></i>
                </button>
                
                <button @click="toggleWallet()" v-if="this.loggedUser().online == 1" class="btn-balance">
                    <span>R$ {{this.formatCurrency(parseFloat($store.getters.getBalance ?? 0) + parseFloat($store.getters.getBonusBalance ?? 0))}}</span>
                    <i class="fas fa-plus"></i>
                </button>
                
                <SplitButton class="btn-profile" icon="fas fa-user" :model="profile_items" />
            </div>

            <div class="menu" v-else >
                <button @click="toggleRegister()" class="btn-register">
                    <i class="fas fa-user"></i>
                    Cadastrar
                </button>
                <button @click="toggleLogin()" class="btn-login">
                    <i class="fas fa-sign-in"></i>
                    Entrar
                </button>
            </div>
        </nav>
    </div>
</template>


<script>
    import Menu from './common/Menu.vue';
    import SplitButton from 'primevue/splitbutton';
    import Dialog from 'primevue/dialog';
    import ModalWallet from './modal/ModalWallet.vue';
    import ModalRegister from './modal/ModalRegister.vue';
    import ModalLogin from './modal/ModalLogin.vue';
    import Button from 'primevue/button'

    export default {

        name: "Navbar",
        
        components: {
            Menu,
            SplitButton,
            Dialog,
            ModalWallet,
            ModalRegister,
            ModalLogin,
            Button
        },

        data() {
            return {
                logo_horizontal_url: null,
                logo_icon_url: null,

                user_logged: {},
                is_logged: false,
                showProfile: false,
                showSellerCode: false,

                profile_items: [],

            }
        },

        created() {
            this.logo_horizontal_url = this.$store.getters.getSiteConfig?.logo_horizontal_url ?? 'https://s3.amazonaws.com/craque.bet/logos/logo.png'
            this.logo_icon_url = this.$store.getters.getSiteConfig?.logo_icon_url ?? 'https://s3.amazonaws.com/craque.bet/logos/logo-brasao.png'
            this.is_logged = this.$store.getters.getLogged;
            this.user_logged = this.$store.getters.getUser;
            this.getProfileItems();
        },

        methods: {
            toggleLogin() {
                if(this.$store.getters.getLoginModal) {
                    this.hideLoginModal()
                } else {
                    this.showLoginModal()
                }
            },

            toggleRegister() {
                if(this.$store.getters.getRegisterModal) {
                    this.hideRegisterModal()
                } else {
                    this.showRegisterModal()
                }
            },

            toggleWallet() {
                if(this.$store.getters.getWalletModal) {
                    this.hideWalletModal()
                } else {
                    this.showWalletModal()
                }
            },

            logout() {

                this.$router.push({
                    path: "/"
                });

                this.$store.dispatch("setBalance", {
                    balance: 0,
                });

                // PUSH TO LOGIN
                this.$store.dispatch("setRegisterModal", {
                    registerModal: false,
                });

                this.$store.dispatch("setLoginModal", {
                    loginModal: false,
                });

                setTimeout(() => {

				    // REMOVE FROM VUEX
                    this.$store.dispatch('setLoggout', {
                        user: {},
                        token: "",
                        isLogged: false,
                        expire: null
                    });

                    window.location.reload()
				}, 1000)

            
            },

            toggleProfile () {
                this.showProfile = !this.showProfile
            },


            toggleCode() {
                this.showSellerCode = !this.showSellerCode
            },

            getProfileItems() {
                if(this.loggedUser().online == 1) {
                    this.profile_items = [
                        {
                            label: 'Minha conta',
                            icon:'fas fa-user',
                            command: () => {
                                window.location.href = '/account'
                            }
                        },

                        {
                            label: 'Carteira',
                            icon:'far fa-wallet',
                            command: () => {
                                window.location.href = '/wallet'
                            }
                        },
                        {
                            label: 'Solicitações',
                            icon:'far fa-money-check-alt',
                            command: () => {
                                window.location.href = '/solicitations'
                            }
                        },
                        {
                            label: 'Recomendar amigos',
                            icon:'fas fa-share-alt',
                            command: () => {
                                this.toggleCode()
                            }
                        },
                        {
                            label: 'Sair',
                            icon:'fas fa-sign-out',
                            to: '/',
                            command: () => {
                                this.logout();
                            }
                        },
                    ]
                } else {
                    this.profile_items = [
                        {
                            label: 'Minha conta',
                            icon:'fas fa-user',
                            command: () => {
                                window.location.href = '/account'
                            }
                        },
                        {
                            label: 'Link de recomendação',
                            icon:'fas fa-share-alt',
                            command: () => {
                                this.toggleCode()
                            }
                        },
                        {
                            label: 'Sair',
                            icon:'fas fa-sign-out',
                            to: '/',
                            command: () => {
                                this.logout();
                            }
                        },
                    ]
                }
            },

            handleButtonShare() {
                var text = ''

                if(window.location.hostname.includes('seubicho')) {
                    text = 'https://seubicho.com/registro/' + this.user_logged.code
                } else {
                    text = 'https://seupalpite.bet/registro/' + this.user_logged.code
                }
                
                navigator.share({
                    title: "Link de recomendação",
                    text: text
                })
            },

            async handleButtonCopy() {
                // Selecionar o conteúdo da div
                var range = document.createRange();
                range.selectNode(document.getElementById('copyCode'));
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);

                // Copiar o conteúdo selecionado para a área de transferência
                var successful = document.execCommand('copy');
                    
                if (successful) {
                    alert('Copiado')
                } else {
                    alert('Não foi possivel copiar.')
                }

               
            },

            getCopyCode() {
                var text = ''

                if(window.location.hostname.includes('seubicho')) {
                    text = 'https://seubicho.com/registro/' + this.user_logged.code
                } else {
                    text = 'https://seupalpite.bet/registro/' + this.user_logged.code
                }

                return text
            }
            
        },

    }
</script>

<style>

.header-desktop {
    display: flex;
    justify-content: space-between;    
    align-items: center;
    padding: 0px 15px 0px;
    width: 100%;
    background-color: var(--bg-primary);
}

.header-mobile {
    display: none;
    width: 100%;
    padding: 0 15px;
    justify-content: space-between;
}

.header-mobile > div {
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo {
    width: 210px;
}

.logo-mobile {
    height: 45px;
}

.toggle-button {
    border: none;
    background-color: transparent;
}
.menu {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}
.btn-login, .btn-register {
    cursor: pointer;
    color: white;
    font-weight: 600;
    font-size: 14px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: var(--app-primary-color);
}
.btn-login:hover {
    background-color:#4d4d4d;
}
.btn-login {
    background-color: #414141;
    border: solid var(--border-color) 1px;
}
.btn-login a, .btn-register a {
    color: white;
    text-decoration: none;
    transition: .5s;
}

.btn-login-mobile, .btn-profile {
    border-radius: 50%;
    border: none;
    background-color: var(--bg-secondary) ;
    color: white;
    font-size: 18px;
    cursor: pointer;
}

.p-button.p-button-icon-only {
/*     background-color: var(--bg-secondary) !important;
 */    height: 40px;
}

.p-button.p-button-icon-only:hover {
    background-color: #4d4d4d !important;
}

.btn-balance, .btn-refresh {
    margin-right: 10px;
    background-color: var(--bg-secondary);
    color: white;
    border: none;
    border-radius: 7px;
    padding: 0px 10px;
    height: 40px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
}

.btn-balance:hover, .btn-refresh:hover {
    background-color: #4d4d4d;
}

.btn-balance > i {
    margin-left: 10px;
    background-color: white;
    color: var(--bg-secondary);
    padding: 5px;
    border-radius: 7px;
}

.showcode-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px
}

.code-label {
    font-size:18px;
    font-weight: bold;
    align-self: center
}


#copyCode {
    padding: 10px;
    border-radius: 7px;
    border: solid #3f4b5b 1px
}

@media screen and (max-width: 600px) {
    .header-desktop {
        display: none;
    }
    .header-mobile {
        display: flex;
    }
    .btn-login-mobile {
        display: block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
        border: none;
        background-color: var(--app-primary-color);
        color: white;
        font-size: 18px;
    }
  
}

</style>