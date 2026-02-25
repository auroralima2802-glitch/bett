<template>
	<Toast position="top-center" />
	<Dialog v-model:visible="showDialog" :showHeader="false" :modal="true"> <!-- dialog de sessão expirada -->
		<div style="display: flex; justify-content: center; flex-direction: column">
			<span>Sua sessão expirou.</span>
			<span>Realize login novamente para continuar.</span>
			<button @click="confirmDialog" class="btn-confirm">OK</button>
		</div>
  	</Dialog>

	<!-- LAYOUT ONLINE -->
	<template v-if="!hostname.includes('uniaoweb') && !hostname.includes('abc') && $store.getters.getSiteConfig">
		<div class="container">
			<Navbar/>
			<AsideLeft />
			<MainContent />
			<MenuBottom />
		</div>
	</template>
	
	<!-- LAYOUT REVENDEDOR -->
	<template v-else>
		<div v-if="$store.getters.getLogged" class="container">
			<Navbar/>
			<AsideLeft />
			<MainContent />
			<MenuBottom />
		</div>

		<div v-else>
			<router-view name="notLogged"/>
		</div>
	</template>

</template>

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet"/>

<script>

import Navbar from './components/Navbar.vue'
import AsideLeft from './components/AsideLeft.vue'
import AsideRight from './components/AsideRight.vue'
import MainContent from './components/MainContent.vue'
import MenuBottom from './components/MenuBottom.vue'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'
import Login from './views/Login.vue'

