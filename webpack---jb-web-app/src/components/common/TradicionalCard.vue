<template>
    <div class="card">
        <div class="card-header">
            <span class="title">{{ result.name }}</span>
            <span class="sub-title">{{ formatDateWithYear(result.datetime) }}</span>
        </div>

        <div class="card-body">
            <div :class="`animal-cover ${getAnimal(result.first.slice(-2)).icon}`">
                <div class="shadow-vertical">
                    <div class="shadow-horizontal">
                        <div class="animal">
                            <h5>
                                {{
                                    result.first.slice(-2) +
                                    " " +
                                    getAnimal(result.first.slice(-2)).name
                                }}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <div style="width: 100%">
                <div class="row">
                    <div class="column">1º</div>
                    <div class="column">{{ result.first }}</div>
                </div>
                <div class="row">
                    <div class="column">2º</div>
                    <div class="column">{{ result.second }}</div>
                </div>
                <div class="row">
                    <div class="column">3º</div>
                    <div class="column">{{ result.third }}</div>
                </div>
                <div class="row">
                    <div class="column">4º</div>
                    <div class="column">{{ result.fourth }}</div>
                </div>
                <div class="row">
                    <div class="column">5º</div>
                    <div class="column">{{ result.fifth }}</div>
                </div>
                <div class="row">
                    <div class="column">6º</div>
                    <div class="column">{{ result.sixth }}</div>
                </div>
                <div class="row">
                    <div class="column">7º</div>
                    <div class="column">{{ result.seventh }}</div>
                </div>
                <div class="row">
                    <div class="column">S</div>
                    <div class="column">{{ result.eighth }}</div>
                </div>
            </div>
        </div>

        <div class="card-footer">
            <div style="display: flex; gap: 10px">
                <Button v-if="$store.getters.getLogged && $store.getters.getRegionConfig.can_print"
                    :loading="loading.print"
                    @click="handleButtonPrint(result)"
                    elevation="2"
                    class="print-btn"
                >
                    <i class="fas fa-print"></i>
                </Button>
                <Button v-if="$store.getters.getLogged && $store.getters.getRegionConfig.can_share" elevation="2" class="print-btn">
                    <i @click="handleButtonShare(result)" class="fas fa-share-alt"></i>
                </Button>
            </div>
        </div>
        </div>
</template>

<script>
import Button from "primevue/button";
import moment from 'moment'

