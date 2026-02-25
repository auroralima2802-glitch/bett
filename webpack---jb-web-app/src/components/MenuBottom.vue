<template>
    
     <!-- SIDEBAR -->
    <Sidebar class="sidebar-right" position="right" v-model:visible="showFullMenu" :baseZIndex="8">
        <Menu/>      
    </Sidebar> 

    <nav :style="showBetOptions ? 'display: flex' : 'display: none'" class="bet-options">
        <ul>
            <button class="btn-close" @click="toggleBetOptions"><i class="far fa-times"></i></button>
            <router-link v-if="$store.getters.getProducts.tradicional?.habilitado" @click="toggleBetOptions" class="bet-item" to="/bet/tradicional">
                <div class="item-icon"><img src="../assets/tradicional-icon.png" alt=""></div>
                <div class="item-text"> 
                    <span class="item-title">Tradicional</span>
                    <span class="item-subtitle">Jogue nas modalidades clássicas</span>
                </div>
            </router-link> 
            <router-link v-if="$store.getters.getProducts.bauzinho?.habilitado" @click="toggleBetOptions" class="bet-item" to="/bet/bau">
                <div class="item-icon"><img src="../assets/bau-icon.png" alt=""></div>
                <div class="item-text"> 
                     <span class="item-title">Bauzinho</span>
                    <span class="item-subtitle">Escolha 20 dezenas e concorra a prêmios</span>
                </div>
            </router-link> 
            <router-link v-if="$store.getters.getProducts.ligeirinha?.habilitado" @click="toggleBetOptions" class="bet-item" to="/bet/ligeirinha">
                <div class="item-icon"><img src="../assets/ligeirinha-icon.png" alt=""></div>
                <div class="item-text"> 
                    <span class="item-title">Ligeirinha</span>
                    <span class="item-subtitle">Sorteios a cada 15 minutos</span>
                </div>
            </router-link> 
            <router-link v-if="$store.getters.getProducts.instantaneo?.habilitado" @click="toggleBetOptions" class="bet-item" to="/bet/instantaneo">
                <div class="item-icon"><img src="../assets/instantaneo-icon.png" alt=""></div>
                <div class="item-text"> 
                    <span class="item-title">Instantâneo</span>
                    <span class="item-subtitle">Sorteio instantâneo</span>
                </div>               
            </router-link>
            <router-link v-if="$store.getters.getProducts.bolao_dezenas?.habilitado" @click="toggleBetOptions" class="bet-item" to="/bet/bolaoDezenas">
                <div class="item-icon"><img src="../assets/bolaoDezenas-icon.png" alt=""></div>
                <div class="item-text"> 
                    <span class="item-title">Bolão de dezenas</span>
                    <span class="item-subtitle">Bolão de dezenas com resultado do tradicional</span>
                </div>               
            </router-link>
            <router-link v-if="$store.getters.getProducts.quina_brasil?.habilitado" @click="toggleBetOptions" class="bet-item" to="/bet/quinabrasil">
                <div class="item-icon"><img src="../assets/quinabrasil-icon.png" alt=""></div>
                <div class="item-text"> 
                    <span class="item-title">Quina Brasil</span>
                    <span class="item-subtitle">Escolha 13 dezenas e concorra a prêmios</span>
                </div>               
            </router-link>
            <router-link v-if="$store.getters.getProducts.lt?.habilitado" @click="toggleBetOptions" class="bet-item" to="/bet/lt">
                <div class="item-icon"><img src="../assets/lt-icon.png" alt=""></div>
                <div class="item-text"> 
                    <span class="item-title">Lt</span>
                    <span class="item-subtitle">Escolha 14 dezenas e concorra a prêmios</span>
                </div>               
            </router-link>
            <router-link v-if="$store.getters.getProducts.quininha?.habilitado" @click="toggleBetOptions" class="bet-item" to="/bet/quininha">
                <div class="item-icon"><img src="../assets/quininha-icon.png" alt=""></div>
                <div class="item-text"> 
                    <span class="item-title">Quininha</span>
                    <span class="item-subtitle">Escolha entre 13 e 30 dezenas e concorra a prêmios</span>
                </div>               
            </router-link>
            <router-link v-if="$store.getters.getProducts.seninha?.habilitado" @click="toggleBetOptions" class="bet-item" to="/bet/seninha">
                <div class="item-icon"><img src="../assets/seninha-icon.png" alt=""></div>
                <div class="item-text"> 
                    <span class="item-title">Seninha</span>
                    <span class="item-subtitle">Escolha entre 14 e 30 dezenas e concorra a prêmios</span>
                </div>               
            </router-link>
        </ul>
    </nav> 

    <nav class="menu-bottom">
        <router-link class="menu-item" :class="isActive('home')" to="/">
            <i class="far fa-home"></i>
            <span>Home</span>
        </router-link> 
        <router-link class="menu-item" :class="isActive('results')" to="/results">
            <i class="far fa-clipboard-list"></i>
            <span>Resultados</span>
        </router-link> 
        <div class="btn-bet">
            <button class="" @click="toggleBetOptions"><i class="far fa-plus"></i></button>
        </div>
        <router-link class="menu-item" :class="isActive('history')" to="/history">
            <i class="far fa-history"></i>
            <span>Apostas</span>
        </router-link> 
        <button @click="toggleFullMenu" class="menu-item">
            <i class="far fa-bars"></i>
            <span>Menu</span>
        </button>
      
    </nav>
