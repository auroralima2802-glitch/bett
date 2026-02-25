import axios from 'axios';
import store from "../store/store";
import { getUnixTime } from "date-fns";

const api = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL
});

// Executa sempre antes de todo request feito pelo axios
api.interceptors.request.use(function (config) { 
	if(store.getters.getExpire && (getUnixTime(new Date) > store.getters.getExpire)) {
		store.dispatch('setLoggout', {
			user: {},
			token: "",
			isLogged: false,
			expire: null
		});
	}
    // Atualiza tempo da ultima ação do usuarios
    store.dispatch('refreshUserActivityTime')
    return config
});

export default api;
