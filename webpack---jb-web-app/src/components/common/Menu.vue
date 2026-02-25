<template>

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

    <!-- SE FOR ONLINE -->
    <div class="menu-container" v-if="$store.getters.getSiteConfig?.online" 
        :style="$store.getters.getSiteConfig?.menu_gradient ?  `background: linear-gradient(45deg, ${$store.getters.getSiteConfig?.primary_color}, #000);` : '' "> 
       
        <!-- <div class="section">
            <h4 class="section-title">Cassino</h4>

            <router-link class="menu-item" to="/casino">
                <i class="far fa-spade"></i>
                <span class="item-title">Cassino</span>
                <div class="featured-item">
                    Novo
                </div>
            </router-link>
        </div> -->

        <div class="section">
            <h4 class="section-title">Produtos</h4>

            <router-link class="menu-item" to="/bet/tradicional">
                <img src="../../assets/tradicional-icon.png" alt="a">
                <span class="item-title">Tradicional</span>
            </router-link> 
            <router-link class="menu-item" to="/bet/ligeirinha">
                <img src="../../assets/ligeirinha-icon.png" alt="a">
                <span class="item-title">Ligeirinha</span>
            </router-link> 
            <router-link class="menu-item" to="/bet/instantaneo">
                <img src="../../assets/instantaneo-icon.png" alt="a">
                <span class="item-title">Instantâneo</span>
            </router-link> 
            <router-link class="menu-item" to="/bet/bau">
                <img src="../../assets/bau-icon.png" alt="a">
                <span class="item-title">Bauzinho</span>
            </router-link> 
            <router-link class="menu-item" to="/bet/bolaoDezenas">
                <img src="../../assets/bolaoDezenas-icon.png" alt="a">
                <span class="item-title">Bolão de dezenas</span>
            </router-link> 
            <router-link class="menu-item" to="/bet/quininha">
                <img src="../../assets/quininha-icon.png" alt="a">
                <span class="item-title">Quininha</span>
            </router-link> 
            <router-link class="menu-item" to="/bet/seninha">
                <img src="../../assets/seninha-icon.png" alt="a">
                <span class="item-title">Seninha</span>
            </router-link> 
            <router-link class="menu-item" to="/bet/quinabrasil">
                <img src="../../assets/quinabrasil-icon.png" alt="a">
                <span class="item-title">Quina Brasil</span>
            </router-link> 
            <router-link class="menu-item" to="/bet/lt">
                <img src="../../assets/lt-icon.png" alt="a">
                <span class="item-title">Lt</span>
            </router-link> 
        </div>

        <div v-if="$store.getters.getLogged" class="section">
            <h4 class="section-title">Perfil</h4>

            <router-link class="menu-item" to="/wallet">
                <i class="far fa-wallet"></i>
                <span class="item-title">Carteira</span>
            </router-link> 
            <router-link class="menu-item" to="/solicitations">
                <i class="far fa-money-check-alt"></i>
                <span class="item-title">Solicitações</span>
            </router-link> 
            <router-link class="menu-item" to="/history">
                <i class="far fa-history"></i>
                <span class="item-title">Palpites</span>
            </router-link> 
            <router-link class="menu-item" to="/results">
                <i class="far fa-poll-h"></i>                    
                <span class="item-title">Resultados</span>
            </router-link> 
            <router-link class="menu-item" to="/changepassword">
                <i class="far fa-lock"></i>                    
                <span class="item-title">Alterar senha</span>
            </router-link> 
            <router-link class="menu-item" to="/comissions">
                <i class="far fa-percentage"></i>                    
                <span class="item-title">Comissões</span>
            </router-link> 
            <div style="cursor: pointer;" @click="toggleCode()" class="menu-item">
                <i class="far fa-share-alt"></i>                    
                <span class="item-title">Recomendar amigos</span>
            </div> 
        </div>

        <div class="section">
            <h4 class="section-title">Ajuda</h4>

            <div style="cursor: pointer;" @click="openChat()" class="menu-item">
                <i class="far fa-headset"></i>                    
                <span class="item-title">Chat</span>
            </div> 
            <router-link class="menu-item" to="/groups">
                <i class="far fa-paw"></i>                    
                <span class="item-title">Grupos</span>
            </router-link> 
            <router-link class="menu-item" to="/cotations">
                <i class="fal fa-money-check-alt"></i>                    
                <span class="item-title">Cotações</span>
            </router-link> 
            <router-link class="menu-item" to="/faq">
                <i class="far fa-info-circle"></i>                    
                <span class="item-title">Ajuda</span>
            </router-link> 
            <router-link class="menu-item" to="/tables">
                <i class="fal fa-table"></i>                    
                <span class="item-title">Tabela de inversões</span>
            </router-link> 
        </div>
        
    </div>

    <div v-else  class="menu-container"> <!-- se for revendedor -->
        <div class="section">
            <h4 class="section-title">Produtos</h4>

            <router-link v-if="$store.getters.getProducts.tradicional?.habilitado" class="menu-item" to="/bet/tradicional">
                <img src="../../assets/tradicional-icon.png" alt="a">
                <span class="item-title">Tradicional</span>
            </router-link> 
            <router-link v-if="$store.getters.getProducts.ligeirinha?.habilitado" class="menu-item" to="/bet/ligeirinha">
                <img src="../../assets/ligeirinha-icon.png" alt="a">
                <span class="item-title">Ligeirinha</span>
            </router-link> 
            <router-link v-if="$store.getters.getProducts.instantaneo?.habilitado" class="menu-item" to="/bet/instantaneo">
                <img src="../../assets/instantaneo-icon.png" alt="a">
                <span class="item-title">Instantâneo</span>
            </router-link> 
            <router-link v-if="$store.getters.getProducts.bauzinho?.habilitado" class="menu-item" to="/bet/bau">
                <img src="../../assets/bau-icon.png" alt="a">
                <span class="item-title">Bauzinho</span>
            </router-link> 
            <router-link v-if="$store.getters.getProducts.bolao_dezenas?.habilitado" class="menu-item" to="/bet/bolaoDezenas">
                <img src="../../assets/bolaoDezenas-icon.png" alt="a">
                <span class="item-title">Bolão de dezenas</span>
            </router-link> 
            <router-link v-if="$store.getters.getProducts.quininha?.habilitado" class="menu-item" to="/bet/quininha">
                <img src="../../assets/quininha-icon.png" alt="a">
                <span class="item-title">Quininha</span>
            </router-link> 
            <router-link v-if="$store.getters.getProducts.seninha?.habilitado" class="menu-item" to="/bet/seninha">
                <img src="../../assets/seninha-icon.png" alt="a">
                <span class="item-title">Seninha</span>
            </router-link> 
            <router-link v-if="$store.getters.getProducts.quina_brasil?.habilitado" class="menu-item" to="/bet/quinabrasil">
                <img src="../../assets/quinabrasil-icon.png" alt="a">
                <span class="item-title">Quina Brasil</span>
            </router-link> 
            <router-link v-if="$store.getters.getProducts.lt?.habilitado" class="menu-item" to="/bet/lt">
                <img src="../../assets/lt-icon.png" alt="a">
                <span class="item-title">Lt</span>
            </router-link> 
        </div>

        <div class="section">
            <h4 class="section-title">Bilhete</h4>

            <router-link class="menu-item" to="/authenticate">
                <i class="far fa-ticket-alt"></i>                    
                <span class="item-title">Autenticar</span>
            </router-link> 
            <router-link class="menu-item" to="/repeatTicket">
                <i class="fal fa-redo"></i>                    
                <span class="item-title">Repetir</span>
            </router-link> 
        </div>

        <div class="section">
            <h4 class="section-title">Relatórios</h4>

            <router-link class="menu-item" to="/history">
                <i class="far fa-history"></i>
                <span class="item-title">Palpites</span>
            </router-link> 
            <router-link class="menu-item" to="/results">
                <i class="far fa-poll-h"></i>                    
                <span class="item-title">Resultados</span>
            </router-link> 
            <router-link class="menu-item" to="/products">
                <i class="far fa-clipboard-list-check"></i>
                <span class="item-title">Produtos</span>
            </router-link> 
            <router-link class="menu-item" to="/comissions">
                <i class="far fa-percentage"></i>                    
                <span class="item-title">Comissões</span>
            </router-link> 
            <router-link class="menu-item" to="/reports">
                <i class="far fa-chart-bar"></i>                    
                <span class="item-title">Guia de pagamento</span>
            </router-link> 
            <router-link class="menu-item" to="/tickets-autenticados">
                <i class="far fa-tasks"></i>                    
                <span class="item-title">Bilhetes autenticados</span>
            </router-link>
            <router-link class="menu-item" to="/tickets-expirados">
                <i class="far fa-tasks"></i>                    
                <span class="item-title">Bilhetes de Cana</span>
            </router-link>
            <router-link class="menu-item" to="/quoted_bets">
                <i class="far fa-list-ol"></i>                    
                <span class="item-title">Palpites cotados</span>
            </router-link>  
            <router-link class="menu-item" to="/changepassword">
                <i class="far fa-lock"></i>                    
                <span class="item-title">Alterar senha</span>
            </router-link> 
        </div>

        <div class="section">
            <h4 class="section-title">Downloads</h4>

            <a href="https://uniaoweb.bancaunica.com/uniaoweb.apk" class="menu-item">
                <i class="far fa-cloud-download"></i>                    
                <span class="item-title">Baixar esse site</span>
            </a> 
            <a href="https://uniaoweb.bancaunica.com/print.apk" class="menu-item">
                <i class="fal fa-download"></i>                    
                <span class="item-title">APK de impressão (Tipo 1)</span>
            </a> 
            <a href="https://uniaoweb.bancaunica.com/buprinter.apk" class="menu-item">
                <i class="fal fa-download"></i>                    
                <span class="item-title">APK de impressão (Tipo 2)</span>
            </a> 
            <a href="https://uniaoweb.bancaunica.com/print2.apk" class="menu-item">
                <i class="fal fa-download"></i>                    
                <span class="item-title">APK de impressão (Tipo 3)</span>
            </a> 
            <a href="https://uniaoweb.bancaunica.com/thermalprinter.apk" class="menu-item">
                <i class="fal fa-download"></i>                    
                <span class="item-title">APK de impressão (Tipo 5)</span>
            </a> 
        </div>

        <div class="section">
            <h4 class="section-title">Configurações</h4>
            <router-link class="menu-item" to="/configPrinter">
                <i class="far fa-cogs"></i>                    
                <span class="item-title">Impressora</span>
            </router-link> 
            <router-link class="menu-item" to="/configTradicional">
                <i class="far fa-cogs"></i>                    
                <span class="item-title">Tradicional</span>
            </router-link> 
        </div>

        <div class="section">
            <h4 class="section-title">Outros</h4>

            <router-link class="menu-item" to="/reprint">
                <i class="far fa-print"></i>                    
                <span class="item-title">Reimpressão</span>
            </router-link> 
            <router-link class="menu-item" to="/groups">
                <i class="far fa-paw"></i>                    
                <span class="item-title">Grupos</span>
            </router-link> 
            <router-link class="menu-item" to="/cotations">
                <i class="fal fa-money-check-alt"></i>                    
                <span class="item-title">Cotações</span>
            </router-link> 
            <router-link class="menu-item" to="/faq">
                <i class="far fa-info-circle"></i>                    
                <span class="item-title">Ajuda</span>
            </router-link> 
            <router-link class="menu-item" to="/tables">
                <i class="fal fa-table"></i>                    
                <span class="item-title">Tabela de inversões</span>
            </router-link> 
        </div>
        
    </div>
