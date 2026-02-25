<template>
	<div class="home">
		<!-- LAYOUT ONLINE -->

		<template v-if="$store.getters.getSiteConfig?.online">
			
			<div class="animal-list">
				<div class="animal-item" v-for="(animal, index) in animals" :key="index">
					<div class="animal-icon">
						<img :src="require(`@/assets/animals/icons/${animal.icon}-color.png`)" :alt="animal.name" />
					</div>
					<div style="display: flex; flex-direction: column; align-items: center">
						<span class="animal-group">{{ animal.grupo }}</span>
						<span>{{ animal.name }}</span>
					</div>
				</div>
			</div>

			<template v-if="banners.length > 0">
				<Carousel 
					:banners="banners"
					:autoPlay="true"
					:showItemNavigators="windowWidth > 600 ? true : false"
					:showThumbnails="true"
					:transitionInterval="5000"
				/>
			</template>

			<div style="overflow: hidden;" v-if="prizeLogs.length > 0">
				<div class="prizeLogs-container">
					<PrizeCard v-for="(prizeLog, index) in prizeLogs" :prizeLog="prizeLog" :key="index"/>
				</div>
			</div>

			<div class="list">
				<router-link class="list-item" to="/bet/tradicional">
					<img src="../assets/tradicional-card.png" alt="a" />
					Tradicional	
				</router-link>
				<router-link class="list-item" to="/bet/ligeirinha">
					<img src="../assets/ligeirinha-card.png" alt="a" />
					Ligeirinha
				</router-link>
				<router-link class="list-item" to="/bet/instantaneo">
					<img src="../assets/instantaneo-card.png" alt="a" />
					Instântaneo
				</router-link>
				<router-link class="list-item" to="/bet/bau">
					<img src="../assets/bauzinho-card.png" alt="a" />
					Bauzinho
				</router-link>
				<router-link class="list-item" to="/bet/bolaoDezenas">
					<img src="../assets/bolaoDezenas-card.png" alt="bolaoDezenas" />
					Bolão de <br>
					dezenas
				</router-link>
				<router-link class="list-item" to="/bet/quininha">
					<img src="../assets/quininha-card.png" alt="quininha" />
					Quininha
				</router-link>
				<router-link class="list-item" to="/bet/quinabrasil">
					<img src="../assets/quinabrasil-card.png" alt="quinabrasil" />
					Quina Brasil
				</router-link>
				<router-link class="list-item" to="/bet/seninha">
					<img src="../assets/seninha-card.png" alt="seninha" />
					Seninha
				</router-link>
				<router-link class="list-item" to="/bet/lt">
					<img src="../assets/lt-card.png" alt="lt" />
					Lotinha
				</router-link>
			</div>

			<div class="section">
				<SideScroll title="Tradicional" icon="tradicional-icon.png">
					<div class="list">
						<div :style="search_lottery == lottery.lottery_id ? 'border: solid #535d6b 1px; color: white' :  'color: #cdcdcd'" @click="changeLottery(lottery)" class="lottery-item" v-for="(lottery, index) in lotteries" :key="index">
							{{ lottery.lottery_name }}
						</div>
					</div>
					<div :style="loading.results || results.length == 0 ? 'justify-content: center' : ''" class="result-list">
						<Spinner v-if="loading.results" />
						<span v-if="!loading.results && results.length == 0">Nenhum resultado disponível</span>
						<TradicionalCard  v-for="(result, index) in results" :result="result" :key="index"/>
					</div>
				</SideScroll>
			</div>
	
			<div v-if="rounds.length > 0" class="section">
				<SideScroll title="Bolão de dezenas" icon="bolaoDezenas-icon.png">
					<div class="list">
						<RoundCard v-for="(round, index) in rounds" :round="round" :key="index"/>
					</div>  
				</SideScroll>
			</div>
		
			<div v-if="quininha_contests.length > 0" class="section">
				<SideScroll title="Quininha" icon="quininha-icon.png">
					<div class="list">
						<ContestCard v-for="(contest, index) in quininha_contests" :contest="contest" :key="index"/>
					</div>  
				</SideScroll>
			</div>
		
			<div v-if="seninha_contests.length > 0" class="section">
				<SideScroll title="Seninha" icon="seninha-icon.png">
					<div class="list">
					<ContestCard v-for="(contest, index) in seninha_contests" :contest="contest" :key="index"/>
					</div>  
				</SideScroll>
			</div>
		
			<div v-if="quinabrasil_contests.length > 0" class="section">
				<SideScroll title="Quina Brasil" icon="quinabrasil-icon.png">
					<div class="list">
					<ContestCard v-for="(contest, index) in quinabrasil_contests" :contest="contest" :key="index"/>
					</div>  
				</SideScroll>
			</div>
		
			<div v-if="lt_contests.length > 0" class="section">
				<SideScroll title="Lt" icon="lt-icon.png">
					<div class="list">
					<ContestCard v-for="(contest, index) in lt_contests" :contest="contest" :key="index"/>
					</div>  
				</SideScroll>
			</div>
		</template>

		<!-- LAYOUT CAMBISTA -->
		<template v-else>
			
			<div class="animal-list">
				<div class="animal-item" v-for="(animal, index) in animals" :key="index">
					<div class="animal-icon">
						<img :src="require(`@/assets/animals/icons/${animal.icon}-color.png`)" :alt="animal.name" />
					</div>
					<div style="display: flex; flex-direction: column; align-items: center">
						<span class="animal-group">{{ animal.grupo }}</span>
						<span>{{ animal.name }}</span>
					</div>
				</div>
			</div>

			<!-- <div v-if="banners.length > 0" class="carousel-container">
				<Carousel :value="banners" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions">
					<template #item="slotProps">
						<div class="item">
							<a :href="slotProps.data.redirect_to"
								class="img-banner">
								<img :src="slotProps.data.banner_url" alt="">
							</a>
						</div>
					</template>
				</Carousel>
			</div> -->

			<div class="list">
				<router-link v-if="$store.getters.getProducts.tradicional?.habilitado" class="list-item" to="/bet/tradicional">
					<img src="../assets/tradicional-card.png" alt="a" />
					Tradicional	
				</router-link>
				<router-link v-if="$store.getters.getProducts.ligeirinha?.habilitado" class="list-item" to="/bet/ligeirinha">
					<img src="../assets/ligeirinha-card.png" alt="a" />
					Ligeirinha
				</router-link>
				<router-link v-if="$store.getters.getProducts.instantaneo?.habilitado" class="list-item" to="/bet/instantaneo">
					<img src="../assets/instantaneo-card.png" alt="a" />
					Instântaneo
				</router-link>
				<router-link v-if="$store.getters.getProducts.bauzinho?.habilitado" class="list-item" to="/bet/bau">
					<img src="../assets/bauzinho-card.png" alt="a" />
					Bauzinho
				</router-link>
				<router-link v-if="$store.getters.getProducts.bolao_dezenas?.habilitado" class="list-item" to="/bet/bolaoDezenas">
					<img src="../assets/bolaoDezenas-card.png" alt="bolaoDezenas" />
					Bolão de <br>
					dezenas
				</router-link>
				<router-link v-if="$store.getters.getProducts.quininha?.habilitado" class="list-item" to="/bet/quininha">
					<img src="../assets/quininha-card.png" alt="quininha" />
					Quininha
				</router-link>
				<router-link v-if="$store.getters.getProducts.quina_brasil?.habilitado" class="list-item" to="/bet/quinabrasil">
					<img src="../assets/quinabrasil-card.png" alt="quinabrasil" />
					Quina Brasil
				</router-link>
				<router-link v-if="$store.getters.getProducts.seninha?.habilitado" class="list-item" to="/bet/seninha">
					<img src="../assets/seninha-card.png" alt="seninha" />
					Seninha
				</router-link>
				<router-link v-if="$store.getters.getProducts.lt?.habilitado" class="list-item" to="/bet/lt">
					<img src="../assets/lt-card.png" alt="lt" />
					Lt
				</router-link>
			</div>

			<!-- <div v-if="results.length > 0" class="section">
				<ResultList :results="results" />
			</div> -->

			<div class="section">
				<SideScroll title="Tradicional" icon="tradicional-icon.png">
					<div class="list">
						<div :style="search_lottery == lottery.lottery_id ? 'border: solid #535d6b 1px; color: white' :  'color: #cdcdcd'" @click="changeLottery(lottery)" class="lottery-item" v-for="(lottery, index) in lotteries" :key="index">
							{{ lottery.lottery_name }}
						</div>
					</div>
					<div :style="loading.results || results.length == 0 ? 'justify-content: center' : ''" class="result-list">
						<Spinner v-if="loading.results" />
						<span v-if="!loading.results && results.length == 0">Nenhum resultado disponível</span>
						<TradicionalCard  v-for="(result, index) in results" :result="result" :key="index"/>
					</div>
				</SideScroll>
			</div>
	
			<div v-if="rounds.length > 0" class="section">
				<SideScroll title="Bolão de dezenas" icon="bolaoDezenas-icon.png">
					<div class="list">
						<RoundCard v-for="(round, index) in rounds" :round="round" :key="index"/>
					</div>  
				</SideScroll>
			</div>
		
			<div v-if="quininha_contests.length > 0" class="section">
				<SideScroll title="Quininha" icon="quininha-icon.png">
					<div class="list">
						<ContestCard v-for="(contest, index) in quininha_contests" :contest="contest" :key="index"/>
					</div>  
				</SideScroll>
			</div>
		
			<div v-if="seninha_contests.length > 0" class="section">
				<SideScroll title="Seninha" icon="seninha-icon.png">
					<div class="list">
					<ContestCard v-for="(contest, index) in seninha_contests" :contest="contest" :key="index"/>
					</div>  
				</SideScroll>
			</div>
		
			<div v-if="quinabrasil_contests.length > 0" class="section">
				<SideScroll title="Quina Brasil" icon="quinabrasil-icon.png">
					<div class="list">
					<ContestCard v-for="(contest, index) in quinabrasil_contests" :contest="contest" :key="index"/>
					</div>  
				</SideScroll>
			</div>
		
			<div v-if="lt_contests.length > 0" class="section">
				<SideScroll title="Lt" icon="lt-icon.png">
					<div class="list">
					<ContestCard v-for="(contest, index) in lt_contests" :contest="contest" :key="index"/>
					</div>  
				</SideScroll>
			</div>

		</template>
	</div>
