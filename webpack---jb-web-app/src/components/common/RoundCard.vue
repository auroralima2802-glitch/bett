<template>

	<Dialog class="dialog" v-model:visible="showDialog" :showHeader="false" :modal="true" :dismissableMask="true">
		<template v-if="details">
			<div class="round-header">
				<span class="title">Rodada {{ round.number }} ({{getRoundStatus(details)}})</span>
				<span>{{ formatDate(details.initial_date) }} até {{ formatDate(details.final_date) }}</span>
			</div>

			<div class="round-summary">
				<div class="row">
					<span>Nº ganhadores ({{ details.qt_hits_partial_prize }} pontos)</span>
					<span>{{ details.qt_winners_partial_prize }}</span>
				</div>
				<div class="row">
					<span>Nº ganhadores (rodada)</span>
					<span>{{ details.qt_winners }}</span>
				</div>
				<div class="row">
					<span>Máximo acertos</span>
					<span>{{ details.max_hits }}</span>
				</div>
				<div v-if="details.max_hits > 0" class="row">
					<span>Pontos com {{ details.max_hits }} acertos</span>
					<span>{{ details.winning_tickets.length }}</span>
				</div>
				<div class="row">
					<span>Acumulado</span>
					<span>{{ formatCurrency(parseFloat(details.accumulated_value)) }}</span>
				</div>
				<div v-if="round.max_hits < 10" class="row">
					<span>Prêmio rateio:</span>
					<span>{{ formatCurrency(details.sales_amount * (details.prize_percentage/100)) }} ({{ round.qt_winners }})</span>
				</div>
				<div v-else class="row">
					<span>Prêmio 10 pontos</span>
					<span>{{ formatCurrency(details.paid_prize) }}</span>
				</div>
			</div>

			<div v-if="details.extractions.length > 0" class="round-extractions">
				<div style="margin-top: 5px; margin-bottom: 5px;">
					<span class="title">Resultados</span>
				</div>
				<div class="row" v-for="(extraction, index) in details.extractions" :key="index">
					<span>{{ extraction.name }} </span>
					<span class="numbers-label">{{ JSON.parse(extraction.items).join(' - ') }}</span>
				</div>
			</div>

			<div v-if="details.partial_winning_tickets.length > 0" class="round-winners">
				<span class="title">Prêmio parcial ({{ details.qt_hits_partial_prize }} pontos)</span>
				<div v-for="(ticket, index) in details.partial_winning_tickets" :key="index" style="width: 100%; border-bottom: 1px solid rgb(213, 213, 213); padding: 5px 0px;">
					<div class="row">
						<span>Ticket</span>
						<span>{{ ticket.id }}</span>
					</div>
					<div class="row">
						<span>Ponto</span>
						<span>
							{{ formatPointName(ticket) }}
						</span>
					</div>
					<div class="row">
						<span>Falta</span>
						<span class="numbers-label">{{ dezenasFaltantes(JSON.parse(ticket.selected_numbers), JSON.parse(ticket.hits)) }}</span>
					</div>
					<div class="row">
						<span>Acertos</span>
						<span class="numbers-label">{{ JSON.parse(ticket.hits).join('-') }}</span>
					</div>
					<div class="row">
						<span>Prêmio</span>
						<span>{{ formatCurrency(parseFloat(details.partial_prize/details.partial_winning_tickets.length)) }}</span>
					</div>
				</div>
			</div>

			<div v-if="details.winning_tickets.length > 0 && details.max_hits > 0" class="round-winners">
				<span class="title">Bilhetes que mais pontuaram ({{ details.max_hits }} pontos)</span>
				<div v-for="(ticket, index) in details.winning_tickets" :key="index" style="width: 100%; border-bottom: 1px solid rgb(213, 213, 213); padding: 5px 0px;">
					<div class="row">
						<span>Ticket</span>
						<span>{{ ticket.id }}</span>
					</div>
					<div class="row">
						<span>Ponto</span>
						<span>{{ formatPointName(ticket) }}</span>
					</div>
					<div class="row">
						<span>Falta</span>
						<span class="numbers-label">{{ dezenasFaltantes(JSON.parse(ticket.selected_numbers), JSON.parse(ticket.hits)) }}</span>
					</div>
					<div class="row">
						<span>Acertos</span>
						<span class="numbers-label">{{ JSON.parse(ticket.hits).join('-') }}</span>
					</div>
					<div v-if="details.finished" class="row">
						<span>Prêmio</span>
						<span>{{ formatCurrency(parseFloat(ticket.expected_value)) }}</span>
					</div>
				</div>
			</div>

			<div style="display: flex; gap: 10px">
				<Button v-if="$store.getters.getProducts.bolao_dezenas?.imprimir" :loading="loading" @click="handleButtonPrint(details)" elevation="2" class="print-btn">
					<i class="fas fa-print"></i>
				</Button>
				<Button v-if="$store.getters.getProducts.bolao_dezenas?.compartilhar" :loading="loading" @click="handleButtonShare(details)" elevation="2" class="print-btn">
					<i class="fas fa-share-alt"></i>
				</Button>
			</div>

		</template>
	</Dialog>

	<div class="round-card" :style="getBorderColor(round)">
		<div class="card-header">
			<div style="display: flex;align-items: center; justify-content: space-between; padding: 5px 10px;">
			<div class="title">
				<span>Rodada {{ round.number }} ({{ getRoundStatus(round) }})</span>
			</div>
			<button @click="showDetails(round)" class="btn-show-details">
				<i class="fal fa-eye"></i>
			</button>
			</div>
			<div style="display: flex;align-items: center; justify-content: space-between; padding: 5px 10px;">
				<span class="subtitle">{{ formatDate(round.initial_date) }} até {{ formatDate(round.final_date) }}</span>
				<span v-if="getRoundStatus(round) == 'encerrado' && round.max_hits < 10" class="accumulated-label">ACUMULOU!</span>
			</div>
		</div>

		<div class="card-body">
			<div class="row">
				<span>Prêmio acumulado:</span>
				<span>R$ {{ formatCurrency(parseFloat(round.accumulated_value)) }}</span>
			</div>
			<div class="row">
				<span>Prêmio {{ round.qt_hits_partial_prize }} pontos</span>
				<span>R$ {{ formatCurrency(parseFloat(round.partial_prize)) }}</span>
			</div>
			<div class="row">
				<span>Pontuação máxima:</span>
				<span>{{ round.max_hits }} {{ round.max_hits == 1 ? 'ponto' : 'pontos' }}</span>
			</div>

			<div v-if="round.max_hits < 10" class="row">
				<span>Prêmio rateio:</span>
				<span>{{ formatCurrency(round.sales_amount * (round.prize_percentage/100)) }} ({{ round.qt_winners }})</span>
			</div>

			<div v-else class="row">
				<span>Prêmio 10 pontos:</span>
				<span>{{ formatCurrency(round.paid_prize) }} ({{ round.qt_winners }})</span>
			</div>

		</div>

		<div class="card-footer">
			<Button v-if="getRoundStatus(round) == 'próxima rodada'" class="btn-bet" label="APOSTAR AGORA" @click="navigateToRoundBet()" />
		</div>

	</div>
