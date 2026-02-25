<template>
    <ConfirmDialog/>


    <Dialog class="dialog" v-model:visible="show" :showHeader="false" :modal="true" :dismissableMask="true">
        <div class="wallet-container">

            <div class="wallet-header">
                <h3 class="title">Carteira</h3>
                <div class="subtitle">Saldo: R$ {{this.formatCurrency(parseFloat($store.getters.getBalance ?? 0))}}</div>
                <!-- <div class="subtitle">Bônus: R$ {{this.formatCurrency(parseFloat($store.getters.getBonusBalance))}}</div> -->
            </div>

            <TabView ref="tabview1">

                <TabPanel header="Depositar">
                    <div class="wallet-body" v-if="oldDepositEnabled">

                        <div class="step-one">
                            <div class="section">
                                <money3 class="money-input" v-model="depositValue" v-bind="moneyconfig"/>
                            </div>

                            <div class="section">
                                <Button label="Próximo" @click="pageTwo()" icon="pi pi-angle-right" icon-pos="right"></Button>
                            </div>
                        </div>

                        <div class="step-two">
                            <div class="section">
                                <h3>Detalhes do pedido</h3>
                                <span>
                                    R$ {{this.formatCurrency(depositValue)}}
                                </span>

                                <h3>Instruções</h3>
                                <span>
                                    1. Entre no Internet Banking do seu banco preferido e selecione a opção PIX. <br>
                                    2. Selecione a opção QR Code e escaneie o código com a câmera do seu celular para efetuar o pagamento. <br>
                                    3. Por fim, clique em confirmar pagamento. <br>
                                </span>
                            </div>
                            
                            <div class="section qrcode-container">
                                <div class="qrcode">
                                    <qrcode-vue :value="pix_code" :size="150" level="H" />
                                </div>
                                <button @click="copyText()" class="btn-copy">
                                    <span>Copiar pix</span>
                                    <i class="far fa-copy"></i>
                                </button>
                            </div>

                            <Button label="Próximo" @click="pageThree()" icon="pi pi-angle-right" icon-pos="right"></Button>
                           
                        </div>
                        
                        <div class="step-three">

                            <label>
                                Comprovante de pagamento <br>
                                <input type="file" @change="handleFileUpload($event)"/>
                            </label>
                            
                            <Button @click="submitDeposit()" class="btn-submit" label="Enviar solicitação de depósito" :loading="loading" />
                        </div>

                    </div>
                    
                    <div v-else>
                        <div class="value-container" v-show="!paymentCreated && !loadingCode">
                            <p>Qual valor deseja depositar?</p>
                            <small class="error">{{error}}</small>
                            <money3 inputmode="numeric" placeholder="Valor do depósito"  class="money-input pix-value" v-model="depositValue" v-bind="moneyconfig"/>

                            <div class="info" v-if="maxDeposit && minDeposit">
                                <div><small>Min: R$ {{ minDeposit.toFixed(2) }}</small></div>
                                <div><small>Max: R$ {{ maxDeposit.toFixed(2) }}</small></div>
                            </div>
                            <div class="info" v-else>
                                <div><small><i class="pi pi-spin pi-spinner"></i> Carregando limites...</small></div>
                            </div>
                            <div class="p-button p-component" @click="getPixQR" :disabled="!minDeposit || !maxDeposit">
                                Continuar <i class="pi pi-arrow-right"></i>
                            </div>
                        </div>

                        <div v-if="loadingCode" class="loading">
                            <svg class="pix-loading"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 488.6C280.3 518.1 231.1 518.1 200.8 488.6L103.3 391.2H112.6C132.6 391.2 151.5 383.4 165.7 369.2L242.4 292.5zM262.5 218.9C256.1 224.4 247.9 224.5 242.4 218.9L165.7 142.2C151.5 127.1 132.6 120.2 112.6 120.2H103.3L200.7 22.76C231.1-7.586 280.3-7.586 310.6 22.76L407.8 119.9H392.6C372.6 119.9 353.7 127.7 339.5 141.9L262.5 218.9zM112.6 142.7C126.4 142.7 139.1 148.3 149.7 158.1L226.4 234.8C233.6 241.1 243 245.6 252.5 245.6C261.9 245.6 271.3 241.1 278.5 234.8L355.5 157.8C365.3 148.1 378.8 142.5 392.6 142.5H430.3L488.6 200.8C518.9 231.1 518.9 280.3 488.6 310.6L430.3 368.9H392.6C378.8 368.9 365.3 363.3 355.5 353.5L278.5 276.5C264.6 262.6 240.3 262.6 226.4 276.6L149.7 353.2C139.1 363 126.4 368.6 112.6 368.6H80.78L22.76 310.6C-7.586 280.3-7.586 231.1 22.76 200.8L80.78 142.7H112.6z"/></svg>
                            Gerando Código de Pagamento...
                        </div>
                        <div class="qrcode-container" v-show="paymentCreated  && !loadingCode">
                            <div @click="back" class="back p-button-sm"><i class="pi pi-arrow-left"></i> Alterar Valor</div>
                            <b id="deposit-value">Valor de depósito:</b>
                            <h3>R$ {{depositValue}} </h3>
                            <div class="qrcode">
                                <img width="180" v-if="qrCode" :src="qrCode">
                            </div>
                            <small class="code-valid"><i class="pi pi-clock p-mt-1"></i> Código válido por 1H</small>
                            <div v-if="copiaCola" class="copia-cola-container">
                                <b>Pix Copia e cola:</b>
                                <div class="copia-cola" >{{ copiaCola }}</div>
                                <div @click="copiar" class="p-button p-button-info"><i class="pi pi-copy"></i>Copiar</div>
                            </div>
                            <div class="instructions">
                                <p>Como pagar?</p>
                                <ol>
                                    <li>Entre no app ou site do seu banco e escolha a opção de pagamento via Pix.</li>
                                    <li>Escaneie o código QR ou copie e cole o código de pagamento.</li>
                                    <li>Pronto! O pagamento será creditado na hora e você receberá um e-mail de confirmação.</li>

                                </ol>
                            </div>
                            <div class="copia-cola-container">
                                <div @click="cancelPixQR()" class="p-button p-button-info"><i class="fa-solid fa-ban"></i>Cancelar pagamento</div>
                            </div>
                        </div>
                    </div>                    
                </TabPanel>

                <TabPanel header="Sacar">

                    <div class="step-one">
                            <div class="section">
                                <money3 class="money-input" v-model="withDrawValue" v-bind="moneyconfig"/>
                                <InputText :disabled="this.loggedUser().region_id == 25 ? false : true" placeholder="Chave pix" v-model="user_pix" />
                            </div>

                            <div class="section">

                                <vue-recaptcha v-show="showRecaptcha" sitekey="6LdNABkpAAAAAMJ4dUAHPRaoQNsd4OyLqvKNyNfJ"
                                    size="normal" 
                                    theme="light"
                                    hl="pt"
                                    :loading-timeout="loadingTimeout"
                                    @verify="recaptchaVerified"
                                    @expire="recaptchaExpired"
                                    @fail="recaptchaFailed"
                                    @error="recaptchaError"
                                    ref="vueRecaptcha"
                                >
                                </vue-recaptcha>

                                <Button label="Enviar solicitação de saque" @click="showRecaptcha = true" icon="pi pi-angle-right" icon-pos="right" :loading="loading"></Button>
                            </div>
                    </div>
                            
                </TabPanel>
            </TabView>
        </div>
    </Dialog>
