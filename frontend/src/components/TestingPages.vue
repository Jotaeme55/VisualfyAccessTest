<template>
    <Toast />
    <!-- punto2 -->
    <section class="punto2">
       <div class="punto2-main">
            <div class="cabecera-punto2-main">
                <div class="numero-cabecera-punto2-main">
                    <h1 style="font-size:600%;color: #1D3557;">2</h1>
                </div>
                <div class="cuerpo-cabecera-punto2-main">
                    <h1 class="style-cuerpo-cabecera" style="font-size:43px;color: #1D3557;margin-left: 20px;">Preparando las páginas</h1>
                </div>
            </div>
            <div class="cuerpo-punto2-main">
                <div class="columna1-cuerpo-punto2-main">
                    <div class="bloque-columna1-cuerpo-punto2-main">
                        <div class="texto-bloque-columna1-cuerpo-punto2-main">
                            <p class="style-texto-punto2" style="font-size:18px">
                                Venga ánimo que estamos terminado, y ahora viene lo
                                mejor.
                                <br>
                                <br>
                                Cada punto de tu índice puede tener entre 1 y 5 páginas.
                                Por defecto está preparado con 3 páginas, solo debes
                                cambiarlo.
                            </p>
                        </div>
                    </div>
                    <div class="bloque-video">
                        <Skeleton :style="{ display: !mostrarSkeletonVideo3 ? 'block' : 'none' }" width="24rem" height="12rem"></Skeleton>
                        <video :style="{ display: mostrarSkeletonVideo3 ? 'block' : 'none' }" @load="SkeletonVideo" class="vid3" controls>
                            <source src="images/2_PREPARANDO PÁGINAS.mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                </div>
                <div class="columna2-cuerpo-punto2-main">
                    <div class="contenido-columna2-cuerpo-punto2-main">
                        <div class="titulo-contenido-columna2-cuerpo-punto2-main">
                            <h1>{{titulo}}</h1>
                        </div>
                        
                        <div class="bloque-lista">
                            <ul class="lista">
                                <li class="elementos-lista" v-for="(item, index) in items" :key="item" @mouseover="unhideButtons(index)">
                                    <div :id="'boton-id-'+index" class="botones-elementos-lista">
                                        <Button icon="pi pi-pencil" class="p-button-text p-button-info boton-lista" @click="editField(index, item)"/>
                                    </div>
                                    <div :id=index class="text-elementos-lista">
                                        {{index}} {{item}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <Button label="Finalizar" icon="pi pi-check" @click="saveData" autofocus  class="boton-finalizar"/>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </section>  
    <Dialog v-model:visible="dialogSugerencias" header="Unas sugerencias" :style="{ width: '50vw' }" position="right" :modal="true" :draggable="false">
        <div class="bloque-botones-sugerencia">
            <Button class="boton-sugerencia" v-for="sugerencia in sugerencias" :key="sugerencia" @click="rellenarSugerencia(sugerencia)">
                {{ sugerencia }}
            </Button>
            <p v-if="sugerencias.length==0">No hay sugerencias para esta palabra</p>
        </div>
    </Dialog>
    <!-- punto2 -->  
</template>

<script>
import axios from 'axios';
export default {
	data() {
        return {
            titulo: this.$store.state.index[0],
            listaCapitulos: "",
            items:{"1.":"primeroooooooooprimeroooo oooooprimerooooooooo","1.1.":"primera seccion","2.":"segundosegundosegundosegundosegundosegundo","3.":"tercero","3.1.":"tercero primera seccion","3.2.":"tercero segunda seccion"},
            textoCorregido: {},
            dialogSugerencias: false,
            idSugerencias : "",
            sugerencias: [],
            contenidoModificado:"",
            palabrasCorregidas:{},
            inputActivo:false,
            idActivo:"",
            mostrarSkeletonVideo3:true,
        }
    },
    async mounted() {
        let listaCaps = this.$store.state.index.slice()
        listaCaps = listaCaps.splice(1, listaCaps.length);
        this.items = this.convertirEnObjeto(listaCaps)
        try{
            let palabrasCorregidas = await axios.post("diccheck", this.items)
            this.palabrasCorregidas = palabrasCorregidas.data.result
            this.colorearCamposNoCorregidos(palabrasCorregidas.data.result)
            
        }catch (error){
            console.log(error)
        }
        
    },
    
	created() {

    },
    methods: {
        SkeletonVideo(){
            this.mostrarSkeletonVideo3=false
        },
        async rellenarSugerencia(sugerencia) {
                const idSplited = this.idSugerencias.split("-");
                const id = idSplited[1];
                const nPalabra = idSplited[2];
                const idHTML = document.getElementById(id);
                const contenidoEspacios = this.combinarContenido(idHTML).split(" ");
                contenidoEspacios[nPalabra] = sugerencia;
                contenidoEspacios.shift()
                const contenidoUnificado = contenidoEspacios.join(" ");
                this.items[id] = contenidoUnificado;
                idHTML.innerHTML = contenidoUnificado;
                this.dialogSugerencias=false;
                let dicCheck = {id:contenidoUnificado}
                let palabrasCorregidas = await axios.post("diccheck", dicCheck)
                if(Object.keys(palabrasCorregidas.data.result).length != 0){
                        this.palabrasCorregidas[id] = palabrasCorregidas.data.result.id
                        this.colorearCamposNoCorregidos(this.palabrasCorregidas)
                    }
                
        },
        async editField(id, content){
            if(!this.inputActivo){
                this.inputActivo=true;
                this.idActivo=id
                let field = document.getElementById(id);
                this.contenidoModificado=content
                field.innerHTML = "<input id='input-field-edit' type='text' value='"+content+"'>"
                
                let inputField = document.getElementById("input-field-edit")
                inputField.addEventListener("keydown", async (e) => {
                    if(e.key=="Enter"){
                        field.innerHTML=id+" "+inputField.value
                        this.items[id]=inputField.value
                        let dicCheck = {id:inputField.value}
                        let palabrasCorregidas = await axios.post("diccheck", dicCheck)
                        if(Object.keys(palabrasCorregidas.data.result).length != 0){
                            this.palabrasCorregidas[id] = palabrasCorregidas.data.result.id
                            this.colorearCamposNoCorregidos(this.palabrasCorregidas)
                        }
                        this.inputActivo=false
                    }
                })
            }else{
                if(this.idActivo==id){ 
                    let field = document.getElementById(id);
                    let inputField = document.getElementById("input-field-edit")
                    field.innerHTML=id+" "+inputField.value
                    this.items[id]=inputField.value
                    let dicCheck = {id:inputField.value}
                    let palabrasCorregidas = await axios.post("diccheck", dicCheck)
                    if(Object.keys(palabrasCorregidas.data.result).length != 0){
                        this.palabrasCorregidas[id] = palabrasCorregidas.data.result.id
                        this.colorearCamposNoCorregidos(this.palabrasCorregidas)
                        
                    }
                    this.inputActivo=false;
                }else{
                    this.$toast.add({severity:'error', summary: 'Por favor, termina de editar',  life: 3000});
                }
            }

        },
        combinarContenido(elemento) {
            let contenido = '';
            for (let i = 0; i < elemento.childNodes.length; i++) {
                const nodo = elemento.childNodes[i];
                if (nodo.nodeType === Node.ELEMENT_NODE) {
                contenido += this.combinarContenido(nodo);
                } else if (nodo.nodeType === Node.TEXT_NODE) {
                contenido += nodo.textContent;
                }
            }

            return contenido;
        },

        colorearCamposNoCorregidos(palabrasCorregidas) {
            for (const pCorrect in palabrasCorregidas) {
                const div = document.getElementById(pCorrect);
                const palabrasSpliteadas = this.combinarContenido(div).split(" ");
                const listaDeIds = [];

                for (let i = 0; i < palabrasSpliteadas.length; i++) {
                    if (i in palabrasCorregidas[pCorrect]) {
                        const id = `palabraCorregida-${pCorrect}-${i}`;
                        palabrasSpliteadas[i] = `<b id='${id}' class='subrayado-rojo'>${palabrasSpliteadas[i]}</b>`;
                        listaDeIds.push(id);
                    }
                }

                div.innerHTML = palabrasSpliteadas.join(" ");

                listaDeIds.forEach((idPalabra) => {
                    const palabra = document.getElementById(idPalabra);
                    palabra.addEventListener('click', () => {
                        const idparsed = idPalabra.split("-");
                        this.dialogSugerencias = true;
                        this.idSugerencias = idPalabra;
                        this.sugerencias = palabrasCorregidas[idparsed[1]][idparsed[2]];
                    });
                });
            }
        },

        saveData(){

            this.$router.push('/preparingPages')
        },
        convertirEnObjeto(arrayItems){
            let itemsRes = {}
            arrayItems.forEach(item => {
                var linea = item.trim().split(" ")
                let indice = linea[0]
                let texto = linea.splice(1, linea.length).join(" ")
                itemsRes[indice]=texto
            })
            return itemsRes
        },
        unhideButtons(id){
            let goodIndex = "boton-id-"+id;
            let botones = Array.from(document.getElementsByClassName("botones-elementos-lista"))
            botones.map(boton => boton.style.visibility="hidden")
            document.getElementById(goodIndex).style.visibility="visible";
        }
    },
	computed: {

	},
    components: {
    }
}
</script>
<style>
    #input-field-edit{
        width: 82%;
    }

    .bloque-botones-sugerencia{
        width: 90%;
        height: 90%;
        display: flex;
        justify-content: space-between
    }

    .boton-sugerencia{
        margin-right: 5px;
        margin-left: 5px;
    }

    /* corrector ortografico */

    .subrayado-rojo{
        text-decoration: underline red;
        position: relative;
        cursor: pointer;
    }

    /*punto2-------------------------------------------------------------punto2 */
    .titulo-contenido-columna2-cuerpo-punto2-main{
        
        height: 6.6rem;
        width: 80%;
        margin-top: 15px;
        overflow-x: scroll;
        margin-bottom: 5px;
        text-align: center;
    }

    .titulo-contenido-columna2-cuerpo-punto2-main::-webkit-scrollbar{
        height: 7px;
        width: 10px;
        background-color: #A8DADC;
    }

    .titulo-contenido-columna2-cuerpo-punto2-main::-webkit-scrollbar-track{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;
    }
    .titulo-contenido-columna2-cuerpo-punto2-main::-webkit-scrollbar-thumb{
        background-color: #FCC200;
        background-image: -webkit-linear-gradient(90deg,rgba(255, 255, 255, .2) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, .2) 50%,rgba(255, 255, 255, .2) 75%,transparent 75%,transparent)
    }

    .titulo-contenido-columna2-cuerpo-punto2-main::-webkit-scrollbar-thumb:hover{
        background-color: #1D3557;
        background-image: -webkit-linear-gradient(90deg,rgba(255, 255, 255, .2) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, .2) 50%,rgba(255, 255, 255, .2) 75%,transparent 75%,transparent)
    }

    .punto2{
        width: 100%;
        height: calc(100vh - 10rem);
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .punto2-main{
        width: 90%;
        height: 90%;
        border-left: 1px solid #1D3557;
        border-right: 1px solid #1D3557;
        border-bottom: 1px solid #1D3557;
    }

    .cabecera-punto2-main{
        width: 100%;
        height: 5rem;
        background-color: #FCC200;
        display: inline-flex;
    }

    .numero-cabecera-punto2-main{
        border-top: 1px solid #1D3557;
        width: 100px;
        height: 100%;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .cuerpo-cabecera-punto2-main{
        border-right: 1px solid #FCC200;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .cuerpo-punto2-main{
        width: 100%;
        height: 87%;
        display: flex;
    }

    .columna1-cuerpo-punto2-main{
        width: 40%;
        height: 100%;
        display: block;
        justify-content: center;
        align-content:center;
        justify-self:center;
    }

    .bloque-columna1-cuerpo-punto2-main{
        width: 100%;
        height: 20rem;
        display: flex;
        justify-content: center;
    }    

    .texto-bloque-columna1-cuerpo-punto2-main{
        width: 80%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: left;
    }

    .bloque-video{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .vid3{
        width: 60%;
        height: 29%;
        box-shadow: 10px 2px 6px black;
    }
    /*columna2-------------------------------------------------------------columna2 */

    .columna2-cuerpo-punto2-main{
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: left;
    }

    .contenido-columna2-cuerpo-punto2-main{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .bloque-lista{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        overflow-y: scroll;
        margin-bottom: 10px;
    }

    .lista{
        width: 80%;
        margin-block-start:0px;
        float: left;
    }



    .lista li:nth-child(even){
        background-color: #A8DADC;
        list-style:none;
        font-size: large;
        width: 90%;   
    }

    .lista li:nth-child(odd){
        background-color:#F1FAEE;
        list-style:none;
        font-size: large;
        width: 90%;
    }
    
    .text-elementos-lista::-webkit-scrollbar{
        height: 7px;
        width: 10px;
        background-color: #F5F5F5;
    }
    .text-elementos-lista::-webkit-scrollbar-track{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;
    }
    .text-elementos-lista::-webkit-scrollbar-thumb{
        background-color: #FCC200;
        background-image: -webkit-linear-gradient(90deg,rgba(255, 255, 255, .2) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, .2) 50%,rgba(255, 255, 255, .2) 75%,transparent 75%,transparent)
    }

    .text-elementos-lista::-webkit-scrollbar-thumb:hover{
        background-color: #1D3557;
        background-image: -webkit-linear-gradient(90deg,rgba(255, 255, 255, .2) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, .2) 50%,rgba(255, 255, 255, .2) 75%,transparent 75%,transparent)
    }

    .lista li{

        height: 40px;

        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .text-elementos-lista{
        width: 100%;
        height: 100%;
        white-space: nowrap;
        overflow-y:hidden;
        text-overflow: scroll;
        padding-top:5px;
        display: flex;

    }

    .text-elementos-lista > * {
        display: inline;
        margin-left: 5px;
        margin-right: 5px;
    }

    .botones-elementos-lista{
        visibility: hidden;
        z-index: 1;
        width: 100px !important;
        height: 40px !important;
        position: absolute;
        right: -50px;
        display: flex;
    }

    .boton-lista{
        color: #FCC200 !important;
    }

    .boton-lista:hover{
        background-color:#1D3557 !important;
    }

    .boton-finalizar{
        margin-bottom: 20px;
    }

    /* RESPONSIVE ------------------------------------- */
    @media (max-width: 990px) and (min-width: 391px){

        .cuerpo-punto2-main{
            width: 100%;
            height: calc(100% - 5rem) !important;
            display: flex;
            flex-direction: column;
        }

        .columna1-cuerpo-punto2-main{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 30%!important;
            margin-top: 5px;
        }

        .bloque-columna1-cuerpo-punto2-main{
            display: none;
        }

        .texto-bloque-columna1-cuerpo-punto2-main{
            display: none;
        }

        .bloque-video{
            width: 20rem !important;
            align-items: center;
        }

        .lista{
            width: 100%;
        }

        .elementos-lista{
            width: 32rem!important;
        }

        .columna2-cuerpo-punto2-main{
            width: 100%;
            height: 100%;
        }

        .titulo-contenido-columna2-cuerpo-punto2-main{
            height: 7rem;
        }
    }

    @media (max-width: 391px) {
        .cuerpo-punto2-main{
            width: 100%;
            height: calc(100% - 5rem) !important;
            display: flex;
            flex-direction: column;
        }

        .columna1-cuerpo-punto2-main{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 50%!important;
            margin-top: 5px;
        }

        .bloque-columna1-cuerpo-punto2-main{
            display: none;
        }

        .texto-bloque-columna1-cuerpo-punto2-main{
            display: none;
        }

        .bloque-video{
            width: 20rem !important;
            align-items: center;
        }

        .lista{
            width: 100%;
        }

        .elementos-lista{
            width: 83%!important;
        }

        .style-cuerpo-cabecera{
            font-size: large !important;;
        }


        .columna2-cuerpo-punto2-main{
            width: 100%;
            height: 100%;

        }

        .titulo-contenido-columna2-cuerpo-punto2-main{
            height: 65px;
        }

        .bloque-lista{
            height: 10.5rem;
        }
    }

</style>