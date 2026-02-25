import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import store from './store/store'
import Mixin from './mixins/mixin';
import mitt from 'mitt'
import { VueMaskDirective } from 'v-mask';
import BadgeDirective from 'primevue/badgedirective';
import Vue3TouchEvents from 'vue3-touch-events'
/* import { VueReCaptcha } from 'vue-recaptcha-v3' */

import money from 'v-money3'

// IMPORT API GLOBALLY 
import api from "./services/service";

import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css'       
import 'primevue/resources/primevue.min.css'                
import 'primeicons/primeicons.css' 
import ConfirmationService from 'primevue/confirmationservice';
import VueQrcodeReader from 'vue3-qrcode-reader'
import Tooltip from 'primevue/tooltip';

const emitter = mitt();
const app = createApp(App);

const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
    beforeMount: vMaskV2.bind,
    updated: vMaskV2.componentUpdated,
    unmounted: vMaskV2.unbind
};

app.config.globalProperties.emitter = emitter;
app.config.globalProperties.$api = api;

app.directive('tooltip', Tooltip);
app.directive('badge', BadgeDirective);
app.directive('mask', vMaskV3)
app.mixin(Mixin);
/* app.use(VueReCaptcha, { siteKey: '6Le_tBgpAAAAAEC0SCBn2DMQRehlINEyvIEPkzH8' }) */
app.use(money);
app.use(VueQrcodeReader)
app.use(store);
app.use(ToastService);
app.use(ConfirmationService);
app.use(PrimeVue, {
    locale: {
        startsWith: 'Starts with',
        contains: 'Contains',
        notContains: 'Not contains',
        endsWith: 'Ends with',
        equals: 'Equals',
        notEquals: 'Not equals',
        noFilter: 'No Filter',
        lt: 'Less than',
        lte: 'Less than or equal to',
        gt: 'Greater than',
        gte: 'Greater than or equal to',
        dateIs: 'Date is',
        dateIsNot: 'Date is not',
        dateBefore: 'Date is before',
        dateAfter: 'Date is after',
        clear: 'Limpar,,',
        apply: 'Apply',
        matchAll: 'Match All',
        matchAny: 'Match Any',
        addRule: 'Add Rule',
        removeRule: 'Remove Rule',
        accept: 'Sim',
        reject: 'Não',
        choose: 'Escolha',
        upload: 'Upload',
        cancel: 'Cancelar',
        dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        monthNames: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        today: 'Hoje',
        weekHeader: 'Wk',
        firstDayOfWeek: 0,
        dateFormat: 'mm/dd/yy',
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong',
        passwordPrompt: 'Digite a senha',
        emptyFilterMessage: 'Nenhum resultado encontrado',
        emptyMessage: 'Nenhuma opção disponível'
    }
});
app.use(router);
app.use(Vue3TouchEvents)

console.log('teste')

const hostname = window.location.hostname;

// Mapeando os hostnames para os IDs do Google Analytics correspondentes
const analyticsIds = {
	'localhost': 'G-P0K20F6Y26',
	'uniaoweb.bancaunica.com': 'G-P0K20F6Y26',
	'seupalpite.bet': 'G-P0K20F6Y26',
	'seubicho.com': 'G-38RQYV30PN'
};

// Verifique se o hostname está mapeado para um ID do Google Analytics
if (analyticsIds[hostname]) {
	const googleAnalyticsId = analyticsIds[hostname];

	// Adicione o script do Google Analytics com o ID correto
	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
	document.head.appendChild(script);

	script.onload = () => {
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			// eslint-disable-next-line
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', googleAnalyticsId);
	};
}

/* if(hostname == 'seubicho.com') {
    // chat
    window._digisac = { 
        id: "7f7221a1-0e44-443b-82b7-44b9828743db"
    };
        
    //Ferramenta de marketing 
	const script = document.createElement('script');
	script.async = true;
	script.src = 'https://d335luupugsy2.cloudfront.net/js/loader-scripts/1b733ed0-ed2a-4e13-b142-63fe9898b4f8-loader.js';
	document.head.appendChild(script);

    // Carregar o script do chat
    const script2 = document.createElement('script');
    script2.async = true;
    script2.src = "https://webchat.digisac.app/embedded.js";
    document.head.appendChild(script2);
} */

app.mount('#app')