</template>


<script>
    import Dialog from 'primevue/dialog';
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';
    import TabView from 'primevue/tabview';
    import TabPanel from 'primevue/tabpanel';
    import SelectButton from 'primevue/selectbutton';
    import QrcodeVue from 'qrcode.vue';
	import ConfirmDialog from 'primevue/confirmdialog';
    import vueRecaptcha from 'vue3-recaptcha2';

    export default {

        name: "ModalBetAnimal",

        props: {
            dialog: Boolean,
        },
        
        components: {
           Dialog,
           InputText,
           Button,
           TabPanel,
           TabView,
           SelectButton,
           QrcodeVue,
           ConfirmDialog,
           vueRecaptcha
        },

        created() {
            this.user_pix = this.loggedUser().region_id == 25 ? '' : this.loggedUser().cpf 
        },

        data() {
            return {
                showRecaptcha: false,
		        loadingTimeout: 30000, // 30 seconds

                qrCode: '',
                copiaCola: '',
                oldDepositEnabled: false,
                payment_id: null,
                paymentCreated: '',
                loadingCode: '',
                error: '',
                maxDeposit: 2000,
                minDeposit: 2,
                
                show: false,
                loading: false,

                pix_code: '',
                user_pix: '',
                file: '',

                depositValue: 10,

                withDrawOptions: [10, 50, 100],
                withDrawValue: 10,

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
        
        watch: {

            dialog: function (val) {
                this.show = val;
            },

        },

        methods: {
            recaptchaVerified(response) {
                this.submitWithdraw(response)
                this.showRecaptcha = false
                this.$refs.vueRecaptcha.reset();
            },

            recaptchaExpired() {
                this.$refs.vueRecaptcha.reset();
            },

            recaptchaFailed() {
                this.showRecaptcha = false
                this.$refs.vueRecaptcha.reset();
            },

            recaptchaError(reason) {
                console.log(reason)
                this.showRecaptcha = false
                this.$refs.vueRecaptcha.reset();
            },

            async copiar(){
                let success = false;
                try{
                    await navigator.clipboard.writeText(this.copiaCola)
                    success = true
                } catch (err) {
                    var textArea = document.createElement("textarea");
                    textArea.value = this.copiaCola;
                    document.body.appendChild(textArea);
                    textArea.select();
                    success = document.execCommand("Copy");
                    textArea.remove();
                }
                
                if (success) {
                    alert('Copiado')
                } else {
                    alert('Não foi possivel copiar.')
                }
            },
            back(){
                this.paymentCreated = false
                this.payment_id = null
                this.qrCode = ''
                this.copiaCola = ''
            },
            getPixQR(){
                if (!this.maxDeposit || !this.minDeposit) return;
                if (this.value > this.maxDeposit) {
                    this.error = 'Valor Acima do Permitido.'
                    return
                }

                if (this.value < this.minDeposit) {
                    this.error = 'Valor Abaixo do Permitido.'
                    return
                }

                this.loadingCode = true
                this.$api.get('/get-pix-qr',{params:{value:this.depositValue}, headers: { Authorization: this.accessToken() }})
                    .then((response)=>{
                        this.loadingCode = false
                        this.paymentCreated = true
                        this.payment_id = response.data.id
                        this.qrCode = response.data.qr_code_image ?? 'data:image/png;base64, ' + response.data.qr_code_base64
                        this.copiaCola = response.data.qr_code

                        setTimeout(()=>{
                            document.getElementById('deposit-value').scrollIntoView({behavior: "smooth"})
                        },300)

                    }).catch((err)=>{
                        this.error = 'Não foi possível gerar seu código PIX, tente novamente mais tarde'
                        if (err.response.data && err.response.data.error) this.error = err.response.data.error;
                        this.loadingCode = false
                        this.paymentCreated = false
                        this.payment_id = null
                    })
            },
            cancelPixQR() {
                this.$confirm.require({
                    message: 'Deseja cancelar o pagamento?',
                    header: 'Confirmar',
                    icon: 'pi pi-exclamation-triangle',

                    accept: () => {
                        this.loading = true
                
                        this.$api.delete(`/solicitations/cancelPixQR/${this.payment_id}`, {
                            headers: {
                                'Authorization': this.accessToken(),
                            }
                        })
                        .then(() => {
                            this.loading = false
                            this.$toast.add({severity:'success', summary: 'Sucesso', detail:'Pagamento cancelado com sucesso!', life: 3000});
                            this.back()
                        })
                        .catch((err) => {
                            this.loading = false
                            this.$toast.add({severity:'error', summary: 'Erro', detail: err.response.data, life: 15000});
                        });
                    },
                    reject: () => {
                       return
                    }
                })

            },

            async submitWithdraw(recaptchaToken = null) {

                this.loading = true;
                
                try {

                    if (!recaptchaToken) {
                        this.$toast.add({severity:'error', summary: 'Erro.', detail: 'Erro ao validar captcha.', life: 15000}); 
                    }

                    // Verifica se o valor de saque é maior que o saldo disponível
                    if (parseFloat(this.withDrawValue) > this.$store.getters.getBalance) {
                        this.loading = false;
                        this.$toast.add({severity:'error', summary: 'Saldo insuficiente.', detail: 'Saldo insuficiente.', life: 15000});
                        return;
                    }

                    const requestData = {
                        pix_key: this.user_pix,
                        value: this.withDrawValue,
                        recaptcha: recaptchaToken
                    };

                    await this.$api.post('/solicitations/withdraw', requestData, {
                        headers: {
                            Authorization: this.accessToken()
                        },
                    });

                    this.loading = false;
                    this.$toast.add({severity:'success', summary: 'Sucesso', detail:'Solicitação concluída com sucesso!', life: 3000});
                    this.show = false;
                    
                } catch (err) {
                    this.loading = false;
                    this.$toast.add({severity:'error', summary: 'Erro', detail: err.response.data, life: 15000});
                }
               
            },


            submitDeposit() {
                this.loading = true
                
                this.$api.post('/solicitations/deposit', {attachment: this.file, value: this.depositValue}, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': this.accessToken(),
                    }
			    })
                .then(() => {
                    this.loading = false
                    this.$toast.add({severity:'success', summary: 'Sucesso', detail:'Solicitação concluida com sucesso!', life: 3000});
                    this.show = false;
                })
                .catch((err) => {
                    this.loading = false
                    this.$toast.add({severity:'error', summary: 'Erro', detail: err.response.data, life: 15000});
                });
            },

            handleFileUpload(event) {
                this.file = event.target.files[0];
            },

            copyText() {
                var textArea = document.createElement("textarea");
                textArea.value = this.pix_code;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("Copy");
                textArea.remove();

                alert('copiado!')
            },

            pageTwo() {
                const Pix = require("../../plugins/Pix");
                const pix = new Pix(
                    "fulano@gmail.com",
                    "DEPOSITO",
                    "Celsinho",
                    "SANTOS",
                    "***",
                    parseFloat(this.depositValue)
                );

                this.pix_code = pix.getPayload();

                document.querySelector(".step-one").style.display = 'none';
                document.querySelector(".step-two").style.display = 'flex';
            },
            
            pageThree() {
                document.querySelector(".step-two").style.display = 'none';
                document.querySelector(".step-three").style.display = 'flex';
            },

            async handleDeposit() {
                
            }
        }

    }
