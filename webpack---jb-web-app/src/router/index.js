import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const routes = [
	{	
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			requireAuth: false
		},
	},
	{
		path: '/login',
		name: 'login',
		components: {
			notLogged: Login
		},
		meta: {
			requireAuth: false
		},
	},
	{	
		path: '/bet',
		name: 'bet',
		meta: {
			requireAuth: true
		},
		children: [
			{
				path: 'tradicional',
				name: 'Tradicional',
				component: () => import("../views/Bet/Tradicional.vue"),
				meta: {
					requireAuth: true
				},
			},
			{
				path: 'ligeirinha',
				name: 'Ligeirinha',
				component: () => import("@/views/Bet/Ligeirinha.vue"),
				meta: {
					requireAuth: true
				},
			},
			{
				path: 'instantaneo',
				name: 'Instantaneo',
				component: () => import("@/views/Bet/Instantaneo.vue"),
				meta: {
					requireAuth: true
				},
			},
			{
				path: 'bau',
				name: 'Bau',
				component: () => import("@/views/Bet/Bau.vue"),
				meta: {
					requireAuth: true
				},
			},
			{
				path: 'bolaoDezenas',
				name: 'Bolão de dezenas',
				component: () => import("@/views/Bet/BolaoDezenas.vue"),
				meta: {
					requireAuth: true
				},
			},
			{
				path: 'lt',
				name: 'Lt',
				component: () => import("@/views/Bet/Lt.vue"),
				meta: {
					requireAuth: true
				},
			},
			{
				path: 'seninha',
				name: 'Seninha',
				component: () => import("@/views/Bet/Seninha.vue"),
				meta: {
					requireAuth: true
				},
			},
			{
				path: 'quininha',
				name: 'Quininha',
				component: () => import("@/views/Bet/Quininha.vue"),
				meta: {
					requireAuth: true
				},
			},
			{
				path: 'quinabrasil',
				name: 'QuinaBrasil',
				component: () => import("@/views/Bet/QuinaBrasil.vue"),
				meta: {
					requireAuth: true
				},
			}
		]
	},
	{
		path: '/betOverview',
		name: 'betOverview',
		component: () => import('../views/BetOverview.vue'),
		meta: {
			requireAuth: true
		},
	},
	{
		path: '/account',
		name: 'My Account',
		component: () => import('../views/Account/MyAccount.vue'),
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/messages',
		name: 'Messages',
		component: () => import('../views/Account/Messages.vue'),
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/bets',
		name: 'Bets',
		component: () => import('../views/Account/Bets.vue'),
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/quoted_bets',
		name: 'Quoted Bets',
		component: () => import('../views/QuotedBets.vue'),
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/wallet',
		name: 'Wallet',
		component: () => import('../views/Account/Wallet.vue'),
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/solicitations',
		name: 'Solicitations',
		component: () => import('../views/Account/Solicitations.vue'),
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/safety',
		name: 'Safety',
		component: () => import('../views/Account/Safety.vue'),
		meta: {
			requireAuth: true
		}
	},
	{
		path: '/history',
		name: 'history',
		component: () => import('../views/History.vue'),
		meta: {
			requireAuth: true
		},
	},
	{
		path: '/products',
		name: 'products',
		component: () => import('../views/Products.vue'),
		meta: {
			requireAuth: true
		},
	},
	{
		path: '/tickets-autenticados',
		name: 'Tickets Autenticados',
		component: () => import('../views/TicketsAutenticados.vue'),
		meta: {
			requireAuth: true
		},
	},
	{
		path: '/tickets-expirados',
		name: 'Tickets Expirados',
		component: () => import('../views/TicketsExpirados.vue'),
		meta: {
			requireAuth: true
		},
	},
	{
		path: '/comissions',
		name: 'Comissões',
		component: () => import('../views/Comissions.vue'),
		meta: {
			requireAuth: true
		},
	},
	{
		path: '/cotations',
		name: 'cotations',
		component: () => import('../views/Cotations.vue'),
		meta: {
			requireAuth: true
		},
	},
	{
		path: '/tables',
		name: 'tables',
		component: () => import('../views/Tables.vue'),
		meta: {
			requireAuth: false
		},
	},
	{
		path: '/results',
		name: 'results',
		component: () => import('../views/Results.vue'),
		meta: {
			requireAuth: true
		},
	},
	{
		path: '/changepassword',
		name: 'changepassword',
		component: () => import('../views/ChangePassword.vue'),
		meta: {
			requireAuth: false
		},
	},
	{
		path: '/configPrinter',
		name: 'configPrinter',
		component: () => import('../views/ConfigPrinter.vue'),
		meta: {
			requireAuth: false
		},
	},
	{
		path: '/casino',
		name: 'casino',
		component: () => import("../views/Casino/Home.vue"),
		meta: {
			requireAuth: false
		},
	},
	{
		path: "/casino/game/:id/",
		name: 'Casino game',
		component: () => import("@/views/Casino/Game.vue"),
		meta: {
			requireAuth: false
		},
	},
	{
		path: '/configTradicional',
		name: 'configTradicional',
		component: () => import('../views/ConfigTradicional.vue'),
		meta: {
			requireAuth: false
		},
	},
	{
		path: '/groups',
		name: 'groups',
		component: () => import('../views/Groups.vue'),
		meta: {
			requireAuth: false
		},
	},
	{
		path: '/guessGenerator',
		name: 'Gerador de Palpites',
		component: () => import('../views/GuessGerator.vue'),
		meta: {
			requireAuth: true
		},
	},
	{
		path: '/reports',
		name: 'reports',
		component: () => import('../views/Reports.vue'),
		meta: {
			requireAuth: true
		},
	},
	{
		path: '/authenticate',
		name: 'authenticate',
		component: () => import('../views/Authenticate.vue'),
		meta: {
			requireAuth: true
		},
	},
	{
		path: '/wallet',
		name: 'wallet',
		component: () => import('../views/Wallet.vue'),
		meta: {
			requireAuth: true
		},
	},
	{
		path: '/repeatTicket',
		name: 'repeatTicket',
		component: () => import('../views/RepeatTicket.vue'),
		meta: {
			requireAuth: true
		},
	},
	{
		path: '/reprint',
		name: 'reprint',
		component: () => import('../views/Reprint.vue'),
		meta: {
			requireAuth: false
		},
	},
	{
		path: '/dreams/:letter?',
		name: 'Livro de Sonhos',
		component: () => import('../views/DreamsBook.vue'),
		meta: {
			requireAuth: true
		},
	},
	{
		path: "/ticketview/:id/:type",
		name: "ticketview",
		component: () => import("../views/TicketView.vue"),
		meta: { 
			requireAuth: true,
		},
	},
	{
		path: "/roundsdetails/:id/",
		name: "roundsdetails",
		component: () => import("../views/RoundDetails.vue"),
		meta: { 
			requireAuth: false,
		},
	},
	{
		path: "/verify/:token/",
		name: "verify",
		component: () => import("../views/VerifyEmail.vue"),
	},
	{
		path: '/faq',
		name: 'faq',
		component: () => import('../views/Faq/Faq.vue'),
		meta: {
			requireAuth: false
		},
	},
	{
		path: "/faq/categories/:id/",
		name: "faq category",
		component: () => import("../views/Faq/ArticleCategory.vue"),
		meta: { 
			requireAuth: false,
		},
	},
	{
		path: "/faq/categories/articles/:id/",
		name: "faq article",
		component: () => import("../views/Faq/Article.vue"),
		meta: { 
			requireAuth: false,
		},
	},
	
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	mode: 'history'
})