</template>

<script>
import Button from "primevue/button";
import Dialog from 'primevue/dialog'

export default {
    name: "RoundCard",

    components: {
      Button,
	  Dialog
    },  

    props: {
      round: Object,
    },

    data() {
        return {
			showDialog: false,
			details: null,
			loading: false
        }
    },

    methods: {

		formatPointName (ticket) {
			if(ticket.online) {
				let maskedName = '';
				let foundSpace = false;

				for (let i = 0; i < ticket.point_name.length; i++) {
					if (ticket.point_name[i] === ' ') {
						maskedName += ' ';
						foundSpace = true;
					} else if (foundSpace) {
						maskedName += '*';
					} else {
						maskedName += ticket.point_name[i];
					}
				}

				return maskedName;
			} else {
				return ticket.point_name
			}
			
		},
		
		dezenasFaltantes(palpites, acertos) {
			var dezenas_faltantes = palpites

			for (let i = 0; i < palpites.length; i++) {
				for (let j = 0; j < acertos.length; j++) {
					if(palpites[i] == acertos[j]) {
						dezenas_faltantes.splice(i, 1)
					}
				}
			}

			return dezenas_faltantes.join('-')
		},

		loadRoundDetails(round) {
			this.$api
			.get(`/rounds/details`, {
				headers: {
					Authorization: this.accessToken(),
				},
				params: {
					round_id: round.id,
				},
			})
			.then((response) => {
				this.details = response.data;
			})
		},

		getRoundStatus(round) {
			if(new Date() < new Date(round.initial_date)) {
				return 'próxima rodada'
			}
			if((new Date() > new Date(round.initial_date)) 
				&& (new Date() < new Date(round.final_date))) {
				return 'em andamento'
			}
			if(round.finished) {
				return 'encerrado'
			}
		},

		showDetails(round) {
			this.$router.push({
				path: "/roundsDetails/" + round.id
			});
		},

		navigateToRoundBet() {
			this.$router.push({
				path: "/bet/bolaoDezenas"
			});
		},

		getBorderColor(round) {
			if(this.getRoundStatus(round) == 'em andamento' || this.getRoundStatus(round) == 'próxima rodada') {
				return 'border-left: 3px solid var(--app-primary-color);'
			} else {
				return 'border-left: 3px solid red;'
			}
		},

		drawRoundResult(details, maxHeight = 1250) {
			let paperSize = this.$store.getters.getPaperSize

			var canvas = document.createElement('canvas');
			canvas.width = paperSize == '80MM' ? 576 : 376;
			canvas.height = 10000;
			var ctx = canvas.getContext('2d');

			let x = 0;
			let y = 10;

			// cabeçalho
			y = this.drawLine(ctx, x, y)
			y = this.drawTitle('Rodada ' + details.number, ctx, canvas.width/2, y)
			y = this.drawLine(ctx, x, y)

			// sumário
			y = this.drawText(`Nº ganhadores ${details.qt_hits_partial_prize} pontos: ` + details.qt_winners_partial_prize, ctx, x, y)
			y = this.drawText('Nº ganhadores (rodada): ' + details.qt_winners, ctx, x, y)
			y = this.drawText('Acumulado: ' + this.formatCurrency(parseFloat(details.accumulated_value)), ctx, x, y)
			y = this.drawText('Máximo acertos: ' + details.max_hits, ctx, x, y)
			
			if(details.max_hits > 0) {
				y = this.drawText(`Pontos com ${details.max_hits} acertos: ${details.winning_tickets.length}`, ctx, x, y)
			}

			if(details.max_hits < 10) {
				y = this.drawText('Prêmio rateio: ' + this.formatCurrency(details.sales_amount * (details.prize_percentage/100)) + '(' + details.qt_winners + ')', ctx, x, y)
			} else {
				y = this.drawText('Prêmio 10 pontos: ' + this.formatCurrency(details.paid_prize), ctx, x, y)
			}

			if(details.extractions.length > 0) {
				y = this.drawLine(ctx, x, y)
				y = this.drawBoldText('Resultados', ctx, x, y)
				y += 10
				details.extractions.forEach((extraction) => {
					y = this.drawText(extraction.name, ctx, x, y)
					y = this.drawText(JSON.parse(extraction.items).join(' - '), ctx, x, y)
					y = this.drawLine(ctx, x, y)
				})
			}
			
			// bilhetes que ganharam a premiacao parcial 
			if(details.partial_winning_tickets.length > 0) {
				y = this.drawBoldText(`Prêmio parcial (${details.qt_hits_partial_prize} pontos)`, ctx, x, y)
				y += 10
				details.partial_winning_tickets.forEach((ticket) => {
					y = this.drawText('Ticket: ' + ticket.id, ctx, x, y)
					y = this.drawText('Ponto: ' + this.formatPointName(ticket), ctx, x, y)
					y = this.drawText('Falta: ' + this.dezenasFaltantes(JSON.parse(ticket.selected_numbers), JSON.parse(ticket.hits)), ctx, x, y)
					y = this.drawText('Acertos: ' + JSON.parse(ticket.hits).join(' - '), ctx, x, y)
					y = this.drawText('Prêmio: ' + this.formatCurrency(parseFloat(details.partial_prize/details.partial_winning_tickets.length)), ctx, x, y)
					y = this.drawLine(ctx, x, y)
				})
			}
			
			// bilhetes que pontuaram mais
			if(details.max_hits > 0) {
				y = this.drawBoldText(`Mais pontos`, ctx, x, y)
				y += 10
				details.winning_tickets.forEach((ticket) => {
					y = this.drawText('Ticket: ' + ticket.id, ctx, x, y)
					y = this.drawText('Ponto: ' + this.formatPointName(ticket), ctx, x, y)
					y = this.drawText('Falta: ' + this.dezenasFaltantes(JSON.parse(ticket.selected_numbers), JSON.parse(ticket.hits)), ctx, x, y)
					y = this.drawText('Acertos: ' + JSON.parse(ticket.hits).join(' - '), ctx, x, y)
					y = this.drawText('Prêmio: ' + this.formatCurrency(parseFloat(ticket.expected_value)), ctx, x, y)
					y = this.drawLine(ctx, x, y)
				})
			}

			this.resizeCanvas(canvas, ctx, canvas.width, y)

			let array = [canvas]
                
			if(canvas.height > maxHeight) {
				array = this.divideCanvas(canvas, maxHeight)
			} 

			return array
		},

		generateHtmlRoundResult(details){
			let paperSize = this.$store.getters.getPaperSize
			let fontSize = this.$store.getters.getFontSize

			let html = "print://escpos.org/escpos/bt/print?srcTp=uri&srcObj=html&src='data:text/html,";	

			html+= `<div style="width: ${paperSize == '58MM' ? 219.21 + 'px' :  302.36 + 'px'}; margin: 0; padding: 0">`

			// título
			html += `  
			<div style="display: flex; padding-top: 5px; justify-content: center; font-size: ${fontSize * 0.7}; margin-bottom: 10px; border-bottom: solid black 1px; border-top: solid black 1px">
				<span style="font-weight: bold">Rodada ${details.number}</span>
			</div>
			`
			// sumário
			html += `
			<div style="display: flex; flex-direction: column; padding-bottom: 10px; margin-bottom: 10px; border-bottom: solid black 1px; margin-bottom: 5px">
				<span>Nº ganhadores ${details.qt_hits_partial_prize} pontos: ${details.qt_winners_partial_prize}</span>
				<span>Nº ganhadores (rodada): ${details.qt_winners}</span>
				<span>Acumulado: ${this.formatCurrency(parseFloat(details.accumulated_value))}</span>
				<span>Máximo acertos: ${details.max_hits}</span>
			`

			if(details.max_hits > 0) {
				html += `<span>Pontos com ${details.max_hits} acertos: ${details.winning_tickets.length}</span>`
			}

			if(details.max_hits < 10) {
				html += `
				<span>Prêmio rateio: ${this.formatCurrency(details.sales_amount * (details.prize_percentage/100))} (${details.qt_winners})</span>
				`
			} else {
				html += `
				<span>Prêmio 10 pontos: ${this.formatCurrency(details.paid_prize)}</span>
				`
			}
		
			html += `</div>`

			html += `
				<span style="font-weight: bold; margin-bottom: 5px">Resultados</span>
			`
			details.extractions.forEach((extraction) => {
				html +=`
				<div style="display: flex; flex-direction: column; margin-bottom: 10px; border-bottom: solid black 1px;">
					<span>${extraction.name}</span>
					<span>${JSON.parse(extraction.items).join(' - ')}</span>
				</div>
				`	
			})

			
			// bilhetes que ganharam a premiacao parcial 
			if(details.partial_winning_tickets.length > 0) {
				html += `<span style="font-weight: bold"; margin-bottom: 10px>Prêmio parcial (${details.qt_hits_partial_prize} pontos)</span>`
				details.partial_winning_tickets.forEach((ticket) => {
					html += `
					<div style="display: flex; flex-direction: column; padding-bottom:10px; margin-bottom: 10px; border-bottom: solid black 1px;">
						<span>Ticket: ${ticket.id}</span>
						<span>Ponto: ${this.formatPointName(ticket)}</span>
						<span>Falta: ${this.dezenasFaltantes(JSON.parse(ticket.selected_numbers), JSON.parse(ticket.hits))}</span>
						<span>Acertos: ${JSON.parse(ticket.hits).join(' - ')}</span>
						<span>Prêmio: ${this.formatCurrency(parseFloat(details.partial_prize/details.partial_winning_tickets.length))}</span>
					</div>
					`
				})
			}


			if(details.max_hits > 0) {
				html += `
					<span style="font-weight: bold; margin-bottom: 5px">Mais pontos</span>
				`
				details.winning_tickets.forEach((ticket) => {
					html += `
					<div style="display: flex; flex-direction: column; padding-bottom:10px; margin-bottom: 10px; border-bottom: solid black 1px;">
						<span>Ticket: ${ticket.id}</span>
						<span>Ponto:  ${this.formatPointName(ticket)}</span>
						<span>Falta: ${this.dezenasFaltantes(JSON.parse(ticket.selected_numbers), JSON.parse(ticket.hits))}</span>
						<span>${'Acertos: ' + JSON.parse(ticket.hits).join(' - ')}</span>
						<span>Prêmio: ${this.formatCurrency(parseFloat(ticket.expected_value))}</span>
					</div>
					`
				})
			}
			

			html += `</div>`

			return html
		},

		handleButtonShare(round) {
			this.loading = true
			var canvas = this.drawRoundResult(round, 50000)[0]

			canvas.toBlob(blob => {
				this.$api.post('/images/stores3', {attachment: blob}, {
					headers: {
						'Content-Type': 'multipart/form-data',
						'Authorization': this.accessToken(),
					}
				})
				.then((response) => {
					this.loading = false
					navigator.share({
						title: `Rodada ${round.number}`,
						url: response.data.url,
					})
				})
				.catch((err) => {
					this.loading = false
					console.log(err)
				});
			});                
            

			/* let text = ''

			text+= `Rodada ${round.number}\n`
			text+= '-----------------------------------------------\n'
			text+= `Nº ganhadores ${round.qt_hits_partial_prize} pontos: ${round.qt_winners_partial_prize}\n`
			text+= `Nº ganhadores (rodada): ${round.qt_winners}\n`
			text+= `Acumulado: ${this.formatCurrency(parseFloat(round.accumulated_value))}\n`
			text+= `Máximo acertos: ${round.max_hits}\n`

			if(round.max_hits < 10) {
				text+=`Prêmio rateio: ${this.formatCurrency(round.sales_amount * (round.prize_percentage/100))} (${round.qt_winners})\n`
				text+= '-----------------------------------------------\n'
			} else {
				text+=`Prêmio 10 pontos: ${this.formatCurrency(round.paid_prize)}\n`
				text+= '-----------------------------------------------\n'
			}

			if(round.extractions.length > 0) {
				text+= 'Resultados\n'
				round.extractions.forEach((extraction) => {
					text+=`${extraction.name} -> ${JSON.parse(extraction.items).join(' - ')}\n`
				})
				text+= '-----------------------------------------------\n'
			}
			

			if(round.partial_winning_tickets.length > 0) {
				text+= `Prêmio parcial (${round.qt_hits_partial_prize} pontos)\n`
				round.partial_winning_tickets.forEach((ticket) => {
					text+= `Ticket: ${ticket.id}\n`
					text+= `Ponto: ${ticket.point_name}\n`
					text+= `Falta: ${this.dezenasFaltantes(JSON.parse(ticket.selected_numbers), JSON.parse(ticket.hits))}\n`
					text+= `Acertos: ${JSON.parse(ticket.hits).join(' - ')}\n`
					text+= `Prêmio: ${this.formatCurrency(parseFloat(round.partial_prize/round.partial_winning_tickets.length))}\n`
					text+= '-----------------------------------------------\n'
				})
			}

			if(round.winning_tickets.length > 0) {
				text+= `Mais pontos\n`
				round.winning_tickets.forEach((ticket) => {
					text+= `Ticket: ${ticket.id}\n`
					text+= `Ponto: ${ticket.point_name}\n`
					text+= `Falta: ${this.dezenasFaltantes(JSON.parse(ticket.selected_numbers), JSON.parse(ticket.hits))}\n`
					text+= `Acertos: ${JSON.parse(ticket.hits).join(' - ')}\n`
					text+= `Prêmio: ${this.formatCurrency(parseFloat(ticket.expected_value))}\n`
					text+= '-----------------------------------------------\n'
					
				})
			} */
			
			/* navigator.share({
				title: `Rodada ${round.number}`,
				text: text,
			}) */
			
		},

		handleButtonPrint(round) {

			if(this.$store.getters.getPrintMethod == 'Tipo 1') { // RAWBT
				var canvasList = this.drawRoundResult(round)

				canvasList.forEach(function(canvas, index) {
					setTimeout(function() {
						document.location = 'rawbt:' + canvas.toDataURL();
					}, index * 5000);
				});

				this.loading = true
				setTimeout(() => {
					this.loading = false
				}, 5000);

			} 

			if(this.$store.getters.getPrintMethod == 'Tipo 2') { // BUPRINTER
				this.loading = true
                let canvas = this.drawRoundResult(round, 10000)[0]

                canvas.toBlob(blob => {
                    this.$api.post('/images/stores3', {attachment: blob}, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': this.accessToken(),
                        }
                    })
                    .then((response) => {
                        const encodedUrl = btoa(response.data.url + `&width=${canvas.width}`);
                        document.location=`buprinter://print/${encodedUrl}`
						this.loading = false
                    })
                    .catch((err) => {
                        console.log(err)
						this.loading = false
                    });
                });                
            }

			if(this.$store.getters.getPrintMethod == 'Tipo 3') {
				var html = this.generateHtmlRoundResult(round)
                document.location.href = html

				this.loading = true
				setTimeout(() => {
					this.loading = false
				}, 5000);

			}

			if(this.$store.getters.getPrintMethod == 'Tipo 4') {
                let canvas = this.drawRoundResult(round, 10000)

                this.$api.post('/images', {base64: canvas[0].toDataURL(), height: canvas[0].height, width: canvas[0].width}, {
                    headers: {
                        Authorization: this.accessToken()
                    },
                })
                .then((response) => {
                    document.location=`buprinter://print/${response.data.image.id}`
                    this.$router.push({
                        path: this.path,
                        replace: true
                    }) 
                })
                .catch((err) => {
                    console.log(err)
                });
            }

			if(this.$store.getters.getPrintMethod == 'Tipo 5') { // BUPRINTER
				this.loading = true
                let canvas = this.drawRoundResult(round, 10000)[0]

                canvas.toBlob(blob => {
                    this.$api.post('/images/stores3', {attachment: blob}, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': this.accessToken(),
                        }
                    })
                    .then((response) => {
						document.location=`imageprinterapp://${response.data.url}&width=${this.$store.getters.getPaperSize}`                           
						this.loading = false
                    })
                    .catch((err) => {
                        console.log(err)
						this.loading = false
                    });
                });                
            }
			
		},
    }

}
</script>