export default {
	components: {
		Toast,
		Dialog,
		Login,
		Navbar,
		AsideLeft,
		MainContent,
		AsideRight,
		MenuBottom,
	},

	data() {
		return {
			logo_src: '',
			app_name: 'Banca única online',
            inactivityTimer: '',
			showDialog: false,
			hostname: window.location.hostname,
		}
	},

	mounted() {
		if(!this.hostname.includes('uniaoweb') && !this.hostname.includes('abc')){ // se for online
			this.loadSiteConfig()
		} else { // se for revendedor
			this.startInactivityTimer() // Inicia o timer para deslogar o usuario inativo
		}
	}, 

    methods: {
		changeFavicon() {
			const link = document.querySelector("link[rel*='icon']");
			
			if (link) {
				link.href = this.$store.getters.getSiteConfig?.icon_url;
			} else {
				const newLink = document.createElement('link');
				newLink.rel = 'icon';
				newLink.href = this.$store.getters.getSiteConfig?.icon_url;
				document.head.appendChild(newLink);
			}
		},

		loadSiteConfig() {
			if(this.$store.getters.getSiteConfig) {
				this.$store.getters.getSiteConfig.primary_color ? document.documentElement.style.setProperty('--app-primary-color', this.$store.getters.getSiteConfig.primary_color) : '';
				this.$store.getters.getSiteConfig.bg_primary ? document.documentElement.style.setProperty('--bg-primary', this.$store.getters.getSiteConfig.bg_primary) : '';
				this.$store.getters.getSiteConfig.bg_secondary ? document.documentElement.style.setProperty('--bg-secondary', this.$store.getters.getSiteConfig.bg_secondary) : '';
				this.$store.getters.getSiteConfig.border_color ? document.documentElement.style.setProperty('--border-color', this.$store.getters.getSiteConfig.border_color) : '';
				this.changeFavicon()
				return
			}

			this.$api.get('siteConfig/' + window.location.hostname, {
				headers: {
					Authorization: this.accessToken(),
				}
			})
			.then((response) => {
				document.documentElement.style.setProperty('--app-primary-color', response.data.primary_color);
				document.documentElement.style.setProperty('--bg-primary', response.data.bg_primary);
				document.documentElement.style.setProperty('--bg-secondary', response.data.bg_secondary);
				document.documentElement.style.setProperty('--border-color', response.data.border_color);

				this.$store.dispatch("setSiteConfig", {
					siteConfig: response.data,
				});

				this.changeFavicon()
			})
		},

        startInactivityTimer() {
            clearInterval(this.inactivityTimer)
        
            // A cada 10 segundos verifica se está inativo
            // e entao faz logout se estiver
            this.inactivityTimer = setInterval( () => {
                if(this.$store.getters.getIsInactive) {
					this.showDialog = true
                }
            }, 10000)
        },

		confirmDialog() {
			this.showDialog = false
			this.logOut()
			window.location.reload()
		}
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

#wbot-open-chat {
	display: none;
}

.close-widgets-container {
	left: -10px !important;
}

/***** GLOBAL *****/
* {
	margin: 0;
	padding: 0;
	font-family: 'Inter', 'Arial';
	box-sizing: border-box;
}


:root {
	--app-primary-color: #0871cd;
	--bg-primary: #20252c;
	--bg-secondary: #2a323d;
	--text-color--primary: white;
	--border-color: #3f4b5b;
}

::-webkit-scrollbar-track {
	background-color: transparent;
}

::-webkit-scrollbar {
	width: 4px;
	height: 8px;
}

::-webkit-scrollbar-thumb {
	background: var(--bg-secondary);
	border-radius: 7px;
}

.p-button {
	background-color: var(--app-primary-color) !important;
	border: none !important;
	color: white !important;
}

h2,
h3 {
	color: white;
}

h4 {
	font-weight: bold;
}

body:has(.bolao-dezenas, .lt, .quina-brasil, .quininha, .seninha, .bau, .tradicional, .ligeirinha, .instantaneo) {
    overscroll-behavior: contain;
}


/* body {
	display: flex;
	background-color: var(--bg-primary);
	justify-content: center;
} */

/******* GRID ******/

.container {
	display: grid;
	height: 100vh;
	/* max-width: 1800px; */
	grid-template-columns: 240px 1fr 280px;
	grid-template-rows: 60px 90vh;
	grid-template-areas: "header header header"
		"asideLeft main main"
		"asideLeft main main";
	
}

.header {
	grid-area: header;
	background-color: var(--bg-primary);
	border-bottom: 2px solid rgba(0, 0, 0, .3);
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.aside-left {
	grid-area: asideLeft;
	background-color: var(--bg-primary);
	overflow: auto;
}

.main {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	grid-area: main;
	background-color: var(--bg-primary);
	overflow: auto;
}

.aside-right {
	grid-area: asideRight;
	background-color: var(--bg-primary);
	overflow: auto;
}

.menu-bottom {
	display: none;
	grid-area: menuBottom;
	position: fixed;
	z-index: 99;
	bottom: 0;
	border-top: 2px solid rgba(0, 0, 0, .2);
	background-color: var(--bg-primary);
}

.btn-confirm {
	background: var(--app-primary-color);
    color: white;
    border: none;
    border-radius: 7px;
    height: 30px;
}

/* SIDEBAR */


.p-sidebar .p-sidebar-header {
    padding: 1.5rem 1.25rem !important;
}

.p-sidebar-header-content {
    width: 100% ;
    display: flex ;
    align-items: center ;
    justify-content: center ;
}

.p-sidebar {
    background-color: var(--bg-primary) !important;
}

.bottom-select {
	height: 90vh !important;
}

.p-galleria .p-galleria-indicators .p-galleria-indicator.p-highlight button {
    background: var(--app-primary-color) !important;
    width: 25px;
    height: 10px;
    border-radius: 7px;
}

.p-galleria .p-galleria-indicators .p-galleria-indicator button {
	width: 25px !important;
    height: 10px !important;
    border-radius: 7px !important; 
}

.p-highlight {
    border-bottom: solid var(--app-primary-color) 3px;
}

/* :deep(.p-sidebar-bottom) {
	height: 90vh !important;
	border-top-right-radius: 7px;
    border-top-left-radius: 7px;
} */

/* .p-sidebar-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90vh !important;
} */

.sidebar-right {
	border: none !important;
	width: 100% !important;
	height: 100%;
}

.p-divider.p-divider-horizontal {
	margin: 0.5rem 0;
	padding: 0 1rem;
    background: #ffffff2e;
	height: 1px;
}

.p-sidebar-right > .p-sidebar-header{
	display: none;
}

.p-sidebar-content {
	height: 100%;
	padding: 0px 0px !important;
}

.p-panelmenu-content {
    background-color: var(--bg-primary) !important;
    border: none;
}
.p-panelmenu-header > a {
    background-color: transparent !important;
    border: none !important;
}

.p-panelmenu-header > a:focus, .p-menuitem-link:focus { 
    box-shadow: none !important;
}

.p-panelmenu-header-link{
    border-radius: 7px !important;
    margin-bottom: 3px;
}

.p-panelmenu-header-link:hover {
    background-color: var(--bg-secondary) !important;
}

.p-panelmenu-header-link:focus {
    background-color: var(--bg-secondary) !important;
}

.p-menuitem-icon {
    margin-right: 15px !important;
    color: #878e97;
}

/* DIALOG */

.p-dialog {
	border: none !important;
	margin: 10px;
	min-width: 300px;
}

.p-dialog-content {
    border-radius: 7px !important;
}

.p-dialog .p-dialog-content {
	background: var(--bg-secondary) !important;
	padding: 1rem !important;
	height: 100% !important;
}

.p-tieredmenu-overlay {
	background: var(--bg-secondary) !important;
}

.p-dialog-header, .p-dialog-footer {
    padding: 10px !important;
	background: var(--bg-secondary) !important;
}

.p-dialog .p-dialog-header {
    padding: 0px 15px !important;
}

.p-dialog .p-dialog-footer button {
    padding: 5px 7px !important;
}

.p-accordion-header-link {
	background: var(--bg-secondary) !important;
}

.p-accordion-content {
	background: var(--bg-secondary) !important;
}

.p-sidebar-close {
    background: var(--bg-secondary) !important;
	position: absolute !important;
}

.p-dialog.p-confirm-dialog .p-confirm-dialog-icon {
    display: none;
}

.p-dialog.p-confirm-dialog .p-confirm-dialog-message {
    margin-left: 0!important;
}

.p-dialog .p-dialog-header .p-dialog-title {
    font-size: 16px !important;
}

/* TABELAS */
.p-datatable-header {
	background: var(--bg-secondary) !important;
	display: flex;
	justify-content: center;
	border-top-left-radius: 7px;
	border-top-right-radius: 7px;
}

th, td {
	background: var(--bg-secondary) !important;
}

.p-datatable-sm td {
	text-align: center !important;
	padding: 0.3rem 0.3rem !important;
}

.p-datatable-sm {
	width: 100%;
}

.p-column-header-content {
	justify-content: center;
}

/* MULTISELECT */

.p-multiselect, .p-dropdown, .p-inputtext, .p-multiselect-header, .p-multiselect-items-wrapper, .p-dropdown-items-wrapper, .p-datepicker-header, .p-datepicker:not(.p-datepicker-inline){
    background: var(--bg-secondary) !important;
}


.p-multiselect-label {
    color: #e2e3e4;
}

.p-checkbox-box {
    border-color: #3f4b5b !important;
}

.p-checkbox-icon {
    color: white !important;
}

.row-background {
	background-color: #1d2229 !important;
}

/* TABVIEW */
.p-carousel .p-carousel-indicators .p-carousel-indicator.p-highlight button {
   background-color: var(--app-primary-color) !important;
}

.p-carousel .p-highlight {
	border: none !important;
}

.p-carousel-indicator {
	border-radius: 7px;
}

.p-highlight {
    background: transparent !important;
    /* color: white !important; */
    /* border-radius: 7px !important; */
    border-bottom: solid var(--app-primary-color) 3px;
	color: white !important;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
	box-shadow: none !important
}

.p-tabview-panels {
    background: none !important;
	padding: 1.25rem 0 !important;
}

.p-tabview .p-tabview-nav {
   border: none !important;
}

.p-tabview-nav-link {
    background: none !important;
    border-radius: 7px;
	border: none !important;
	color: white !important;
    font-weight: 500 !important;
    padding: 10px !important;
	/* background: var(--bg-primary) !important; */
    border-radius: 7px;
}


/* TOAST */
.p-toast-message {
	background-color: var(--bg-secondary) !important; 
	color: white !important;
	border: solid #3f4b5b 1px !important;
}

.p-toast {
    position: fixed;
    width: 450px !important;
}

.p-toast-icon-close, .p-toast-icon {
	color: white !important;
	background-color: red;
}

.p-toast-message-error .p-toast-message-icon {
    color: #d55360 !important;
    border-radius: 50% !important;
    padding: 10px !important;
	font-size: 24px !important;
}

.p-toast-message-success .p-toast-message-icon {
    color: #48a537 !important;
	border-radius: 50% !important;
    padding: 10px !important;
	font-size: 24px !important;
}

.p-toast .p-toast-message .p-toast-message-content {
	display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem !important;
}

/* Fieldset */

fieldset {
	width: 100%;
    filter: drop-shadow(0 0 3px rgba(0,0,0,.333333));
    padding: 10px;
    border-radius: 7px;
    background-color: var(--bg-secondary);
    border: 0;
    box-shadow: 0 0 5pxrgba(0,0,0,.3333333333333333);
    margin: 10px auto;
    color: #fff;
    font-family: Poppins,sans-serif;
    font-weight: 400;
}

legend {
    font-weight: 600;
    margin-left: 10px;
    padding: 0 5px;
    background: var(--bg-secondary);
    border-radius: 50vw;
    padding: 10px 20px;
    height: 40px;
    filter: drop-shadow(0 0 3px rgba(0,0,0,.333333));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}


/* IMPRESSÃO */

button {
    justify-content: center;
}

.fas{
    font-family: "Font Awesome 6 Pro" ;
}

.print-btn{
	padding: 8px 13px !important;
	font-size: 20px !important;
    z-index: 5;
}

.p-dialog button{
    margin: 5px 0;
    width: 100%;
}

.print{
   display: flex;
   align-items: center;
   gap: 10px;
}

.connected{
    background-color: mediumseagreen !important;
}

@media screen and (max-width: 800px) {
	.close-widgets-container {
		bottom: 70px !important;
		left: -10px !important;
	}
	::-webkit-scrollbar {
		display: none;
	}

	.container {
		display: grid;
		height: 100vh;
		grid-template-columns: 1fr;
		grid-template-rows: 60px 90vh 55px;
		grid-template-areas: "header"
			"main"
			"menuBottom";
	}

	.header {
		grid-area: header;
		border-bottom: 2px solid rgba(0, 0, 0, .3);
	}

	.aside-left {
		display: none;
	}

	.aside-right {
		display: none;
	}

	.main {
		overflow: auto;
		grid-area: main;
	}

	.menu-bottom {
		display: flex;
		padding: 5px 0px;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 55px;
	}

	.p-toast {
		position: fixed;
		width: 95% !important;
	}

	.p-dialog, .p-dialog-content {
		width: 100% !important;
	}

	

}
</style>
