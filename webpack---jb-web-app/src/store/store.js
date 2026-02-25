import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';

const store = createStore ({
	state: {
        userInactivityTolerance: 600,
        userLastAction: 0,
        
		token: "",
		isLogged: false,
		regionConfig: null,
		siteConfig: null,
		user: {},
		ticket: null,
		repeat_ticket: null,
		lastResult: {
			id: 0
		},
		expire: null,
		talao: null,
		paperSize: '58MM',
		tradicionalConfig: {
			bet_layout: 'standard',
			ticket_layout: 'layout_one',
		},

		fontSize: 26,
		printMethod: 'Tipo 1',
		balance: 0,
		bonusBalance: 0,
		registerCode: null,
		games: [],
		palpites: [],
		products: [],

		characteristics: null,
		loginModal: false,
		registerModal: false,
		walletModal: false
	},

	getters: {

		// GETTING TOKEN 
		getToken: state => {
			return state.token;
		},

		// GETTING USER 
		getUser: state => {
			return state.user;
		},

		getRegionConfig: state => {
			return state.regionConfig;
		},

		getSiteConfig: state => {
			return state.siteConfig;
		},

		getProducts: state => {
			return state.products;
		},

		// GETTING TICKET
		getTicket: state => {
			return state.ticket;
		},

		getRepeatTicket: state => {
			return state.repeat_ticket;
		},

		getCharacteristics: state => {
			return state.characteristics
		},

		getTalao: state => {
			return state.talao;
		},

		getExpire: state => {
			return state.expire;
		},

		getBalance: state => {
			return state.balance;
		},

		getBonusBalance: state => {
			return state.bonusBalance;
		},

		getRegisterCode: state => {
			return state.registerCode
		},

		getLastResult: state => {
			return state.lastResult;
		},

		getPaperSize: state => {
			return state.paperSize
		},

		getTradicionalConfig: state => {
			return state.tradicionalConfig
		},

		getFontSize: state => {
			return state.fontSize
		},

		getPrintMethod: state => {
			return state.printMethod
		},

		getLoginModal: state => {
			return state.loginModal
		},

		getRegisterModal: state => {
			return state.registerModal
		},

		getWalletModal: state => {
			return state.walletModal
		},

		// GETTING STATE OF USER
		getLogged: state => {
			return state.isLogged;
		},

		getGames: state => {
			return state.games;
		},

		getPalpites: state => {
			return state.palpites;
		},
        
        // Se logado, retorna se o usuario está inativo
		getIsInactive: state => {
            if (state.isLogged){
                const now = Math.ceil(new Date().getTime() / 1000)
                return (now - state.userLastAction) > state.userInactivityTolerance;
            }
            return false
		},

	},

	mutations: {
		// SETTING LOGIN
		SET_LOGGED(state, payload) {
			state.isLogged = payload.isLogged;
			state.user = payload.user;
			state.token = payload.token;
			state.expire = payload.expire;
			state.talao = payload.talao;
		},

		SET_TALAO(state, payload) {
			state.talao = payload.talao;
		},

		SET_REGION_CONFIG(state, payload) {
			state.regionConfig = payload.regionConfig;
		},

		SET_SITE_CONFIG(state, payload) {
			state.siteConfig = payload.siteConfig;
		},

		SET_PRODUCTS(state, payload) {
			state.products = payload.products;
		},

		SET_TICKET(state, payload) {
			state.ticket = payload.ticket;
		},

		SET_REPEAT_TICKET(state, payload) {
			state.repeat_ticket = payload.repeat_ticket;
		},

		SET_BALANCE(state, payload) {
			state.balance = payload.balance;
		},

		SET_BONUS_BALANCE(state, payload) {
			state.bonusBalance = payload.bonusBalance;
		},

		SET_REGISTER_CODE(state, payload) {
			state.registerCode = payload.registerCode;
		},

		SET_LAST_RESULT(state, payload) {
			state.lastResult = payload.lastResult;
		},
		
		// SETTING LOGOUT
		SET_LOGGOUT(state, payload) {
			state.token = payload.token;
			state.user = payload.user;
			state.isLogged = payload.isLogged;
			state.expire = payload.expire;
		},

		SET_CHARACTERISTICS(state, payload){
			state.characteristics = payload.characteristics
		},

		SET_PAPER_SIZE(state, payload) {
			state.paperSize = payload.paperSize;
		},

		SET_TRADICIONAL_CONFIG(state, payload) {
			state.tradicionalConfig = payload.tradicionalConfig;
		},

		SET_FONT_SIZE(state, payload) {
			state.fontSize = payload.fontSize;
		},

		SET_PRINT_METHOD(state, payload) {
			state.printMethod = payload.printMethod;
		},

		SET_LOGIN_MODAL(state, payload) {
			state.loginModal = payload.loginModal;
		},

		SET_REGISTER_MODAL(state, payload) {
			state.registerModal = payload.registerModal;
		},

		SET_WALLET_MODAL(state, payload) {
			state.walletModal = payload.walletModal;
		},

		SET_GAMES(state, payload) {
			state.games = payload.games
		},

		SET_PALPITES(state, payload) {
			state.palpites = payload.palpites
		},

        REFRESH_USER_ACTIVITY_TIME(state){
            state.userLastAction = Math.ceil(new Date().getTime() / 1000)
        }
	},
	
	actions: {
		// SETTING LOGIN
		setLogged(context, payload) {
			context.commit('SET_LOGGED', payload);
		},

		setSiteConfig(context, payload) {
			context.commit('SET_SITE_CONFIG', payload);
		},

		setRegionConfig(context, payload) {
			context.commit('SET_REGION_CONFIG', payload);
		},

		setProducts(context, payload) {
			context.commit('SET_PRODUCTS', payload);
		},

		// SETTING LOGOUT
		setLoggout(context, payload) {
			context.commit('SET_LOGGOUT', payload);
		},

		setBalance(context, payload) {
			context.commit('SET_BALANCE', payload);
		},

		setBonusBalance(context, payload) {
			context.commit('SET_BONUS_BALANCE', payload);
		},

		setTicket(context, payload) {
			context.commit('SET_TICKET', payload);
		},

		setRepeatTicket(context, payload) {
			context.commit('SET_REPEAT_TICKET', payload);
		},

		setRegisterCode(context, payload) {
			context.commit('SET_REGISTER_CODE', payload);
		},

		setTalao(context, payload) {
			context.commit('SET_TALAO', payload);
		},

		setLastResult(context, payload) {
			context.commit('SET_LAST_RESULT', payload);
		},

		setCharacteristics(context, payload) {
			context.commit('SET_CHARACTERISTICS', payload)
		},

		setPaperSize(context, payload) {
			context.commit('SET_PAPER_SIZE', payload)
		},

		setTradicionalConfig(context, payload) {
			context.commit('SET_TRADICIONAL_CONFIG', payload)
		},

		setFontSize(context, payload) {
			context.commit('SET_FONT_SIZE', payload)
		},

		setPrintMethod(context, payload) {
			context.commit('SET_PRINT_METHOD', payload)
		},

		setLoginModal(context, payload) {
			context.commit('SET_LOGIN_MODAL', payload)
		},

		setRegisterModal(context, payload) {
			context.commit('SET_REGISTER_MODAL', payload)
		},

		setWalletModal(context, payload) {
			context.commit('SET_WALLET_MODAL', payload)
		},

		addGame(context, payload) {
			context.commit('ADD_GAME', payload);
		},

		removeGame(context, payload) {
			context.commit('REMOVE_GAME', payload);
		},

		clearGameList(context) {
			context.commit('CLEAR_GAME_LIST');
		},

        refreshUserActivityTime(context){
			context.commit('REFRESH_USER_ACTIVITY_TIME');
        }

	},

	plugins: [createPersistedState()],

});

export default store;