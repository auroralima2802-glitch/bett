import { getUnixTime } from "date-fns";
import store from "../store/store"
import moment from "moment";
import QRCode from 'qrcode-generator';


export default {
    methods: {
        showLoginModal() {
            this.$store.dispatch("setLoginModal", {
                loginModal: true,
            });
        },

        hideLoginModal() {
            this.$store.dispatch("setLoginModal", {
                loginModal: false,
            });
        },

        showRegisterModal() {
            this.$store.dispatch("setRegisterModal", {
                registerModal: true,
            });
        },

        hideRegisterModal() {
            this.$store.dispatch("setRegisterModal", {
                registerModal: false,
            });
        },
        
        showWalletModal() {
            this.$store.dispatch("setWalletModal", {
                walletModal: true,
            });
        },

        hideWalletModal() {
            this.$store.dispatch("setWalletModal", {
                walletModal: false,
            });
        },


        // VERIFY IF TOKEN IS EXPIRED
        verifyExpirate() {
            // GET INFO FROM LOCALSTORAGE
            var expire = localStorage.getItem('expire');

            // COMPARE WITH THE ACTUAL UNIX TIME
            if (expire < getUnixTime(new Date)) {
                this.logOut();
                return false;
            } else {
                return true;
            }
        },

        printTable() {
            window.print()
        },

        // DO LOGOUT 
        logOut() {
            // REMOVE EVERYTHING FROM VUEX
            store.dispatch('setLoggout', {
                user: {},
                token: "",
                isLogged: false,
                expire: null
            });

            this.$router.push({
                path: "/login"
            });
        },

        getAward(award) {
            switch (award) {
                case 'primeiro':
                    return [1];
                case 'segundo':
                    return [2];
                case 'terceiro':
                    return [3];
                case 'quarto':
                    return [4];
                case 'quinto':
                    return [5];
                case 'sexto':
                    return [6];
                case 'setimo':
                    return [7];
                case 'oitavo':
                    return [8];
                case 'nono':
                    return [9];
                case 'decimo':
                    return [10];
                case 'primeiro_ao_terceiro':
                    return [1, 2, 3];
                case 'primeiro_ao_quinto':
                    return [1, 2, 3, 4, 5];
                case 'primeiro_ao_setimo':
                    return [1, 2, 3, 4, 5, 6, 7];
                case 'segundo_ao_setimo':
                    return [2, 3, 4, 5, 6, 7];
                case 'sexto_e_setimo':
                    return [6, 7];
                case 'primeiro_e_segundo':
                    return [1, 2];
                case 'segundo_ao_quinto':
                    return [2, 3, 4, 5];
                default:
                    break;
            }
        },

        generatePalpiteTalao (modality) {
            let numeroTalao = this.$store.getters.getTalao

            switch (modality) {
                case 'milhar':
                case 'milhar_invertida':
                case 'milhar_centena':
                case 'milhar_centena_invertida':
                case 'milhar_vai_volta':
                case 'milhar_aproximada':
                case 'milhar_ouro':
				    return ('0000' + numeroTalao).slice(-4)


                case 'centena':
                case 'centena_invertida':
                case 'centena_vai_volta':
                case 'centena_aproximada':
				    return ('0000' + numeroTalao).slice(-3)

                case 'dezena':
                case 'dezena_invertida':
				    return ('0000' + numeroTalao).slice(-2)
					
				case 'grupo':
                case 'grupo_salteado':
                    return ('00' + Math.ceil(numeroTalao.slice(-2)/4).toString()).slice(-2)

				default:
					break;
			}
        },

        generatePalpite(modality) {
            switch (modality) { 
                case 'grupo':
                case 'grupo_salteado':
                    return ("00" + (Math.floor(Math.random() * (25 - 1 + 1)) + 1)).slice(-2)
        
                case 'terno_grupo':
                case 'terno_grupo_repeticao':
                case 'terno_grupo_chaveado':
                    return ("00" + (Math.floor(Math.random() * (25 - 1 + 1)) + 1)).slice(-2) + 
                        '-' + ("00" + (Math.floor(Math.random() * (25 - 1 + 1)) + 1)).slice(-2) + 
                        '-' + ("00" + (Math.floor(Math.random() * (25 - 1 + 1)) + 1)).slice(-2)
        
                case 'duque_grupo':
                case 'duque_grupo_repeticao':
                case 'passe':
                case 'passe_ida':
                case 'passe_ida_volta':
                case 'passe_especial':
                case 'passe_especial_combinado':
                    return ("00" + (Math.floor(Math.random() * (25 - 1 + 1)) + 1)).slice(-2) + 
                        '-' + ("00" + (Math.floor(Math.random() * (25 - 1 + 1)) + 1)).slice(-2)        
                    
                case 'dezena':
                case 'dezena_invertida':
                    return ("00" + Math.floor(99 * Math.random())).slice(-2)

                case 'duque_dezena':
                case 'duque_dezena_repeticao':
                case 'esquerda_meia_direita':
                    return ("00" + Math.floor(99 * Math.random())).slice(-2) +
                        '-' + ("00" + Math.floor(99 * Math.random())).slice(-2)

                case 'terno_dezena':
                case 'terno_dezena_repeticao':
                    return ("00" + Math.floor(99 * Math.random())).slice(-2) +
                        '-' + ("00" + Math.floor(99 * Math.random())).slice(-2) +
                        '-' + ("00" + Math.floor(99 * Math.random())).slice(-2)
                
                case 'centena':
                case 'centena_invertida':
                case 'centena_vai_volta':
                case 'centena_aproximada':
                case 'citdc':
                case 'ciddc':
                    return ("000" + Math.floor(999 * Math.random())).slice(-3)  
                
                case 'milhar':
                case 'milhar_invertida':
                case 'milhar_centena':
                case 'milhar_centena_invertida':
                case 'milhar_vai_volta':
                case 'milhar_aproximada':
                case 'milhar_ouro':
                case 'mcitdc':
                case 'mciddc':
                    return ("0000" + Math.floor(9999 * Math.random())).slice(-4)   
			
				default:
					break;
			}
        },

        formatDate(time) {
            return moment(time).format('DD/MM');
        },

        formatDateWithYear(time) {
            return moment(time).format('DD/MM/YYYY');
        },

        formatDateFull(time) {
            return moment(time).format('DD/MM/YYYY HH:mm');
        },

        formatTime(time) {
            return moment(time).format('HH:mm');
        },

        formatTimeWithSeconds(time) {
            return moment(time).format('HH:mm:ss');
        },

        formatStatus(value) {
            switch (value) {
                case 'open':
                    return 'Aberto';

                case 'canceled':
                    return 'Cancelado';

                case 'returned':
                    return 'Devolvido';

                case 'win':
                    return 'Ganhou';

                case 'lose':
                    return 'Perdeu';

                default:
                    break;
            }
        },
        
        // MONEY FORMAT
        formatCurrency(value) {
            return value.toLocaleString('pt-BR', { minimumFractionDigits: 2});
        },

        // PORCENTAGE FORMAT
        formatPorcentage(value) {
            value = Math.abs(value);
            return value + '%';
        },

        accessToken() {
            let token = store.getters.getToken;
            return `Bearer ${token}`;
        },
        
        // RETURN USER LOGGED
        loggedUser() {
            let user = store.getters.getUser;
            return user;
        },

        hideKeyboard(className) {
            document.querySelectorAll(className).forEach((element) => {
                element.blur();
            }); 
		},

        
		/********* FUNÇÕES AO MUDAR MODALIDADE  *********/

		getModalityRule(modality, award) {
            switch (modality) {
                case 'grupo':
                case 'grupo_par':
                case 'grupo_impar':
                    if(award == '1º ao 7º' || award == '6º e 7º' || award == '6º' || award == '7º'){
                        return { maximoDigitos: 2, numeroMaximo: 25, minimoDigitos: 2, positions: ['Esquerda', 'Direita'], main_awards: ['primeiro', 'primeiro_ao_quinto', 'primeiro_ao_setimo', 'primeiro_ao_oitavo']}
                    } else {
                        return { maximoDigitos: 2, numeroMaximo: 25, minimoDigitos: 2, positions: ['Esquerda', 'Meio', 'Direita'], main_awards: ['primeiro', 'primeiro_ao_quinto', 'primeiro_ao_setimo', 'primeiro_ao_oitavo']}
                    }
    
                case 'duque_grupo':
                case 'duque_grupo_repeticao':
                    return { maximoDigitos: 5, numeroMaximo: 25, minimoDigitos: 5, positions: ['Esquerda', 'Meio', 'Direita'], main_awards: ['primeiro_ao_quinto']};

                case 'duque_grupo_combinado':
                case 'duque_grupo_combinado_repeticao':
                case 'passe':
                    return { maximoDigitos: 99, numeroMaximo: 25, minimoDigitos: 5, positions: ['Esquerda', 'Meio', 'Direita'], main_awards: ['primeiro_ao_quinto']};

                case 'terno_grupo':
                case 'terno_grupo_repeticao':

                    return { maximoDigitos: 8, numeroMaximo: 25, minimoDigitos: 8, positions: ['Esquerda', 'Meio', 'Direita'], main_awards: ['primeiro_ao_quinto', 'primeiro_ao_terceiro']};

                case 'terno_grupo_combinado':
                case 'terno_grupo_combinado_repeticao':
                case 'terno_grupo_chaveado':
                    return { maximoDigitos: 99, numeroMaximo: 25, minimoDigitos: 8, positions: ['Esquerda', 'Meio', 'Direita'], main_awards: ['primeiro_ao_quinto', 'primeiro_ao_terceiro']};

                case 'dezena':
                case 'dezena_invertida':
                    if(award == '1º ao 7º' || award == '6º e 7º' || award == '6º' || award == '7º'){
                        return { maximoDigitos: 2, numeroMaximo: 99, minimoDigitos: 2, positions: ['Esquerda', 'Direita'], main_awards: ['primeiro', 'primeiro_ao_quinto', 'primeiro_ao_setimo', 'segundo_ao_quinto', 'sexto_e_setimo']}
                    } else {
                        return { maximoDigitos: 2, numeroMaximo: 99, minimoDigitos: 2, positions: ['Esquerda', 'Meio', 'Direita'], main_awards: ['primeiro', 'primeiro_ao_quinto', 'primeiro_ao_setimo', 'segundo_ao_quinto', 'sexto_e_setimo']};
                    }

                case 'duque_dezena':
                case 'duque_dezena_repeticao':
                    return { maximoDigitos: 5, numeroMaximo: 99, minimoDigitos: 5, positions: ['Esquerda', 'Meio', 'Direita'], main_awards: ['primeiro_ao_quinto'] };
                
                case 'duque_dezena_combinado':
                case 'duque_dezena_combinado_repeticao':
                    return { maximoDigitos: 99, numeroMaximo: 99, minimoDigitos: 5, positions: ['Esquerda', 'Meio', 'Direita'], main_awards: ['primeiro_ao_quinto'] };

                case 'terno_dezena':
                case 'terno_dezena_repeticao':
                    return { maximoDigitos: 8, numeroMaximo: 99, minimoDigitos: 8, positions: ['Esquerda', 'Meio', 'Direita'], main_awards: ['primeiro_ao_quinto'] };

                case 'terno_dezena_combinado':
                case 'terno_dezena_combinado_repeticao':
                    return { maximoDigitos: 99, numeroMaximo: 99, minimoDigitos: 8, positions: ['Esquerda', 'Meio', 'Direita'], main_awards: ['primeiro_ao_quinto'] };

                case 'centena':
                case 'centena_vai_volta':
                case 'centena_aproximada':
                    if(award == '1º ao 7º' || award == '6º e 7º' || award == '6º' || award == '7º'){
                        return { maximoDigitos: 3, numeroMaximo: 999, minimoDigitos: 3, positions: ['Direita'], main_awards: ['primeiro', 'primeiro_ao_quinto', 'primeiro_ao_setimo', 'segundo_ao_quinto', 'sexto_e_setimo'] };
                    } else {
                        return { maximoDigitos: 3, numeroMaximo: 999, minimoDigitos: 3, positions: ['Esquerda', 'Direita'], main_awards: ['primeiro', 'primeiro_ao_quinto', 'primeiro_ao_setimo', 'segundo_ao_quinto', 'sexto_e_setimo'] };
                    }

                case 'centena_invertida':
                case 'citdc':
                case 'ciddc':
                    if(award == '1º ao 7º' || award == '6º e 7º' || award == '6º' || award == '7º'){
                        return { maximoDigitos: 8, numeroMaximo: 999, minimoDigitos: 3, positions: ['Direita'], main_awards: ['primeiro', 'primeiro_ao_quinto', 'primeiro_ao_setimo', 'segundo_ao_quinto', 'sexto_e_setimo'] };
                    } else {
                        return { maximoDigitos: 8, numeroMaximo: 999, minimoDigitos: 3, positions: ['Esquerda', 'Direita'], main_awards: ['primeiro', 'primeiro_ao_quinto', 'primeiro_ao_setimo', 'segundo_ao_quinto', 'sexto_e_setimo'] };
                    }

                case 'milhar':
                case 'milhar_ouro':
                case 'milhar_vai_volta':
                case 'milhar_aproximada':
                    return { maximoDigitos: 4, numeroMaximo: 9999, minimoDigitos: 4, positions: ['Direita'], main_awards: ['primeiro', 'primeiro_ao_quinto', 'segundo_ao_quinto'] };

                case 'milhar_centena':
                case 'milhar_centena_invertida':
                    return { maximoDigitos: 4, numeroMaximo: 9999, minimoDigitos: 4, positions: ['Direita'], main_awards: ['primeiro', 'primeiro_ao_quinto', 'primeiro_ao_setimo', 'segundo_ao_quinto'] };

                case 'milhar_invertida':
                case 'mcitdc':
                case 'mciddc':
                    return { maximoDigitos: 7, numeroMaximo: 9999, minimoDigitos: 4, positions: ['Direita'], main_awards: ['primeiro', 'primeiro_ao_quinto', 'segundo_ao_quinto'] };
                
                case 'esquerda_meia_direita':
                    return { maximoDigitos: 99, minimoDigitos: 5, positions: ['Direita'], main_awards: ['primeiro_ao_quinto'] };
                case 'passe_ida':
                case 'passe_ida_volta':
                    return { maximoDigitos: 5, numeroMaximo: 25, minimoDigitos: 5, positions: ['Esquerda', 'Meio', 'Direita'], main_awards: ['primeiro_ao_quinto'] };

                case 'passe_especial':
                    return { maximoDigitos: 5, minimoDigitos: 5, positions: ['Esquerda', 'Meio', 'Direita'], main_awards: ['primeiro_ao_quinto'] };

                case 'passe_especial_combinado':
                    return { maximoDigitos: 5, minimoDigitos: 5, positions: ['Esquerda', 'Meio', 'Direita'], main_awards: ['primeiro_ao_quinto'] };
            
                default:
                    return { maximoDigitos: 0, minimoDigitos: 0};

           }
        },

        animalList() {
            return [
                {
                    name: "Avestruz",
                    icon: "ostrich",
                    banner: "avestruz",
                    dezenas: ['01', '02', '03', '04'],
                    grupo: "01"
                },
                {
                    name: "Aguia",
                    icon: "eagle",
                    banner: "aguia",
                    dezenas: ['05', '06', '07', '08'],
                    grupo: "02"
                },
                {
                    name: "Burro",
                    icon: "donkey",
                    banner: "burro",
                    dezenas: ['09', '10', '11', '12'],
                    grupo: "03"
                },
                {
                    name: "Borboleta",
                    banner: "borboleta",
                    icon: "butterfly",
                    dezenas: ['13', '14', '15', '16'],
                    grupo: "04"
                },
                {
                    name: "Cachorro",
                    banner: "cachorro",
                    icon: "dog",
                    dezenas: ['17', '18', '19', '20'],
                    grupo: "05"
                },
                {
                    name: "Cabra",
                    banner: "cabra",
                    icon: "goat",
                    dezenas: ['21', '22', '23', '24'],
                    grupo: "06"
                },
                {
                    name: "Carneiro",
                    banner: "carneiro",
                    icon: "ram",
                    dezenas: ['25', '26', '27', '28'],
                    grupo: "07"
                },
                {
                    name: "Camelo",
                    banner: "camelo",
                    icon: "camel",
                    dezenas: ['29', '30', '31', '32'],
                    grupo: "08"
                },
                {
                    name: "Cobra",
                    banner: "cobra",
                    icon: "cobra",
                    dezenas: ['33', '34', '35', '36'],
                    grupo: "09"
                },
                {
                    name: "Coelho",
                    banner: "coelho",
                    icon: "rabbit",
                    dezenas: ['37', '38', '39', '40'],
                    grupo: "10"
                },
                {
                    name: "Cavalo",
                    banner: "cavalo",
                    icon: "horse",
                    dezenas: ['41', '42', '43', '44'],
                    grupo: "11"
                },
                {
                    name: "Elefante",
                    icon: "elephant",
                    banner: "elefante",
                    dezenas: ['45', '46', '47', '48'],
                    grupo: "12"
                },
                {
                    name: "Galo",
                    icon: "galo",
                    banner: "galo",
                    dezenas: ['49', '50', '51', '52'],
                    grupo: "13"
                },
                {
                    name: "Gato",
                    icon: "cat",
                    banner: "gato",
                    dezenas: ['53', '54', '55', '56'],
                    grupo: "14"
                },
                {
                    name: "Jacare",
                    icon: "crocodile",
                    banner: "jacare",
                    dezenas: ['57', '58', '59', '60'],
                    grupo: "15"
                },
                {
                    name: "Leao",
                    icon: "lion",
                    banner: "leao",
                    dezenas: ['61', '62', '63', '64'],
                    grupo: "16"
                },
                {
                    name: "Macaco",
                    icon: "monkey",
                    banner: "macaco",
                    dezenas: ['65', '66', '67', '68'],
                    grupo: "17"
                },
                {
                    name: "Porco",
                    icon: "pig",
                    banner:"porco",
                    dezenas: ['69', '70', '71', '72'],
                    grupo: "18"
                },
                {
                    name: "Pavao",
                    icon: "peacock",
                    banner: "pavao",
                    dezenas: ['73', '74', '75', '76'],
                    grupo: "19"
                },
                {
                    name: "Peru",
                    icon: "turkey",
                    banner: "peru",
                    dezenas: ['77', '78', '79', '80'],
                    grupo: "20"
                },
                {
                    name: "Touro",
                    icon: "bull",
                    banner: "touro",
                    dezenas: ['81', '82', '83', '84'],
                    grupo: "21"
                },
                {
                    name: "Tigre",
                    icon: "tiger",
                    banner: "tigre",
                    dezenas: ['85', '86', '87', '88'],
                    grupo: "22"
                },
                {
                    name: "Urso",
                    icon: "bear",
                    banner: "urso",
                    dezenas: ['89', '90', '91', '92'],
                    grupo: "23"
                },
                {
                    name: "Veado",
                    icon: "deer",
                    banner: "veado",
                    dezenas: ['93', '94', '95', '96'],
                    grupo: "24"
                },
                {
                    name: "Vaca",
                    icon: "cow",
                    banner: "vaca",
                    dezenas: ['97', '98', '99', '00'],
                    grupo: "25"
                }
            ]
        },

        getAnimal(grupo) {
            const animals = this.animalList()
            const animal = animals.find(animal => animal.grupo == grupo);
            
            return animal
        },
        
        getPositionName(positions) {
            let aux = []

            positions.forEach(position => {
                switch (position) {
                    case 'Esquerda':
                        aux.push('E')
                        break;

                    case 'Meio':
                        aux.push('M')
                        break;

                    case 'Direita':
                        aux.push('D')
                        break;
                }
            });

            return aux
        },

        loadBalance() {
            if(!this.$store.getters.getLogged || this.$store.getters.getLogged.online == 0) {
                return
            }

            this.$api.get('/users/balance', {
                headers: {
                    Authorization: this.accessToken()
                }
            })
            .then((response) => {
                this.$store.dispatch("setBalance", {
                    balance: response.data.saldo,
                });

                this.$store.dispatch("setBonusBalance", {
                    bonusBalance: response.data.saldo_bonus,
                });
            })
            .catch((err) => {
                console.log(err)
            })
        },

        loadRegionConfig(region_id) {
            this.$api.get('/regions/regionConfig', {
                headers: {
                    Authorization: this.accessToken()
                },
                params: {
                    id: region_id
                }
            })
            .then((response) => {
                this.$store.dispatch("setRegionConfig", {
                    regionConfig: response.data,
                });
                this.$store.dispatch("setProducts", {
                    products: JSON.parse(response.data.products),
                });
            })
        },

        refreshTalao() {
            this.$api.get('/users/talao', {
                headers: {
                    Authorization: this.accessToken()
                },
            })
            .then((response) => {
                this.$store.dispatch("setTalao", {
                    talao: response.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
        },

        // verifica se palpite é combinado
        isCombined(game) {
            let combined = false;
            let numbers = JSON.parse(game.selected_numbers)

            if(['Duque de Dezena', 'DD c/ repetição', 'Duque de Grupo', 'DG c/ repetição', 'Passe'].includes(game.modality_name)) {  
                for (let i = 0; i < numbers.length; i++) {
                    if (numbers[i].length > 5) {
                        combined = true
                        break
                    }
                }
            }

            if(['Terno de Dezena', 'TDZ c/ repetição', 'Terno de grupo', 'Terno de Grupo chaveado', 'TG c/ repetição'].includes(game.modality_name)) {
                for (let i = 0; i < numbers.length; i++) {
                    if (numbers[i].length > 8) {
                        combined = true
                        break
                    }
                }
            }

            return combined ? ' Combinado' : ''
        },

        /* CANVAS */
        wrapText(ctx, phrase, maxPxLength, textStyle) {
            var wa=phrase.split(" "),
                phraseArray=[],
                lastPhrase=wa[0],
                measure=0,
                splitChar=" ";
            if (wa.length <= 1) {
                return wa
            }
            ctx.font = textStyle;
            for (var i=1;i<wa.length;i++) {
                var w=wa[i];
                measure=ctx.measureText(lastPhrase+splitChar+w).width;
                if (measure<maxPxLength) {
                    lastPhrase+=(splitChar+w);
                } else {
                    phraseArray.push(lastPhrase);
                    lastPhrase=w;
                }
                if (i===wa.length-1) {
                    phraseArray.push(lastPhrase);
                    break;
                }
            }
            return phraseArray;
        },

        drawTitle(title, ctx, x, y, sumFontSize = 0) {
            let paperSize = this.$store.getters.getPaperSize
            let fontSize = this.$store.getters.getFontSize + sumFontSize
            let wrappedText = this.wrapText(ctx, title, paperSize == '80MM' ? 576 : 376, fontSize + 'px Arial');

            wrappedText.forEach(function(text) {
                ctx.font = 'bold ' + (fontSize + 2) + 'px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(text, x, y);
                y+=15
            })
            return y
        },


        drawCenterText(text, ctx, x, y, sumFontSize = 0) {
            let paperSize = this.$store.getters.getPaperSize
            let fontSize = this.$store.getters.getFontSize + sumFontSize
            let wrappedText = this.wrapText(ctx, text, paperSize == '80MM' ? 576 : 376, fontSize + 'px Arial');

            wrappedText.forEach(function(text) {
                ctx.font = (fontSize + 2) + 'px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(text, x, y);
                y+=15
            })
            return y
        },

        drawRightText(text, ctx, x, y, sumFontSize = 0) {
            let paperSize = this.$store.getters.getPaperSize
            let fontSize = this.$store.getters.getFontSize + sumFontSize
            y-=fontSize

            let wrappedText = this.wrapText(ctx, text, paperSize == '80MM' ? 576 : 376, fontSize + 'px Arial');

            wrappedText.forEach(function(text) {
                ctx.font = fontSize + 'px Arial';
                ctx.textAlign = 'right';
                ctx.fillText(text, x, y);
                y+=fontSize
            })

            return  y
        },

        drawText(text, ctx, x, y, sumFontSize = 0) {
            let paperSize = this.$store.getters.getPaperSize
            let fontSize = this.$store.getters.getFontSize + sumFontSize

            let wrappedText = this.wrapText(ctx, text, paperSize == '80MM' ? 576 : 376, fontSize + 'px Arial');

            wrappedText.forEach(function(text) {
                ctx.font = fontSize + 'px Arial';
                ctx.textAlign = 'left';
                ctx.fillText(text, x, y);
                y+=fontSize
            })

            return  y
        },

        drawBoldText(text, ctx, x, y, sumFontSize = 0) {
            let paperSize = this.$store.getters.getPaperSize
            let fontSize = this.$store.getters.getFontSize + sumFontSize

            let wrappedText = this.wrapText(ctx, text, paperSize == '80MM' ? 576 : 376, 'bold ' + fontSize + 'px Arial');

            wrappedText.forEach(function(text) {
                ctx.font = 'bold ' + fontSize + 'px Arial';
                ctx.textAlign = 'left';
                ctx.fillText(text, x, y);
                y+=fontSize
            })

            return  y
        },

        drawLine(ctx, x, y) {
            let fontSize = this.$store.getters.getFontSize
            ctx.font = 'bold 18px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('-----------------------------------------------------------------------------------------------------', x, y);
            return y + fontSize
        },

        drawQrCode(text, ctx, x, y) {
            const qr = QRCode(0, 'H');
            qr.addData(text);
            qr.make();

            const qrSize = qr.getModuleCount();
            const qrDimension = 250;
            const moduleSize = qrDimension / qrSize;

            x = this.$store.getters.getPaperSize == '58MM' ? 62.5 : 163

            for (let row = 0; row < qrSize; row++) {
                for (let col = 0; col < qrSize; col++) {
                  if (qr.isDark(row, col)) {
                    ctx.fillStyle = "black";
                    ctx.fillRect(x + col * moduleSize, y + row * moduleSize, moduleSize, moduleSize);
                  }
                }
            }

            return y + 250
        },

        resizeCanvas(canvas, ctx, w, h){
            var temp_cnvs = document.createElement('canvas');
            var temp_cntx = temp_cnvs.getContext('2d');
            h+=30

            temp_cnvs.width = w; 
            temp_cnvs.height = h;
            temp_cntx.fillStyle = 'white';  // the original canvas's background color
            temp_cntx.fillRect(0, 0, w, h);
            temp_cntx.drawImage(canvas, 0, 0);

            canvas.width = w; 
            canvas.height = h;
            ctx.drawImage(temp_cnvs, 0, 0);
        },

        divideCanvas(canvas, height) {
            const canvasHeight = canvas.height;
            //const maxHeight = height;
            const maxHeight = this.findBlankSpace(canvas, canvas.getContext('2d'), height);
            //document.body.prepend(maxHeight)
            
            const numParts = Math.floor(canvasHeight / maxHeight) + (canvasHeight % maxHeight > 0 ? 1 : 0);
            // Divide a altura do canvas pelo máximo permitido e adiciona 1 se houver um resto
            
            let canvasArray = []
            for (let i = 0; i < numParts; i++) {
                const newCanvas = document.createElement('canvas');
                newCanvas.width = canvas.width;
                newCanvas.height = i === numParts - 1 ? canvasHeight % maxHeight : maxHeight;
                const newCtx = newCanvas.getContext('2d');
                
                newCtx.drawImage(canvas, 0, i * maxHeight, canvas.width, newCanvas.height, 0, 0, canvas.width, newCanvas.height);
                canvasArray.push(newCanvas)
            }

            return canvasArray
        },

        findBlankSpace(canvas,ctx,height,startHeight = 'vazio'){
            /*
                Para usar:
                this.findBlankSpace(canvas,canvas.getContext('2d'),1400);

                Irá retornar a altura exata onde há uma linha vazia
            */ 

            if (startHeight == 'vazio') {
                startHeight = height
            }

            let imageData = ctx.getImageData(0, height, canvas.width, 1);
            let pixels = imageData.data
            let empty = true;

            for (let i = 0; i < pixels.length; i += 4) {
                // console.log(pixels[i],pixels[i+1],pixels[i+2],pixels[i+3]);
                
                if (pixels[i] != 255 || pixels[i+1] != 255 || pixels[i+2] != 255){
                    empty = false
                }
            }

            if (empty) {
                //console.log('Is Empty');
                //document.body.prepend('Is Empty: '+ height)
                return height
            } else{
                if (height > 0 && startHeight - height < 700) {
                    // return startHeight
                    return this.findBlankSpace(canvas, ctx, height-1,startHeight)
                } else {
                    //document.body.prepend('Not Empty: ')
                    return startHeight
                }
            }
        },

        saveCanvas(base64string) {
            let paperSize = this.$store.getters.getPaperSize

            this.$api.post('/images', {base64: base64string, papersize: paperSize}, {
				headers: {
					Authorization: this.accessToken()
				},
			})
			.then((response) => {
                return response
            })
            .catch((err) => {
                console.log(err)
				return false
            });
        },

        isQuoted(itemInitials, searchInitials, itemNumber, palpite) {
            if (searchInitials === 'milhar_centena') {
                if (itemInitials === 'milhar' && itemNumber === palpite) {
                    return true;
                }
                if (itemInitials === 'centena' && palpite.slice(-3) === itemNumber) {
                    return true;
                }
                return false;
            }
            
            return itemInitials === searchInitials && itemNumber === palpite;
        },

        isMobile() {
            return window.innerWidth <= 760;
        }
        
    },
}