<style scoped>

.round-card {
  width: 340px;
    background: var(--bg-secondary);
    border-radius: 7px;
    color: white;
}
.card-header {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  border-bottom: solid #20252c 1px;
}

.card-body {
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;
  border-bottom: solid #20252c 1px;
  width: 340px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.accumulated-label {
  background: red;
  display: flex;
  width: fit-content;
  padding: 5px;
  border-radius: 7px;
  font-size: 14px;
}

.row {
  display: flex;
  justify-content: space-between;
  color: #cdcdcd;
  font-size: 16px;
  gap: 15px
}

.subtitle {
  color: #cdcdcd;
  font-weight: bold;
  font-size: 14px;
}

.number-table {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.number {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--app-primary-color);
    height: 33px;
    width: 33px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
}

.btn-bet {
  width: 100%;
}

.btn-show-details {
	display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    background: #2a323d;
    border-radius: 7px;
    color: white;
    border: solid #3f4b5b 1px;
	cursor: pointer;
}

.btn-show-details:hover {
	background: #535454;
}

.round-header {
	display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    border-bottom: solid #d5d5d5 1px;
    width: 100%;
    padding-bottom: 10px;
}

.round-summary, .round-winners {
    padding: 5px 0px;
}

.round-summary {
	border-bottom: solid #d5d5d5 1px;
}

.round-winners, .round-extractions {
	display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.round-extractions {
	border-bottom: 1px solid rgb(213, 213, 213);
    padding-bottom: 10px;
}

.title {
	margin-bottom: 5px;
	font-weight: bold;
}

.numbers-label {
	font-size: 16px;
}

@media screen and (max-width: 800px) {
	.numbers-label {
		font-size: 14px;
	}
}

</style>