</template>

<script>
import PanelMenu from 'primevue/panelmenu';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

export default {
    name: "Menu",

    components: {
        PanelMenu,
        Dialog,
        Button
    },

    methods: {
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
        },

        toggleCode() {
            this.showSellerCode = !this.showSellerCode
        },

        openChat() {
            if(this.hostname == 'seupalpite.bet') {
               // eslint-disable-next-line
                WBOTopenChat()
            } else {
                window.open('https://wa.me/553173528313', '_blank');  // Abre o link em uma nova janela/aba
            }
        }
    },

    created() {
        this.user_logged = this.$store.getters.getUser;
    },

    data() {
        return {
            hostname: window.location.hostname,
            user_logged: {},
            showSellerCode: false,
        }
    },

}
</script>

<style scoped>
@keyframes pulse {
    0% {
        transform: scale(.9);
    }
    50% {
        transform: scale(1);
    }
}
.featured-item{
    background: red;
    padding: 3px 5px;
    color: white;
    font-weight: bold;
    font-size: 14px;
    animation: pulse 1s infinite;
    border-radius: 3px;
}
.menu-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    /* margin-bottom: 70px; */
    padding: 30px 20px;
    min-height: 100vh;
}
.section {
    margin-bottom: 10px;
}
.section-title{
    color: white;
    margin-bottom: 5px;
}
.menu-item {
    display: flex;
    align-items: center;
    color: #cdcdcd;
    text-decoration: none;
    padding: 10px 0px;
    gap: 15px;
    border-radius: 7px;
}

.menu-item:hover {
   color: white;
}


.menu-item > img {
    width: 20px;
    height: 20px;
}

:deep(.p-panelmenu) .p-panelmenu-header > a .p-panelmenu-icon {
    position: absolute !important;
    right: 0 !important;
    color: #878e97 !important;
}

:deep(.p-panelmenu) , :deep(.p-panelmenu-content) {
    border: 0 !important;
}

:deep(.p-panelmenu) .p-panelmenu-header > a {
    color: white !important;
    font-weight: 500 !important;
}

:deep(.p-panelmenu)  {
    width: 100% !important;
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


</style>