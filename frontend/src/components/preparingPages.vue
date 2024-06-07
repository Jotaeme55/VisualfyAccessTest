<template>
    <Toast />
    <!-- tercerpunto -->
    <section class="tercerpunto">
        <div class="tercerpunto-main">
            <div class="tercerpunto-main-cabecera">
                <div class="tercerpunto-main-cabecera-bloquenumero">
                    <p style="font-size: 8em; color: #1D3557;">
                        3
                    </p>
                </div>
                <div class="tercerpunto-main-cabecera-bloquetexto">
                    <p class="style-tercerpunto-main-cabecera-bloquetexto" style="font-size: 3em; color: white; padding-left: 10px; padding-bottom: 5px;">
                        Generando estilos
                    </p>
                </div>
            </div>
            <div class="tercerpunto-main-cabecera-cuerpo">
                <div class="tercerpunto-main-cabecera-cuerpo-columna1">
                    <div class="tercerpunto-main-cabecera-cuerpo-columna1-texto">
                        <p class="text-fake none-responsive" style="font-size: 1.25em;color: #1D3557;padding-left: 15px;">
                            Último paso.
                            Vamos a darle flow.
                            Tocan los estilos, selecciona la tipografía, el
                            espaciado, los colores y el tamaño en puntos de tu
                            fuente.
                        </p>
                    </div>
                    <div class="tercerpunto-main-cabecera-cuerpo-columna1-video4">
                        <video class="vid4" controls>
                            <source src="images/3_GENERANDO ESTILOS.mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div class="tercerpunto-main-cabecera-cuerpo-columna2">
                    <div class = tercerpunto-main-cabecera-cuerpo-columna2-main>
                        <div class="tercerpunto-main-cabecera-cuerpo-columna2-main-menu">
                            <div v-bind:class="{'field-selected': tituloSelected }" class="tercerpunto-main-cabecera-cuerpo-columna2-main-punto" @click="selectField(`titulo`)">
                                <p v-bind:class="{'field-selected-text': tituloSelected }" class="texto-menu" style="font-size: larger;">Título</p>
                            </div>
                            <div v-bind:class="{'field-selected': capituloSelected }" class="tercerpunto-main-cabecera-cuerpo-columna2-main-punto" @click="selectField(`capitulo`)">
                                <p v-bind:class="{'field-selected-text': capituloSelected }" class="texto-menu" style="font-size: larger;">Capítulo</p>
                            </div>
                            <div v-bind:class="{'field-selected':seccionSelected }" class="tercerpunto-main-cabecera-cuerpo-columna2-main-punto" @click="selectField(`seccion`)">
                                <p v-bind:class="{'field-selected-text': seccionSelected }" class="texto-menu" style="font-size: larger;">Secciones</p>
                            </div>
                            <div v-bind:class="{'field-selected': textoSelected }" class="tercerpunto-main-cabecera-cuerpo-columna2-main-punto" @click="selectField(`texto`)">
                                <p v-bind:class="{'field-selected-text': textoSelected }" class="texto-menu" style="font-size: larger;">Texto</p>
                            </div>
                            <div v-bind:class="{'field-selected': piesSelected }" class="tercerpunto-main-cabecera-cuerpo-columna2-main-punto" @click="selectField(`pies`)">
                                <p v-bind:class="{'field-selected-text': piesSelected }" class="texto-menu" style="font-size: larger;">Pies</p>
                            </div>
                        </div>
                        <div class="tercerpunto-main-cabecera-cuerpo-columna2-main-cuerpo">
                            <div class="main-settings">
                                <div class="tercerpunto-main-cabecera-cuerpo-columna2-main-cuerpo-settings">
                                    <div class="tercerpunto-main-cabecera-cuerpo-columna2-main-cuerpo-settings-punto" >
                                        <Dropdown @change="onTipographyChange()" v-model="selectedTipography" :options="tipographies" placeholder="tipografía">
                                            <template #value="slotProps">
                                                <div v-if="slotProps.value">
                                                    <span :style="'overflow-x:hidden;font-family:'+slotProps.value"> {{slotProps.value}} </span>
                                                </div>
                                                <span v-else>
                                                    {{slotProps.placeholder}}
                                                </span>
                                            </template>
                                            <template #option="slotProps">
                                            <div class="flex align-items-center">
                                                <span :style="'overflow-x:hidden;font-family:'+slotProps.option"> {{ slotProps.option }}</span> 
                                            </div>
                                            </template>
                                        </Dropdown>
                                    </div>
                                    <div class="tercerpunto-main-cabecera-cuerpo-columna2-main-cuerpo-settings-punto">
                                        <div class="negrita especiales" style="margin-right: 10%;" @click="onBoldChange()">
                                            <p class="especial" v-bind:class="{'especiales-selected': boldSelected }" style="font-size: x-large;">
                                                <b>
                                                    B
                                                </b>  
                                            </p>
                                        </div>
                                        <div @click="onUnderlineChange()" class="subrayado especiales">
                                            <p class="especial" v-bind:class="{'especiales-selected': underlinedSelected }" style="text-decoration: underline;font-size: x-large;">
                                                N
                                            </p>
                                        </div>
                                        <div @click="onItalicChange()" class="cursiva especiales" style="margin-left: 10%;">
                                            <p class="especial" v-bind:class="{'especiales-selected': italicSelected }" style="font-size: x-large;">
                                                <em>
                                                    N
                                                </em>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="tercerpunto-main-cabecera-cuerpo-columna2-main-cuerpo-settings-punto">
                                        <Dropdown @change="onSizeChange()"  v-model="selectTamaño" :options="tamaños"  placeholder="tamaños">
                                            <template #value="slotProps">
                                                <div v-if="slotProps.value">
                                                    A+ {{slotProps.value}} pt
                                                </div>
                                                <span v-else>
                                                    {{slotProps.placeholder}}
                                                </span>
                                            </template>
                                        </Dropdown>
                                    </div>
                                    <div class="tercerpunto-main-cabecera-cuerpo-columna2-main-cuerpo-settings-punto">
                                        <Dropdown @change="onJustificationChange()" v-model="selectJustification" :options="justificado" placeholder="justificado">
                                            <template #value="slotProps">
                                                <div class="p-dropdown-car-value" v-if="slotProps.value">
                                                    <i :class="('pi pi-align-'+slotProps.value)"></i>
                                                </div>
                                                <span v-else>
                                                    {{slotProps.placeholder}}
                                                </span>
                                            </template>
                                        </Dropdown>
                                    </div>
                                    <div class="tercerpunto-main-cabecera-cuerpo-columna2-main-cuerpo-settings-punto">
                                        <ColorPicker v-model="color" @change="onColorChange" />
                                    </div>
                                </div>
                            </div>

                            <div class="bloque-contenido-cuerpo">
                                <div class="lista-titulos">
                                    <ul class="titulos">
                                        <li @click="selectField(`titulo`)" class="text-fake" style="color:#1d3557;font-size: 150%; cursor: pointer;">Título</li>
                                        <li @click="selectField(`capitulo`)" class="text-fake" style="color:#1d3557;font-size: 150%; cursor: pointer;;">Capítulo</li>
                                        <li @click="selectField(`seccion`)" class="text-fake" style="color:#1d3557;font-size: 150%; cursor: pointer;;">Secciones</li>
                                        <li @click="selectField(`texto`)" class="text-fake" style="color:#1d3557;font-size: 150%; cursor: pointer;;">Texto</li>
                                        <li @click="selectField(`pies`)" class="text-fake" style="color:#1d3557;font-size: 150%; cursor: pointer;;">Pies</li>
                                    </ul>
                                </div>
                               
                                    <ul @click="dialogEjemplo=true" class="lista-Elements" v-tooltip.top="'Pincha para ver los tamaños'">
                                        <li class="text-fake" 
                                        :style="{'font-style':tituloSettings.italic ? 'italic' : 'normal','text-decoration':tituloSettings.underlined ? 'underline' : 'none','font-weight':tituloSettings.bold ? 'bold' : 'normal','font-family':tituloSettings.tipography,'color':'#'+tituloSettings.color,'font-size': '150%','background-color': '#ceeaeb','width':'90%','textAlign':tituloSettings.justificado}">Un ejemplo de título</li>
                                        <li class="text-fake" 
                                        :style="{'font-style':capituloSettings.italic ? 'italic' : 'normal','text-decoration':capituloSettings.underlined ? 'underline' : 'none','font-weight':capituloSettings.bold ? 'bold' : 'normal','font-family':capituloSettings.tipography,'color':'#'+capituloSettings.color,'font-size':' 150%','background-color': '#e9f5f6','width':'90%','textAlign':capituloSettings.justificado}">Un ejemplo de capítulo</li>
                                        <li class="text-fake" 
                                        :style="{'font-style':seccionSettings.italic ? 'italic' : 'normal','text-decoration':seccionSettings.underlined ? 'underline' : 'none','font-weight':seccionSettings.bold ? 'bold' : 'normal','font-family':seccionSettings.tipography,'color':'#'+seccionSettings.color,'font-size': '150%','background-color': '#ceeaeb','width':'90%','textAlign':seccionSettings.justificado}">Un ejemplo de Sección</li>
                                        <li class="text-fake" 
                                        :style="{'font-style':textoSettings.italic ? 'italic' : 'normal','text-decoration':textoSettings.underlined ? 'underline' : 'none','font-weight':textoSettings.bold ? 'bold' : 'normal','font-family':textoSettings.tipography,'color':'#'+textoSettings.color,'font-size': '150%','background-color': '#e9f5f6','width':'90%','textAlign':textoSettings.justificado}">Un ejemplo de texto</li>
                                        <li class="text-fake" 
                                        :style="{'font-style':piesSettings.italic ? 'italic' : 'normal','text-decoration':piesSettings.underlined ? 'underline' : 'none','font-weight':piesSettings.bold ? 'bold' : 'normal','font-family':piesSettings.tipography,'color':'#'+piesSettings.color,'font-size': '150%','background-color': '#ceeaeb','width':'90%','textAlign':piesSettings.justificado}">Un ejemplo de pies</li>
                                    </ul>
                                
                            </div>
                        </div>
                        
                        <Button @click="sendIndexToPrepare"  label="Finalizar" icon="pi pi-check" autofocus  class="boton-finalizar mt-3"/>
                    </div>
                </div>
            </div>
        </div>
    </section>  
    <!-- tercerpunto -->  
    <Dialog v-model:visible="dialogEjemplo" :style="{ width: '70vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
        <div style="display:flex; justify-content: center; flex-direction: column; overflow: scroll">
            <p class="titulo" 
            :style="{'font-size':(tituloSettings.size*0.75)+'px','font-style':tituloSettings.italic ? 'italic' : 'normal','text-decoration':tituloSettings.underlined ? 'underline' : 'none','font-weight':tituloSettings.bold ? 'bold' : 'normal','font-family':tituloSettings.tipography,'color':'#'+tituloSettings.color,'font-size': '150%','width':'90%','textAlign':tituloSettings.justificado}">
                El Título
            </p>
            <p class="capitulo" 
            :style="{'font-size':(capituloSettings.size*0.75)+'px','font-style':capituloSettings.italic ? 'italic' : 'normal','text-decoration':capituloSettings.underlined ? 'underline' : 'none','font-weight':capituloSettings.bold ? 'bold' : 'normal','font-family':capituloSettings.tipography,'color':'#'+capituloSettings.color,'font-size':' 150%','textAlign':capituloSettings.justificado}">
            1. Introducción
            </p>
            <p class="text" 
            :style="{'font-size':(textoSettings.size*0.75)+'px','font-style':textoSettings.italic ? 'italic' : 'normal','text-decoration':textoSettings.underlined ? 'underline' : 'none','font-weight':textoSettings.bold ? 'bold' : 'normal','font-family':textoSettings.tipography,'color':'#'+textoSettings.color,'font-size': '150%','textAlign':textoSettings.justificado}">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p class="seccion"
            :style="{'font-size':(seccionSettings.size*0.75)+'px','font-style':seccionSettings.italic ? 'italic' : 'normal','text-decoration':seccionSettings.underlined ? 'underline' : 'none','font-weight':seccionSettings.bold ? 'bold' : 'normal','font-family':seccionSettings.tipography,'color':'#'+seccionSettings.color,'font-size': '150%','textAlign':seccionSettings.justificado}">
                1.1. Contexto cultural
            </p>
            <p class="text" 
            :style="{'font-size':(textoSettings.size*0.75)+'px','font-style':textoSettings.italic ? 'italic' : 'normal','text-decoration':textoSettings.underlined ? 'underline' : 'none','font-weight':textoSettings.bold ? 'bold' : 'normal','font-family':textoSettings.tipography,'color':'#'+textoSettings.color,'font-size': '150%','textAlign':textoSettings.justificado}">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p class="pies"
            :style="{'font-size':'4px','font-style':piesSettings.italic ? 'italic' : 'normal','text-decoration':piesSettings.underlined ? 'underline' : 'none','font-weight':piesSettings.bold ? 'bold' : 'normal','font-family':piesSettings.tipography,'color':'#'+piesSettings.color,'font-size': '150%','textAlign':piesSettings.justificado}">
                Esto son los pies
            </p>
        </div>
    </Dialog>
    <Dialog v-model:visible="dialogPrePago" :style="{ width: '70vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
        <Button @click="descargarPrueba"  label="descargar Prueba" icon="pi pi-check" autofocus  class="boton-finalizar mt-3"/>
        <Button @click="CreateStripeSession"  label="Pagar por trabajo" icon="pi pi-check" autofocus  class="boton-finalizar mt-3"/>
    </Dialog>
    