</template>
	
<script>
	import Carousel from "../components/Carousel.vue";
	import Button from "primevue/button";
	import Calendar from 'primevue/calendar';
	import Dropdown from 'primevue/dropdown';
	import SideScroll from "@/components/common/SideScroll";
	import RoundCard from '../components/common/RoundCard.vue'
	import ContestCard from '../components/common/ContestCard.vue'
	import TradicionalCard from '../components/common/TradicionalCard.vue'
	import PrizeCard from '../components/common/PrizeCard.vue'
	import Spinner from '../components/common/Spinner.vue';
	import Galleria from 'primevue/galleria';

	import moment from 'moment'
	
	export default {
	  components: {
		Carousel,
		Button,
		Calendar,
		Dropdown,
		SideScroll,
		RoundCard,
		ContestCard,
		TradicionalCard,
		Spinner,
		Galleria,
		PrizeCard
	  },
	
	  data() {
		return {
			windowWidth: 0,
			region_id: null,
			search_lottery: 2,
			loading: {
				results: false,
			},
			
			animals: [],
			animal: {},
			results: [],
			rounds: [],
			lotteries: [],
			lt_contests: [],
			quininha_contests: [],
			seninha_contests: [],
			quinabrasil_contests: [],
			prizeLogs: [],
	
			showBetAnimalModal: false,

			banners: [],
			responsiveOptions: [
				{
					breakpoint: '1199px',
					numVisible: 1,
					numScroll: 1
				},
				{
					breakpoint: '991px',
					numVisible: 1,
					numScroll: 1
				},
				{
					breakpoint: '767px',
					numVisible: 1,
					numScroll: 1
				}
			]
		};
	},
	
	created() {	
		this.windowWidth = window.innerWidth
		this.animals = this.animalList();
		this.region_id = this.$store.getters.getSiteConfig ? this.$store.getters.getSiteConfig.region_id : this.loggedUser().region_id
		this.loadBanners()
		this.loadPrizeLogs()

		if(!['uniaoweb.bancaunica.com', 'abc'].includes(window.location.hostname)) {
			this.loadLotteries()
			this.loadBalance()
			this.loadLtContests()
			this.loadQuininhaContests()
			this.loadResults();
			this.loadSeninhaContests()
			this.loadQuinaBrasilContests()
			this.loadRounds()
		} else {

			if(this.$store.getters.getProducts && this.$store.getters.getProducts.tradicional?.habilitado) { 
				this.loadResults();
				this.loadLotteries()
			}
	
			if(this.$store.getters.getProducts && this.$store.getters.getProducts.bolao_dezenas?.habilitado) { 
				this.loadRounds()
			}
	
			if(this.$store.getters.getProducts && this.$store.getters.getProducts.lt?.habilitado) { 
				this.loadLtContests()
			}
	
			if(this.$store.getters.getProducts && this.$store.getters.getProducts.quininha?.habilitado) { 
				this.loadQuininhaContests()
			}
	
			if(this.$store.getters.getProducts && this.$store.getters.getProducts.seninha?.habilitado) { 
				this.loadSeninhaContests()
			}
	
			if(this.$store.getters.getProducts && this.$store.getters.getProducts.quina_brasil?.habilitado) { 
				this.loadQuinaBrasilContests()
			}
		}
	
	},
	
	methods: {
		changeLottery(lottery) {
			this.search_lottery = lottery.lottery_id
			this.loadResults()
		},
		
		loadBanners() {
			this.$api.get('bannerConfig', {
				headers: {
					Authorization: this.accessToken(),
				},
				params: {
					region_id: this.region_id,
					search_type: 'standard'
				}
			})
			.then((response) => {
				const now = moment(); // Obtém o momento atual em Brasília
				var aux = response.data

				aux = aux.filter(item => {
					const startDate = moment(item.start_date); 
					const endDate = item.end_date ? moment(item.end_date) : null; 

					return item.enabled === 1 && startDate.isBefore(now) && (!endDate || endDate.isAfter(now));
				});

				this.banners = aux;
			})
		},

		loadPrizeLogs() {
			this.$api.get('prizeLogs', {
				headers: {
					Authorization: this.accessToken(),
				},
				params: {
					region_id: this.region_id
				}
			})
			.then((response) => {
				//const now = moment(); // Obtém o momento atual em Brasília
				var aux = response.data

				/* aux = aux.filter(item => {
					const startDate = moment(item.start_date); 

					return item.enabled === 1 && startDate.isAfter(now);
				});
 */
				this.prizeLogs = aux;
			})
		},

		loadRounds() {
			this.$api.get(`/rounds/lastTenRecords`, {
				headers: {
					Authorization: this.accessToken(),
				},
				params: {
					lottery_search: 2,
					search_region: this.region_id
				},
			})
			.then((response) => {
				this.rounds = response.data;
			})
		},
	
		loadQuininhaContests() {
			this.$api.get(`/contests2/lastTenRecords`, {
				headers: {
					Authorization: this.accessToken(),
				},
				params: {
					caixa_lottery_search: 1,
					region_search: this.region_id,
				},
			})
			.then((response) => {
				this.quininha_contests = response.data;
			})
		},
	
		loadSeninhaContests() {
			this.$api.get(`/contests2/lastTenRecords`, {
				headers: {
					Authorization: this.accessToken(),
				},
				params: {
					caixa_lottery_search: 2,
					region_search: this.region_id,
				},
			})
			.then((response) => {
				this.seninha_contests = response.data;
			})
		},
	
		loadQuinaBrasilContests() {
			this.$api.get(`/contests2/lastTenRecords`, {
				headers: {
					Authorization: this.accessToken(),
				},
				params: {
					caixa_lottery_search: 4,
					region_search: this.region_id,
				},
			})
			.then((response) => {
				this.quinabrasil_contests = response.data;
			})
		},
	
		loadLtContests() {
			this.$api.get(`contests2/lastTenRecords`, {
				headers: {
					Authorization: this.accessToken(),
				},
				params: {
					caixa_lottery_search: 5,
					region_search: this.region_id,
				},
			})
			.then((response) => {
				this.lt_contests = response.data;
			})
		},

		// LOAD LOTTERIES
		loadLotteries() {
			
			this.$api
			.get(`/lotteries/region_lotteries/${this.region_id}`, {
				headers: {
					Authorization: this.accessToken(),
				},
			})
			.then((response) => {
				this.lotteries = response.data
			})
		},
	
		// LOAD RESULTS
		loadResults() {
			this.loading.results = true
			this.results = []

			this.$api
			.get(`/results/lastTenRecords`, {
				headers: {
					Authorization: this.accessToken(),
				},
				params: {
					lottery_search: this.search_lottery,
					region_search: this.region_id,
				},
			})
			.then((response) => {
			  this.results = response.data;
			  this.loading.results = false
			})
			.catch(() => {
				this.loading.results = false
			});
		},

	  },
	};
	</script>
	