export default {
    name: "TradicionalCard",

    components: {
        Button
    },  

    props: {
        result: Object,
    },

    data() {
        return {
            printMethod: null,
            loading: {
                print: false
            }
        }
    },

    created() {
      this.printMethod = this.$store.getters.getPrintMethod
    },

    methods: {
    
        handleButtonPrint() {
            this.printResult()
        },

        async handleButtonShare(result) {
            var date = moment(result.datetime).format("DD/MM/Y");
            
            let text = `
            ${result.name} 
            ${date} 
            ==============
            1º: ${result.first} - ${this.getAnimal(result.first.slice(-2)).name}
            2º: ${result.second} - ${this.getAnimal(result.second.slice(-2)).name}
            3º: ${result.third} - ${this.getAnimal(result.third.slice(-2)).name}
            4º: ${result.fourth} - ${this.getAnimal(result.fourth.slice(-2)).name}
            5º: ${result.fifth} - ${this.getAnimal(result.fifth.slice(-2)).name}
            6º: ${result.sixth} - ${this.getAnimal(result.sixth.slice(-2)).name}
            7º: ${result.seventh} - ${this.getAnimal(result.seventh.slice(-2)).name}
            S: ${result.eighth} - ${this.getAnimal(result.eighth).name}
            `;
            
            navigator
            .share({
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

        drawResult () {
            let paperSize = this.$store.getters.getPaperSize
            var fontSize = this.$store.getters.getFontSize
            let result = this.result
            let date = moment(result.datetime).format("DD/MM/Y");

            var canvas = document.createElement('canvas');
            canvas.width = paperSize == '80MM' ? 576 : 376;
            canvas.height = 10000;
            var ctx = canvas.getContext('2d');

            let x = 0;
            let y = 10;

            // cabeçalho


            if([5, 8, 9, 13].includes(this.loggedUser().region_id)) {
                y = this.drawLine(ctx, x, y)
                y = this.drawTitle('LEÃO DA SORTE', ctx, canvas.width/2, y, 8)
                y = this.drawLine(ctx, x, y)
                y = this.drawTitle(`${result.name}`, ctx, canvas.width/2, y, 8)
                y+=(fontSize)
                y = this.drawTitle(`${date}`, ctx, canvas.width/2, y, 8)
                y = this.drawLine(ctx, x, y)
            } else {
                y = this.drawLine(ctx, x, y)
                y = this.drawTitle(`${result.name}`, ctx, canvas.width/2, y, 8)
                y+=(fontSize)
                y = this.drawTitle(`${date}`, ctx, canvas.width/2, y, 8)
                y = this.drawLine(ctx, x, y)
            }

            y = this.drawText("1º: " + result.first + ' - ' + this.getAnimal(result.first.slice(-2)).name, ctx, x, y, 8)
            y = this.drawText("2º: " + result.second + ' - ' + this.getAnimal(result.second.slice(-2)).name, ctx, x, y, 8)
            y = this.drawText("3º: " + result.third + ' - ' + this.getAnimal(result.third.slice(-2)).name, ctx, x, y, 8)
            y = this.drawText("4º: " + result.fourth + ' - ' + this.getAnimal(result.fourth.slice(-2)).name, ctx, x, y, 8)
            y = this.drawText("5º: " + result.fifth + ' - ' + this.getAnimal(result.fifth.slice(-2)).name, ctx, x, y, 8)
            y = this.drawText("6º: " + result.sixth + ' - ' + this.getAnimal(result.sixth.slice(-2)).name, ctx, x, y, 8)
            y = this.drawText("7º: " + result.seventh + ' - ' + this.getAnimal(result.seventh.slice(-2)).name, ctx, x, y, 8)
            y = this.drawText("S: " + result.eighth + ' - ' + this.getAnimal(result.eighth).name, ctx, x, y, 8)

            this.resizeCanvas(canvas, ctx, canvas.width, y)

            return canvas
        },

        // Create ticket layout for printing on ESCPOS device
        printResult() {

          console.log(this.printMethod)
            if(this.printMethod == 'Tipo 1') { // formato de imagem
                let canvas = this.drawResult()
                document.location='rawbt:'+ canvas.toDataURL()

                this.loading.print = true
                setTimeout(() => {
                    this.loading.print = false
                }, 5000);
            } 

            if(this.printMethod == 'Tipo 2') { // BUPRINTER
                this.loading.print = true
                let canvas = this.drawResult()

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
                        this.loading.print = false
                    })
                    .catch((err) => {
                        console.log(err)
                        this.loading.print = false
                    });
                });                
            }

            if(this.printMethod == 'Tipo 3') { // ESCPOS PRINT SERVICE
                var html = this.generateHtmlResult()
                document.location.href = html
            }

            if(this.printMethod == 'Tipo 4') {
                let canvas = this.drawResult()

                this.loading.print = true
                this.$api.post('/images', {base64: canvas.toDataURL(), height: canvas.height, width: canvas.width}, {
                    headers: {
                        Authorization: this.accessToken()
                    },
                })
                .then((response) => {
                    document.location=`buprinter://print/${response.data.image.id}`
                    this.loading.print = false
                })
                .catch((err) => {
                    console.log(err)
                    this.loading.print = false
                });
            }

            if(this.printMethod == 'Tipo 5') { // BUPRINTER
                this.loading.print = true
                let canvas = this.drawResult()

                canvas.toBlob(blob => {
                    this.$api.post('/images/stores3', {attachment: blob}, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': this.accessToken(),
                        }
                    })
                    .then((response) => {
                      document.location=`imageprinterapp://${response.data.url}&width=${this.$store.getters.getPaperSize}`                           
                        this.loading.print = false
                    })
                    .catch(() => {
                        this.loading.print = false
                    });
                });                
            }
            
        },

        generateHtmlResult(){
            let date = moment(this.result.datetime).format("DD/MM/Y");
            let html = "print://escpos.org/escpos/bt/print?srcTp=uri&srcObj=html&src='data:text/html,";	

            html+= `<div style="width: ${this.paperSize == '58MM' ? 219.21 + 'px' :  302.36 + 'px'}; margin: 0; padding: 0">`

            // título
            html += `  
            <div style="display: flex; justify-content: center; font-size: ${this.fontSize * 0.7}; margin-bottom: 10px; border-bottom: solid black 1px; border-top: solid black 1px">
                <span>${this.result.name} - ${date}</span>
            </div>
            `

            html += `
            <div style="display: flex; flex-direction: column; font-size: ${this.fontSize * 0.7}">
                <span>1º ${this.result.first + ' - ' + this.getAnimal(this.result.first.slice(-2)).name}</span>
                <span>2º ${this.result.second + ' - ' + this.getAnimal(this.result.second.slice(-2)).name}</span>
                <span>3º ${this.result.third + ' - ' + this.getAnimal(this.result.third.slice(-2)).name}</span>
                <span>4º ${this.result.fourth + ' - ' + this.getAnimal(this.result.fourth.slice(-2)).name}</span>
                <span>5º ${this.result.fifth + ' - ' + this.getAnimal(this.result.fifth.slice(-2)).name}</span>
                <span>6º ${this.result.sixth + ' - ' + this.getAnimal(this.result.sixth.slice(-2)).name}</span>
                <span>7º ${this.result.seventh + ' - ' + this.getAnimal(this.result.seventh.slice(-2)).name}</span>
                <span>S ${this.result.eighth + ' - ' + this.getAnimal(this.result.eighth).name}</span>
            </div>
            `

            html += `</div>`
            
            return html
        },

  },

}
</script>