</template>

<script>
import UserService from "../service/UserService";
import PaymentService from "../service/PaymentService.js";
export default {
	data() {
        return {
            resolution:Math.sqrt((window.screen.width** 2) + (window.screen.height ** 2))/ 96,
            dialogEjemplo:false,
            selectedTipography:"Montserrat",
            tipographies:["Roboto","Oswald","Montserrat","Anuphan","Comic Neue","Libre Franklin","Source Serif Pro"],
            selectJustification:"center",
            selectTamaño :20,
            tamaños:[8,9,10,11,12,14,16,18,20,22,24,26,28,36,48,72],
            justificado:["center", "justify","left","right"],
            color:"black",
            tituloSelected:true,
            capituloSelected:false,
            seccionSelected:false,
            textoSelected:false,
            piesSelected:false,
            boldSelected:true,
            italicSelected:false,
            underlinedSelected:false,
            tituloSettings:{tipography:"Montserrat",bold:true,underlined:false,italic:false,size:20,justificado:"center",color:"000000"},
            capituloSettings:{tipography:"Montserrat",bold:false,underlined:false,italic:false,size:16,justificado:"left",color:"000000"},
            seccionSettings:{tipography:"Montserrat",bold:false,underlined:false,italic:false,size:16,justificado:"left",color:"000000"},
            textoSettings:{tipography:"Montserrat",bold:false,underlined:false,italic:false,size:12,justificado:"left",color:"000000"},
            piesSettings:{tipography:"Montserrat",bold:false,underlined:false,italic:false,size:8,justificado:"right",color:"000000"},
            dialogPrePago:false,
            dialogPago:false,
            
        }
    },
    paymentService: null,
    created() {
        this.userService = new UserService;
        this.paymentService = new PaymentService;
    },
	mounted() {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=3.0');
        document.head.appendChild(meta);
    },
    methods: {
        async CreateStripeSession(){
            const session  = await this.paymentService.getStripeSession()
            if (session != "error"){
                window.location = session.session
            }else{
                this.$toast.add({
                            severity: 'error',
                            summary: 'El servicio de pagos de Beelasy no se encuentra disponible, inténtalo más tarde',
                            life: 3000
                        });
            }
            
        },

        guardarStyleEnStore(){
            this.$store.dispatch("saveStyle", {
                "tituloSettings":this.tituloSettings,
                "capituloSettings":this.capituloSettings,
                "seccionSettings":this.seccionSettings,
                "textoSettings":this.textoSettings,
                "piesSettings":this.piesSettings
            });
        },

        async generarProyecto(){
            //la funcion buena es la de abajo que tendras que modificar en el futuro
            if (!this.$store.state.loggedIn) {
                this.$router.push("/register");
            }else{                
                this.dialogPrePago = true
                const response = await this.paymentService.createProject(this.$store.state.index[0],this.$store.state.userId)
                for (const key of Object.keys(response)) {
                    if (key.startsWith('error')) {
                        return true; // Si se encuentra una clave que comienza con "error", devuelve true
                    }
                }
            }
        },

        async sendIndexToPrepare(){
            if (!this.$store.state.loggedIn) {
                this.$router.push("/register");
            }
            let userId = this.$store.state.userId
            let token = this.$store.state.token
            let indice = this.$store.state.index.slice()
            let pies = this.$store.state.pies
            let array = [indice, pies];
            let style = this.$store.state.style
 
            const buffer = await this.userService.sendIndexAndStyle(userId,token,[].concat.apply([], array),style);
            console.log("el buffer es +"+buffer)
            // Crear un Blob a partir del objeto buffer
            const blob = new Blob([buffer], { type: 'application/ms-word' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'archivo.docx';
            a.click();
            window.URL.revokeObjectURL(url);
        

        },
        onColorChange(){
            const settings = {
                'titulo': this.tituloSettings,
                'Capitulo': this.capituloSettings,
                'seccion': this.seccionSettings,
                'Texto': this.textoSettings,
                'pies': this.piesSettings
            };

            for (const key in settings) {
                if (Object.prototype.hasOwnProperty.call(settings, key)) {
                    if (this[key.toLowerCase() + 'Selected']) {
                        settings[key].color = this.color;
                    }
                }
            }
            this.guardarStyleEnStore()
        },
        onBoldChange(){
            this.boldSelected=!this.boldSelected
            const settings = {
                'titulo': this.tituloSettings,
                'Capitulo': this.capituloSettings,
                'seccion': this.seccionSettings,
                'Texto': this.textoSettings,
                'pies': this.piesSettings
            };

            for (const key in settings) {
                if (Object.prototype.hasOwnProperty.call(settings, key)) {
                    if (this[key.toLowerCase() + 'Selected']) {
                        settings[key].bold = this.boldSelected;
                    }
                }
            }
            this.guardarStyleEnStore()
        },
        onItalicChange(){
            this.italicSelected=!this.italicSelected
            const settings = {
                'Titulo': this.tituloSettings,
                'Capitulo': this.capituloSettings,
                'seccion': this.seccionSettings,
                'Texto': this.textoSettings,
                'pies': this.piesSettings
            };

            for (const key in settings) {
                if (Object.prototype.hasOwnProperty.call(settings, key)) {
                    if (this[key.toLowerCase() + 'Selected']) {
                        settings[key].italic = this.italicSelected;
                    }
                }
            }
            this.guardarStyleEnStore()
        },
        onUnderlineChange(){
            this.underlinedSelected=!this.underlinedSelected
            const settings = {
                'Titulo': this.tituloSettings,
                'Capitulo': this.capituloSettings,
                'seccion': this.seccionSettings,
                'Texto': this.textoSettings,
                'pies': this.piesSettings
            };

            for (const key in settings) {
                if (Object.prototype.hasOwnProperty.call(settings, key)) {
                    if (this[key.toLowerCase() + 'Selected']) {
                        settings[key].underlined = this.underlinedSelected;
                    }
                }
            }
            this.guardarStyleEnStore()
        },
        onTipographyChange(){
            const settings = {
                'Titulo': this.tituloSettings,
                'Capitulo': this.capituloSettings,
                'seccion': this.seccionSettings,
                'Texto': this.textoSettings,
                'Pies': this.piesSettings
            };

            for (const key in settings) {
                if (Object.prototype.hasOwnProperty.call(settings, key)) {
                    if (this[key.toLowerCase() + 'Selected']) {
                        settings[key].tipography = this.selectedTipography;
                    }
                }
            }
            this.guardarStyleEnStore()
        },
        onSizeChange(){
            const settings = {
                'Titulo': this.tituloSettings,
                'Capitulo': this.capituloSettings,
                'seccion': this.seccionSettings,
                'Texto': this.textoSettings,
                'pies': this.piesSettings
            };

            for (const key in settings) {
                if (Object.prototype.hasOwnProperty.call(settings, key)) {
                    if (this[key.toLowerCase() + 'Selected']) {
                        settings[key].size = this.selectTamaño;
                    }
                }
            }
            this.guardarStyleEnStore()
        },
        onJustificationChange() {
            const settings = {
                'Titulo': this.tituloSettings,
                'Capitulo': this.capituloSettings,
                'seccion': this.seccionSettings,
                'Texto': this.textoSettings,
                'pies': this.piesSettings
            };

            for (const key in settings) {
                if (Object.prototype.hasOwnProperty.call(settings, key)) {
                    if (this[key.toLowerCase() + 'Selected']) {
                        settings[key].justificado = this.selectJustification;
                    }
                }
            }
            this.guardarStyleEnStore()
        },
        selectField(field) {
            const fields = {
                'titulo': 'tituloSelected',
                'capitulo': 'capituloSelected',
                'seccion': 'seccionSelected',
                'texto': 'textoSelected',
                'pies': 'piesSelected'
            };

            for (const key in fields) {
                if (Object.prototype.hasOwnProperty.call(fields, key)) {
                    this[fields[key]] = key === field;
                    if( key === field ){
                        this.selectedTipography = this[key+"Settings"].tipography;
                        this.boldSelected = this[key+"Settings"].bold;
                        this.underlinedSelected = this[key+"Settings"].underlined;
                        this.italicSelected = this[key+"Settings"].italic;
                        this.selectJustification = this[key+"Settings"].justificado
                        this.color = this[key+"Settings"].color
                        this.selectTamaño = this[key+"Settings"].size

                    }
                    
                    
                }
            }
            this.guardarStyleEnStore()
        },
        downloadFile() {
            var contenido = "doc.docx";
            var blob = new Blob([contenido], {type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"});

            // Crear un objeto URL para el archivo Blob
            var urlArchivo = URL.createObjectURL(blob);

            // Crear un elemento <a> para descargar el archivo
            var linkDescarga = document.createElement("a");
            linkDescarga.href = urlArchivo;
            linkDescarga.download = "archivo.docx";

            // Agregar el elemento <a> al documento
            document.body.appendChild(linkDescarga);

            // Simular un clic en el enlace de descarga
            linkDescarga.click();

            // Limpiar el objeto URL y el elemento <a> del documento
            URL.revokeObjectURL(urlArchivo);
            linkDescarga.remove();
        }
    },
	computed: {

	},
    components: {
    }
}
</script>
<style>

   /*tercerpunto-------------------------------------------------------------*/
    .tercerpunto {
    width: 100%;
    height: 100vh;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    }

    .tercerpunto-main {
    width: 90%;
    height: 90%;
    border: 1px solid #1D3557;
    }

    /*cabecera----------------------------------*/
    .tercerpunto-main-cabecera {
    width: 100%;
    height: 15%;
    display: flex;
    }

    .tercerpunto-main-cabecera-bloquenumero {
    width: 15%;
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 1%;
    }

    .tercerpunto-main-cabecera-bloquetexto {
    width: 85%;
    height: 100%;
    background-color: #457B9D;
    display: flex;
    align-items: center;
    }

    /*cabecera ------------------------------ cabecera*/
    /* Cabecera */
    .tercerpunto-main-cabecera {
    display: flex;
    width: 100%;
    height: 15%;
    }

    .tercerpunto-main-cabecera-bloquenumero {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    height: 100%;
    padding-bottom: 1%;
    background-color: white;
    }

    .tercerpunto-main-cabecera-bloquetexto {
    display: flex;
    align-items: center;
    width: 85%;
    height: 100%;
    background-color: #457B9D;
    }

    /* Cuerpo */
    .tercerpunto-main-cabecera-cuerpo {
    display: flex;
    width: 100%;
    height: 100%;
    }

    .tercerpunto-main-cabecera-cuerpo-columna1 {
    flex: 1;
    margin-top:3em;
    }

    .tercerpunto-main-cabecera-cuerpo-columna1-texto {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 25%;
    margin-top: 1em;
    }

    .tercerpunto-main-cabecera-cuerpo-columna1-video4 {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 60%;
    margin-top: 1em;
    }

    .vid4 {
    width: 90%;
    height: 40%;
    }

    .tercerpunto-main-cabecera-cuerpo-columna2 {
    display: flex;
    justify-content: center;
    flex: 2;
    }

    .tercerpunto-main-cabecera-cuerpo-columna2-main {
    width: 90%;
    height: 60%;
    margin-top: 7em;
    }

    .tercerpunto-main-cabecera-cuerpo-columna2-main-menu {
    display: flex;
    width: 100%;
    height: 50px;
    }

    .tercerpunto-main-cabecera-cuerpo-columna2-main-punto {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 18%;
    border: 1px solid #457B9D;
    }

    .tercerpunto-main-cabecera-cuerpo-columna2-main-punto:hover {
    background-color: #457B9D;
    }

    .tercerpunto-main-cabecera-cuerpo-columna2-main-punto:hover .texto-menu {
    color: white;
    }

    .tercerpunto-main-cabecera-cuerpo-columna2-main-cuerpo {
    border: 1px solid #457B9D;
    height: 65%;
    width: 100%;
    }

    .main-settings{
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    }

    .tercerpunto-main-cabecera-cuerpo-columna2-main-cuerpo-settings{
    width: 95%;
    height: 100%;
    border-bottom: 1px solid #457B9D;
    display: flex;
    align-items: center;
}

.tercerpunto-main-cabecera-cuerpo-columna2-main-cuerpo-settings-punto{
    width: 23%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #FCC200;
    border-right: 1px solid #FCC200;
}

.bloque-contenido-cuerpo{
    width: 100%;
    height: 70%;
    display: flex;
}

.lista-titulos{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.titulos{
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style-type: none;
}

.lista-Elements{
    width: 80%;
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    list-style-type: none;
}

.p-dropdown,
.p-dropdown:focus {
    border: none;
    box-shadow: none !important;
}

.especiales:hover{
    color: #FCC200;
    cursor: pointer;
}

.field-selected{
    background-color: #457B9D !important;
}

.field-selected-text{
    color: white;
} 

.especiales-selected{
    color:#FCC200
}



    /*Zoom de más de 150 */
    @media screen and (min-resolution: 180dpi) {
        .text-fake {
            font-size: 90% !important; /* Tamaño de letra para el zoom del 200% */
        }

        .p-dropdown{
            width: 70%;
            height: 30px;
        }
    }



    /* cuerpo---------------------------------cuerpo*/
    /*tercerpunto-------------------------------------------------------------tercerpunto */


    @media (max-width: 990px){

        .style-tercerpunto-main-cabecera-bloquetexto{
            font-size: 2.2em!important;
        }

        .tercerpunto-main-cabecera-cuerpo{
            flex-direction: column !important;
        }



        .tercerpunto-main-cabecera-cuerpo-columna1{
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 1rem!important;
        }

        .tercerpunto-main-cabecera-cuerpo-columna1-video4{
           height: 75%!important;
        }
        .vid4{
            height: 100%;
        }

        .tercerpunto-main-cabecera-cuerpo-columna1-texto{
            display: none;
        }

        .tercerpunto-main-cabecera-cuerpo-columna2-main{
            margin-top: 0%;
        }

        .tercerpunto-main-cabecera-cuerpo-columna2-main-punto{
            width: 30%!important;
        }

        .texto-menu{
            font-size: small !important;;
        }



        .especial{
            font-size: x-large !important;
        }

        .bloque-contenido-cuerpo{
            margin-top: 2rem;
        }

        .tercerpunto-main-cabecera-cuerpo-columna2-main-cuerpo-settings{
            height: 5rem;
            flex-wrap: wrap;
            margin-bottom: 10rem;
        }

        .tercerpunto-main-cabecera-cuerpo-columna2-main-cuerpo-settings-punto{
            width: 33%;
            display: flex;
            justify-content: center;
            flex: auto;
            align-items: center;
        }

        .tercerpunto-main-cabecera-cuerpo-columna2-main-cuerpo-settings-punto:nth-child(n+4) {
            border-top: 1px solid #FCC200;
        }

        .p-dropdown{
            width: 100%;
        }
    }
    @media (max-width: 300px) {
        .titulos{
            padding-left: 5px;
        }

        .lista-Elements{
            padding-left: 5px;
        }

        .text-fake{
            font-size: smaller !important;;
        }
    }
</style>