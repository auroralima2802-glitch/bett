<template>
    <div class="ticket-container">

        <div></div>

        <div class="ticket-content">
            
            <div class="no-games-message" v-if="$store.getters.getGames == 0">
                <img src="../../assets/ticket.png" alt="ticket-logo">
                <span>Nenhum palpite adicionado.</span>
            </div>

            <div class="content-item" v-for="(game, index) in $store.getters.getGames" :key="index">
                <div class="item-header">
                    <div>{{game.loteria}}</div>
                    <div>
                        <button class="btn-game" @click="handleEditGame(game)"> <i class="fas fa-edit"/> </button>
                        <button class="btn-game" @click="handleRemoveGame(game)"> <i class="fas fa-times"/> </button>
                    </div>
				</div>
                <div class="item-body">
                    <span style="font-weight: bold; font-size: 16px; color: white">{{game.modalidade}}</span>
                    <span>Posição: {{game.award_name}}</span>
                    <span v-if="!game.modalidade.includes('Milhar')">Lado: {{game.positions.join(', ')}}</span>
                    <span>Palpites: {{game.palpites.join(', ')}}</span>
                </div>
                <div class="item-footer">
                    <money3 v-if="game.loteria.includes('PT-RIO')" class="money-input" v-on:keyup.enter="hideKeyboard('.money-input')" v-model="game.valor" v-bind="moneyconfig"/>
                    <span v-else class="money-input">{{formatCurrency(parseFloat(game.valor))}}</span>
                </div>

            </div>
        </div>

        <div class="ticket-footer">
            <div class="footer-item">
                <span>Total</span>
                <span>R${{this.formatCurrency($store.getters.getGames.reduce((total, game) => total + parseFloat(game.valor), 0))}}</span>
            </div>  
            <Button @click="handleCreateTicket" class="btn-submit" label="Finalizar aposta" :loading="loading" />
        </div>
        
    </div>
</template>

<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext'

export default {
   name: "Ticket",

   components: {
    Button,
    InputText,
   },

    data() {
        return {
            loading: false,
            moneyconfig: {
				masked: false,
				prefix: 'R$ ',
				suffix: '',
				thousands: '.',
				decimal: ',',
				precision: 2,
				disableNegative: false,
				disabled: false,
				min: null,
				max: null,
				allowBlank: false,
				minimumNumberOfCharacters: 0,
			}
        }
    },

    methods: {

        handleRemoveGame (game) {
            this.$store.dispatch("removeGame", {
				game: game
			});
		},

        handleEditGame (game) {
            let path = ''

            switch (game.lottery_name) {
                case 'Tradicional':
                    path = "/bet/tradicional"
                    break;

                case 'Ligeirinha':
                    path = "/bet/ligeirinha"
                    break;
                    
                case 'Instantâneo':
                    path = "/bet/instantaneo"
                    break;

                case 'Baú':
                    path = "/bet/bau"
                    break;

                default:
                    path = "/bet/tradicional"
                    break;
            }

            this.$store.dispatch("removeGame", {
				game: game
			});

            // PUSH TO BET
            this.$router.push({
                path: path
            });
            
            this.close()

            setTimeout(function(){ 
                document.dispatchEvent(new CustomEvent('editGame', {
                    detail: {
                        game: game
                    }
                }))
            }, 1000);
        },
        
        close() {
            this.$emit('close');
        },

        isTicketValid() { // verifica se os palpites são iguais para os horarios selecionados, se não for retorna false
            const games = this.$store.getters.getGames

            const grouped = games.reduce((acc, game) => {
                const key = game.loteria;
                if (!acc[key]) {
                    acc[key] = {
                        loteria: key,
                        total: 0
                    };
                }
                acc[key].total += parseFloat(game.valor);
                return acc;
            }, {});

            const result = Object.values(grouped);

            for (let i = 1; i < result.length; i++) {
                if (result[i].total !== result[0].total) {
                    return false;
                }
            }

            return true;
        },

        handleCreateTicket() {
            if(!this.isTicketValid()) {
                this.$toast.add({severity:'error', summary: 'Erro', detail: 'Aposta não finalizada pois os palpites são diferentes pra os horários selecionados.', life: 15000});
                return
            }

            this.loading = true

            this.$api.post('/tickets', {tickets: this.$store.getters.getGames}, {
                headers: {
                    Authorization: this.accessToken()
                },
            })
            .then((response) => {
                this.loading = false
                this.$toast.add({severity:'success', summary: 'Sucesso', detail:'Aposta concluída com sucesso!', life: 3000});
                this.$store.dispatch("clearGameList");

                this.$store.dispatch("setTicket", {
                    ticket: response.data
                });

                this.loadBalance()
                // PUSH TO TICKET SUMMARY
                this.$router.push({
                    name: "betOverview",
                    path: "/betOverview",
                });


            })
            .catch((err) => {
                this.loading = false
                this.$toast.add({severity:'error', summary: 'Erro', detail: err.response.data.error, life: 15000});
            });
            
			
		},

    }

}
</script>

<style scoped>

.ticket-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    color: white;
}

.ticket-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
}

.no-games-message {
    display: flex; 
    flex-direction: column; 
    align-items: center;
}
.no-games-message > img {
    width: 80px;
}

.content-item {
    width: 100%;
    margin-top: 10px;
    border-radius: 7px;
    /* background-color: #21252c; */
}

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
    background-color: var(--bg-secondary);
    border-bottom: solid var(--bg-primary) 1px;
    font-weight: bold;
    font-size: 18px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
}

.item-header > div {
    display: flex;
    flex-direction: row;
    gap: 20px;
    font-size: 16px;
}

.item-body {
    display: flex;
    flex-direction: column;
    background-color: var(--bg-secondary);
    padding: 5px 15px;
}

.ticket-footer {
    margin-top: 10px;
    width: 100%;
    padding: 20px;
    background-color: var(--bg-secondary);
}

.footer-item {
    margin-bottom: 15px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.btn-submit {
    width: 100%;
    cursor: pointer;
    color: white;
    font-weight: 600;
    font-size: 14px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: var(--app-primary-color);
}

span {
    font-size: 14px;
    color: lightgray;
}

.item-header > div > button {
    background-color: transparent;
    color: white;
    border: none;
    border-radius: 7px;
    font-size: 22px;
}
.money-input {
    display: flex;
    align-items: center;
    background: var(--bg-secondary);
    width: 100% !important;
    height: 40px;
    border: solid #3f4b5b 1px;
    color: white;
    padding: 0px 12px;
    font-weight: bold;
    font-size: 14px;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
}

@media screen and (max-width: 800px) {
}

</style>