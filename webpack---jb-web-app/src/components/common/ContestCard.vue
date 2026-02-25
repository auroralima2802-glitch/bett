<template>
	<div class="contest-card">
		<div class="card-header">
			<span class="title">Concurso {{ contest.contest_number }}</span>
			<span class="sub-title">{{ formatDateWithYear(contest.datetime) }}</span>
		</div>

		<div class="card-body">
			<div class="row">
				<span class="number" v-for="(dezena, index) in JSON.parse(contest.result)" :key="index">{{ dezena }}</span>
				<!-- <span>{{ JSON.parse(contest.result).join(', ') }}</span> -->
			</div>
		</div>

		<div class="card-footer">
			<!-- <Button v-if="$store.getters.getLogged && $store.getters.getProducts[`${product}`]?.imprimir" @click="handleButtonPrint(contest)" elevation="2" class="print-btn">
				<i class="fas fa-print"></i>
			</Button>
			<Button v-if="$store.getters.getLogged && $store.getters.getProducts[`${product}`]?.compartilhar" elevation="2" class="print-btn">
				<i @click="handleButtonShare(contest)" class="fas fa-share-alt"></i>
			</Button> -->
			<Button @click="handleButtonPrint(contest)" elevation="2" class="print-btn">
				<i class="fas fa-print"></i>
			</Button>
			<Button @click="handleButtonShare(contest)" elevation="2" class="print-btn">
				<i class="fas fa-share-alt"></i>
			</Button>
		</div>

	</div>
</template>

<script>
import Button from "primevue/button";
import moment from 'moment'
import Dialog from 'primevue/dialog'

export default {
    name: "ContestCard",

    components: {
      Button,
	  Dialog
    },  

    props: {
      contest: Object,
	  product: String,
    },

    data() {
        return {
			showDialog: false,
			details: null,
			loading: false
        }
    },

    methods: {

		handleButtonPrint(contest) {
			if(this.$store.getters.getPrintMethod == 'Tipo 1') { // RAWBT
				var canvas = this.drawContestResult(contest)
				document.location='rawbt:'+ canvas.toDataURL()

				this.loading = true
				setTimeout(() => {
					this.loading = false
				}, 5000);
			}
			
			if(this.$store.getters.getPrintMethod == 'Tipo 2') { // BUPRINTER
                let canvas = this.drawContestResult(contest)

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
                    })
                    .catch((err) => {
                        console.log(err)
                    });
                });                
            }

			if(this.$store.getters.getPrintMethod == 'Tipo 4') {
                let canvas = this.drawContestResult(contest)

				this.loading = true
                this.$api.post('/images', {base64: canvas.toDataURL(), height: canvas.height, width: canvas.width}, {
                    headers: {
                        Authorization: this.accessToken()
                    },
                })
                .then((response) => {
                    document.location=`buprinter://print/${response.data.image.id}`
					this.loading = false
                })
                .catch((err) => {
                    console.log(err)
					this.loading = false
                });
            }

			if(this.$store.getters.getPrintMethod == 'Tipo 5') { // BUPRINTER
                let canvas = this.drawContestResult(contest)

                canvas.toBlob(blob => {
                    this.$api.post('/images/stores3', {attachment: blob}, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': this.accessToken(),
                        }
                    })
                    .then((response) => {
						document.location=`imageprinterapp://${response.data.url}&width=${this.$store.getters.getPaperSize}`                           
                    })
                    .catch((err) => {
                        console.log(err)
                    });
                });                
            }
			
		},

		drawContestResult (contest) {
			let paperSize = this.$store.getters.getPaperSize

			var canvas = document.createElement('canvas');
			canvas.width = paperSize == '80MM' ? 576 : 376;
			canvas.height = 10000;
			var ctx = canvas.getContext('2d');

			let x = 0;
			let y = 10;

			var date = moment(contest.datetime).format("DD/MM/Y");
      
			// cabeçalho
			y = this.drawLine(ctx, x, y)
			y = this.drawTitle(`Concurso ${contest.contest_number}`, ctx, canvas.width/2, y)
			y+=10
			y = this.drawTitle(date, ctx, canvas.width/2, y)
			y = this.drawLine(ctx, x, y)

			// numeros
			y = this.drawBoldText(`${JSON.parse(contest.result).join(', ')}`, ctx, x, y)
			

			this.resizeCanvas(canvas, ctx, canvas.width, y)

			return canvas
		},

		async handleButtonShare(contest) {
			var date = moment(contest.datetime).format("DD/MM/Y");
      
			let text = `
				Concurso ${contest.contest_number} (${contest.caixa_lottery_name}) 
				${date} 
				==============
				${JSON.parse(contest.result).join(', ')}
			`;
						
			navigator.share({
				title: "Resultado",
				text: text,
			})
			.then(() =>
				this.$router.push({
					path: "/",
				})
			)
			.catch((error) =>
				this.$toast.add({
					severity: "error",
					summary: "Erro",
					detail: error.response.data.error,
					life: 3000,
				})
			);
		},

    }

}
</script>

<style scoped>

.contest-card {
  	width: 340px;
    background: var(--bg-secondary);
    border-radius: 7px;
    color: white;
}
.card-header {
	display: flex;
	flex-direction: column;
	font-weight: bold;
	border-bottom: solid var(--bg-primary) 1px;
	padding: 10px;
}

.card-header > .sub-title {
	color: #cdcdcd;
	font-weight: bold;
	font-size: 14px;
}

.card-body {
	display: flex;
	flex-direction: column;
	padding: 10px;
	gap: 5px;
	border-bottom: solid var(--bg-primary) 1px;
	width: 340px;
}


.card-footer {
  display: flex;
  padding: 10px;
  gap: 10px;
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
    color: #cdcdcd;
    font-size: 16px;
    gap: 15px;
    align-items: center;
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
    /* background: var(--app-primary-color); */
    height: 35px;
    width: 35px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
	border: solid var(--border-color) 1px;
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

.contest-header {
	display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    border-bottom: solid #d5d5d5 1px;
    width: 100%;
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