<style lang="scss" scoped>
	.home {
		padding: 25px;
	}
	
	.section {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 30px;
	}
	
	/* SCROLL DE ANIMAIS */
	.animal-list {
		display: grid;
		grid-auto-flow: column;
		overflow: auto;
		gap: 10px;
		padding-bottom: 5px;
		margin-bottom: 10px;
	}
	
	.animal-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: transparent;
		border: none;
		color: rgb(205, 205, 205);
		font-size: 12px;
		font-weight: bold;
	}
	
	.animal-icon {
		margin-bottom: 5px;
		padding: 10px;
		height: 55px;
		width: 55px;
		border-radius: 7px;
		background-color: var(--bg-secondary);
	}
	
	.animal-icon > img {
		width: 100%;
	}
	
	.animal-group {
		display: flex;
		justify-content: center;
		background: var(--bg-secondary);
		border-radius: 50%;
		height: 25px;
		width: 25px;
		align-items: center;
	}
	
	.result-list {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 340px;
		overflow: auto;
		gap: 10px;
		color: white;
	}
	
	/* LISTAS*/
	.list {
		display: flex;
		overflow: auto;
		gap: 10px;
		margin-bottom: 10px;
		padding: 10px 0px;
	}
	.prizeLogs-container {
		display: flex;
		overflow: auto;
		width: fit-content;
		gap: 10px;
		margin-bottom: 10px;
		white-space: nowrap;
    	animation: scroll 20s linear infinite;
	}
	.lottery-item {
		color: white;
		background: var(--bg-secondary);
		border-radius: 7px;
		padding: 8px;
		font-weight: bold;
		min-width: fit-content;
	}

	.list-item {
		display: flex;
		flex-direction: column;
		transition: all 0.3s ease-in-out;
		color: #cdcdcd;
		text-decoration: none;
		align-items: center;
		gap: 5px;
		font-size: 14px;
		font-weight: 600;
		text-align: center;
	}
	
	.list-item:hover {
		transform: translateY(-4%);
	}
	
	.list-item > img {
		height: 70px;
	}
	
	.p-calendar,
	.p-dropdown {
		width: 100%
	}
	
	h3 {
		margin-bottom: 15px;
	}
	
	:deep(.p-carousel-next),
	:deep(.p-carousel-prev) {
		display: none;
	}
	.item-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 10px;
		padding: 30px;
		height: 210px;
		width: 100%;
		color: white;
		background-color: var(--app-primary-color);
	}
	
	.btn-register-baner {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 115px;
		height: 50px;
		background-color: white;
		border-radius: 7px;
	}
	
	.btn-register-baner a {
		text-decoration: none;
		color: rgb(40, 40, 40);
	}

	/* BANNER */

	.img-banner {
		img {
			height: 270px;
			object-fit: cover;
			object-position: bottom;
			width: 100%;
			border-radius: 7px;
		}
	}

	@keyframes scroll {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
	
	@media screen and (max-width: 800px) {
		.home {
			padding: 15px;
		}
	
		.img-banner {
			img {
				height: 150px;
				object-fit: cover;
				object-position: bottom;
				width: 100%;
				border-radius: 7px;
			}
		}
		.product-item {
			display: flex;
			padding: 12px;
			justify-content: center;
			align-items: center;
			border-radius: 7px;
			color: rgb(205, 205, 205);
			font-size: 14px;
			font-weight: 600;
			height: 50px;
			width: -webkit-fit-content;
			width: -moz-fit-content;
			width: fit-content;
			background-color: var(--bg-secondary) !important;
			cursor: pointer;
			gap: 5px;
			text-decoration: none;
			min-width: 150px;
		}
	
		.list-item:hover {
			transform: none;
		}
	
		.item-content {
			height: 170px;
		}
		h2 {
			font-size: 20px;
		}
	}
	</style>
	