</script>

<style lang="scss" scoped>
.money-input {
    background: var(--bg-secondary);
    width: 100%;
    height: 40px;
    border: solid #3f4b5b 1px;
    border-radius: 3px;
    color: #e2e3e4;
    padding: 0px 15px;
    font-size: 16px;
}
.wallet-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 600px;
}
.title {
    margin-bottom: 10px;
}

.wallet-header > .subtitle {
    color: #cdcdcd;
    font-size: 18px;
}

.step-one {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
}

.step-two {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
}

.qrcode-container {
    padding: 10px;
    border: solid #2a323d 1px;
    border-radius: 7px;
}

span {
    font-size: 14px;
}
.btn-copy {
    width: 100%;
    padding: 10px;
    border-radius: 7px;
    border: none;
    background: var(--app-primary-color);
    color: white;
    cursor: pointer;
    display: flex;
    gap: 5px;
}

.qrcode {
    background: white;
    padding: 10px;
    width: fit-content;
    border-radius: 7px;
}

.step-three {
    display: none;
    flex-direction: column;
}

.btn-submit { 
    margin-top: 50px;
}


@media screen and (max-width: 800px) {
    .wallet-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
    }
}

</style>


<style lang="scss" scoped>
.qrcode-container{
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.qrcode{
    border: 1px solid black;
    border-radius: 15px;
    overflow: hidden;
}

.value-container{
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
}

.value-container .p-button{
    display: flex;
    justify-content: center;
    width: 200px;
    gap: 20px;
    justify-self: flex-end;
    margin-top: 60px;
    margin-bottom: 15px;
}

.value-container .p-button[disabled=true] {
    filter: contrast(0.5);
    cursor: not-allowed;
}

.value-container p{
    margin: 20px 0;
}

.value-container .error{
    color: #ed5f6c;
}

.pix-value{
    border: 0;
    border-bottom: 1px solid green;
    font-size: 35px;
    width: 200px;
    text-align: center;
    outline: none;
}

.info{
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    gap: 25px;
}

.code-valid {
    font-weight: bold;
    color: #ed5f6c;
    margin-top: 10px;
}

.back{
    margin: 20px 0;
    margin-right: auto;
    padding: 5px 8px;
}

.back i{
    margin-right: 10px;
}

.copia-cola-container {
    width: 100%;
    margin: 20px 0;
}

.copia-cola {
    display: flex;
    background: #1d232a;
    color: #ddd;
    border-radius: 5px;
    padding: 7px 10px;
    border: 1px solid #ddd;
    cursor: pointer;
    width: 100%;
    line-break: anywhere;
    margin-top: 10px;
    font-size: 14px;
}

.copia-cola:hover{
    border: 1px solid grey;
}

.copia-cola-container .p-button{
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: center;
}

.copia-cola-container .p-button i{
    margin-right: 10px;
}

h3{
    margin-top: 0;
}

.loading{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    margin: 40px 0;
}

.pix-loading{
    fill: dodgerblue;
    width: 100px;
    margin: 20px;
    animation: pixSpin 1500ms infinite linear;
}
@keyframes pixSpin {
    0%{transform: scale(1) rotate(0deg); }
    30%{transform: scale(1.2) rotate(0deg); }
    100%{transform: scale(1) rotate(360deg);}
}
.instructions ol {
    padding-inline-start: 15px;
}

.instructions ol li{
    border: 1px solid #8ac1ea;
    background-color: #1d232a;
    border-radius: 5px;
    padding: 6px;
    margin: 5px 0;
}

.p-inputtext {
    width: 100%;
}

</style>