</template>


<script>
    import Sidebar from 'primevue/sidebar';
    import Menu from './common/Menu.vue';

    export default {

        components: {
           Sidebar,
           Menu,
        },

        data() {
            return {
                showBetOptions: false,
                showFullMenu: false,
            }
        },

        

        watch: {
            $route: function () {
                this.showFullMenu = false          
            },
	    },

        methods: {
            isActive: function(path) {
                if(this.$route.name == path) {
                    return 'active';
                }
            },

            toggleBetOptions() {
                this.showBetOptions = !this.showBetOptions
            },

            toggleFullMenu() {
                this.showFullMenu = !this.showFullMenu
            },

        },

    }
</script>

<style scoped>

.menu-item {
    height: 100%;
    width: 20%;
    display: flex;
    flex-direction: column;
    color: rgb(162, 162, 162);
    text-decoration: none;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: transparent;
    border: none;
}

.menu-item > i {
    font-size: 18px;
}
.menu-item > span {
    font-size: 12px;
}

.active {
    color: var(--app-primary-color);
}


/* Botao de aposta */

.btn-bet {
    justify-content: center;
    align-items: center;
    display: flex;
    width: 20%;
}

.btn-bet > button {
    background: none;
    border: solid  rgb(162, 162, 162) 1px;
    border-radius: 50%;
    height: 35px;
    width: 35px;
    color:  rgb(162, 162, 162);
    font-size: 20px;
    cursor: pointer;
}


ul {
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
}

.bet-options {
    display: flex;
    position: absolute;
    background-color: var(--bg-primary);
    width: 100%;
    align-items: center;
    bottom: 0;
    padding: 15px 0px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    z-index: 1000;
    animation: go-up 0.2s ease-in;
}

.btn-close {
    position: absolute;
    color: #cdcdcd;
    font-size: 18px;
    right: 0;
    margin-right: 20px;
    background: var(--bg-secondary);
    border-radius: 50%;
    width: 35px;
    height: 35px;
    border: none;
    cursor: pointer;
}
.bet-item {
    display: flex;
    text-decoration: none;
    font-size: 16px;
    color: rgb(205, 205, 205);
    padding: 3px 20px;
    gap: 10px;
}

.item-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
}

.item-icon > img {
    height: 100%;
}

.item-text {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    justify-content: center;
    font-size: 16px;
    color: rgb(205, 205, 205);
}

.item-title {
    font-weight: bold;
    color: white;
}
.item-subtitle {
    font-size: 14px;
}

@keyframes go-up {
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0);
  }
}

</style>