<style scoped lang="scss">
.result-list {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 340px;
  overflow: auto;
  gap: 10px;
}

.card {
  border-radius: 7px;
  background-color: var(--bg-secondary);
  margin-bottom: 20px;
  color: white;
}

.card-header {
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-weight: bold;
}

.card-header > .sub-title {
  color: #cdcdcd;
  font-weight: bold;
  font-size: 14px;
}

.card-body {
  display: flex;
  align-items: center;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0px 10px;
  color: white;
}

.column {
  font-size: 16px;
  font-weight: bold;
  color: #cdcdcd;
}

/* CARTÃO DE RESULTADO */

.animal-cover {
  height: 135px;
  width: 200px;
  background-image: url("../../assets/animals/covers/lion-cover.png");
  background-size: cover;
}

.crocodile {
  background-image: url("../../assets/animals/covers/crocodile-cover.jpg");
}
.bear {
  background-image: url("../../assets/animals/covers/bear-cover.jpg");
}

.bull {
  background-image: url("../../assets/animals/covers/bull-cover.jpg");
}

.butterfly {
  background-image: url("../../assets/animals/covers/butterfly-cover.jpg");
}

.camel {
  background-image: url("../../assets/animals/covers/camel-cover.jpg");
}

.cat {
  background-image: url("../../assets/animals/covers/cat-cover.jpg");
}

.cow {
  background-image: url("../../assets/animals/covers/cow-cover.jpg");
}

.deer {
  background-image: url("../../assets/animals/covers/deer-cover.jpg");
}

.dog {
  background-image: url("../../assets/animals/covers/dog-cover.jpg");
}

.donkey {
  background-image: url("../../assets/animals/covers/donkey-cover.jpg");
}

.eagle {
  background-image: url("../../assets/animals/covers/eagle-cover.jpg");
}

.elephant {
  background-image: url("../../assets/animals/covers/elephant-cover.jpg");
}

.goat {
  background-image: url("../../assets/animals/covers/goat-cover.jpg");
}

.horse {
  background-image: url("../../assets/animals/covers/horse-cover.jpg");
}

.lion {
  background-image: url("../../assets/animals/covers/lion-cover.png");
}

.monkey {
  background-image: url("../../assets/animals/covers/monkey-cover.jpg");
}

.ostrich {
  background-image: url("../../assets/animals/covers/ostrich-cover.jpg");
}

.peacock {
  background-image: url("../../assets/animals/covers/peacock-cover.jpg");
}

.pig {
  background-image: url("../../assets/animals/covers/pig-cover.jpg");
}

.rabbit {
  background-image: url("../../assets/animals/covers/rabbit-cover.jpg");
}

.ram {
  background-image: url("../../assets/animals/covers/ram-cover.jpg");
}

.galo {
  background-image: url("../../assets/animals/covers/galo-cover.jpg");
}

.cobra {
  background-image: url("../../assets/animals/covers/cobra-cover.jpg");
}

.tiger {
  background-image: url("../../assets/animals/covers/tiger-cover.jpg");
}

.turkey {
  background-image: url("../../assets/animals/covers/turkey-cover.jpg");
}

.shadow-vertical {
  height: inherit;
  width: inherit;
  background: linear-gradient(to top, var(--bg-secondary), transparent 50%);
}

.shadow-horizontal {
  height: inherit;
  width: inherit;
  background: linear-gradient(to left, var(--bg-secondary), transparent 30%);
}

.animal {
  width: fit-content;
  border-radius: 7px;
  padding: 3px 5px;
  background: var(--app-primary-color);
  position: relative;
  left: 5px;
  top: 5px;
}


</style>