import store from "../store/store";


router.beforeEach((to, from, next) => {
	var hostname = window.location.hostname

	if(!hostname.includes('uniaoweb') && !hostname.includes('abc')) {

		if(to.fullPath.includes('deposit')) {			
			if (store.getters.getLogged == false) {
				store.dispatch("setRegisterModal", {
					registerModal: true,
				});
			} else {
				store.dispatch("setWalletModal", {
					walletModal: true,
				});
			}
		}

		if(to.fullPath.includes('register') || to.fullPath.includes('registro')) {
			var code = to.fullPath.split('/')[2]

			store.dispatch("setRegisterCode", {
				registerCode: code,
			});
		
			store.dispatch("setRegisterModal", {
				registerModal: false,
			});

			setTimeout(() => {
				store.dispatch("setRegisterModal", {
					registerModal: true,
				});
			}, 1000)
		}

		if ((to.name == undefined && from.name == null) && to.name != "home") {
			next({ name: 'home' })
			return
		}
		
		if (store.getters.getLogged == false && to.meta.requireAuth) {
			
			store.dispatch("setLoginModal", {
                loginModal: true,
            });
			return
		}
	
	} else {

		if (store.getters.getLogged == false && to.name == 'home') {
			router.push({
				path: "/login"
			});
			return
		}

		if ((to.name == undefined && from.name == null) && to.name != "home") {
			next({ name: 'home' })
			return
		}
		
		if (store.getters.getLogged == false && to.meta.requireAuth) {
			// PUSH TO LOGIN
			router.push({
				path: "/login"
			});
			return
		}
	
	}
	
	next()
});


export default router
