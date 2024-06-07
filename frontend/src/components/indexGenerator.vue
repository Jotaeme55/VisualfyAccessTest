<template>
    <Toast />
    <div style="height: 100vh;">
    <!-- primerpunto -->
    <section class="primerpunto">
        <div class="primerpunto-main">
            <div class="columna-primerpunto-generator">
                <!--cabecera-->
                <div class="cabecera-primerpunto-main">
                    <div class="numero-bloque-primerpunto">
                        <h1 style="font-size:5rem;color:#1D3557" class="numero-cabecera">1.1</h1>
                    </div>
                    <div class="titulo-bloque-primerpunto">
                        <h1 class="style-indice-manual" style="font-size:3rem;color:#FCC200;padding-left: 5%;">Índice manual</h1>
                    </div>
                </div>
                <!--cabecera-->
                <!--cuerpo-->
                <div class="cuerpo-primer-punto">
                    <div class="bloque-texto-explicacion">
                        <p style="font-size:18px"> Vamos valiente.<br>
                            Recuerda detallar muy bien todo, para mejorar el
                            contenido.<br>
                            Te iremos pidiendo datos, para desarrollar tu trabajo.
                            Sin nervios y tranqui que luego puedes cambiar lo que
                            necesites.
                        </p>
                    </div>
                </div>

                <!--cuerpo-->
            </div>
            <div class="columna-primerpunto-generator colummna2">
                <video class="vid1" controls>
                    <source src="images/1_INDICE MANUAL.mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            
        </div>
    </section>  
    <!-- primerpunto -->  
    <!-- dialog-titulo -->
        <Dialog position="bottom" header="Añade el título de tu trabajo" :closable=false
            v-model:visible="displayTitulo" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
            :style="{'box-shadow': `4px 4px 13px #1D3557`,width: '70vw'}">
            <Textarea v-model="titulo" rows="5" cols="120" />
                <template #footer>
                    <Button icon=" pi pi-plus-circle" class="p-button-rounded p-button-warning" @click="openChapterSection"
                    :style="{width:'3rem','background-color':'#FCC200'}"/>
                </template>
        </Dialog>
        <Dialog position="bottom" :header="'Añade el índice'" :closable=false
            v-model:visible="displayCapitulo" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
            :style="{'box-shadow': `4px 4px 13px #1D3557`,width: '70vw'}">
            <Textarea v-model="indice" id="myTextarea" rows="5" cols="120" :placeholder="`1. Esto es el título &#10;  1.1 Aquí Iría la primera parte de ese punto &#10;  1.2 Aquí Iría la primera parte de ese punto`"
            @click="clickOnTextArea()" @keyup.enter="createSubIndex()" @input="getCursorPosition"   />
                <template #footer>
                    <Button icon=" pi pi-plus-circle" class="p-button-rounded p-button-warning" @click="openPies"
                    :style="{width:'3rem','background-color':'#FCC200'}"/>
                </template>
        </Dialog>
        <Dialog position="bottom" :header="'Añade el pie (opcional)'" :closable=false
            v-model:visible="displayPies" :breakpoints="{'960px': '75vw', '640px': '90vw'}" 
            :style="{'box-shadow': `4px 4px 13px #1D3557`,width: '70vw'}">
            <Textarea v-model="pies" id="myTextarea" rows="5" cols="120" />
                <template #footer>
                    <Button label="Finalizar" icon="pi pi-check" @click="sendData" autofocus  class="boton-finalizar"/>
                </template>
        </Dialog>
    </div>
    <!-- dialog-titulo -->
</template>

<script>
export default {
	data() {
        return {
            numCapsAtras: 0,
            numCap: 0,
            secCap: 1,
            displayTitulo:true,
            displayCapitulo:false,
            displayPies:false,
            titulo:"",
            indice:"",
            pies:"",
            listaCapitulos:[],
            cursorPosition:0,
            subIndexMasAlto:1,
            anteriorSubsection:0
        }
    },
    async created() {
	},
	mounted() {
    },
    methods: {        
        
        sendData(){
            let lineas = this.indice.split(/\r?\n/);
            lineas.unshift(this.titulo)
            this.$store.commit("saveIndex", lineas)
            this.$store.commit("savePies", this.pies)
            this.$router.push('/testingPages')  
        },
        openPies(){
            if(this.indice.trim()!="" && this.indice.trim()!=this.numCap+"." ){
                this.displayCapitulo = false;
                this.displayPies = true;
            }else{
                this.$toast.add({severity:'error', summary: 'Rellena el capítulo',  life: 3000});
            }
        },
        openResponsive() {
            this.displayResponsive = true;
        },
        openChapterSection(){
            if(this.titulo.trim()!=""){
                this.displayTitulo = false;
                this.displayCapitulo = true;
            }else{
                this.$toast.add({severity:'error', summary: 'Rellena el título',  life: 3000});
            }

        },
        clickOnTextArea(){
            if (this.indice=="") this.indice="1. "
        },
        async createSubIndex(){
            
            let lineas=this.indice.split(/\r?\n/);
            let numlineaActu = this.getLineaActual(lineas)
            let subSection = this.isSubsection(lineas[numlineaActu])
            this.anteriorSubsection = subSection
            if(numlineaActu == lineas.length-2){ //estamos en el último bloque
                if(subSection===0){ //Aquí contiene espacio así que crea sección entera 
                    let lineaActual = lineas[this.getLineaActual(lineas)]
                    let nEspacios = this.counterEspacios(lineaActual)
                    let indexNum = lineaActual.trim().split(" ")[0]
                    this.indice+=nEspacios+this.setCharAt(indexNum,indexNum.length-2,parseInt(indexNum[indexNum.length-2])+1)+" "
                }else if(subSection===1){
                    this.indice=this.indice.substring(0, this.indice.length - 1);
                    let lineaAnterior = lineas[numlineaActu-1]
                    let indexNumAnterior = lineaAnterior.trim().split(" ")[0]
                    let lineaActual = lineas[numlineaActu]
                    let indexNumActual = lineaActual.trim().split(" ")[0]
                    let nPuntos = this.countPointsFromLine(indexNumActual)
                    let nPuntosAnterior = this.countPointsFromLine(indexNumAnterior)
                    if(nPuntosAnterior > nPuntos){
                        this.indice=this.indice.substring(0, this.indice.length - 1);
                        this.$toast.add({severity:'error', summary: 'Rellena el campo',  life: 3000});
                    }else{
                        this.indice = this.replaceWithoutPointBefore(this.indice,indexNumActual,"\u00a0\u00a0"+this.setCharAt(indexNumAnterior,indexNumAnterior.length-2,
                        parseInt(indexNumAnterior[indexNumAnterior.length-2]))+"1." )
                    }
                }else if(subSection===2){
                    this.indice=this.indice.substring(0, this.indice.length - 1);
                    this.$toast.add({severity:'error', summary: 'Rellena el campo',  life: 3000});
                }
            }else{ //estamos en un bloque de en medio
                
                let lineaActual = lineas[numlineaActu]
                this.indice = this.replaceWithoutPointBefore(this.indice, lineaActual+"\n", lineaActual)
                let indexPart=lineaActual.trim().split(" ")[0]
                let nPuntos = this.countPointsFromLine(indexPart)
                let i = 2
                let lineaSiguiente = lineas[parseInt(numlineaActu)+i]
                let indexPartSiguiente=lineaSiguiente.trim().split(" ")[0]
                let nPuntosSiguiente = this.countPointsFromLine(indexPartSiguiente)
                if(nPuntosSiguiente > nPuntos) {//esto es si tiene subsecciones dentro del bloque
                    let lineaAModificar = ""
                    while(nPuntosSiguiente > nPuntos){
                        i=i+1
                        lineaSiguiente = lineas[parseInt(numlineaActu)+i]
                        if(lineaSiguiente==undefined){
                            lineaAModificar = lineas[parseInt(numlineaActu)+i-1]
                            break
                        }
                        indexPartSiguiente=lineaSiguiente.trim().split(" ")[0]
                        nPuntosSiguiente = this.countPointsFromLine(indexPartSiguiente)
                        lineaAModificar = lineas[parseInt(numlineaActu)+i-1]
                    }
                    let indexACrear =this.setCharAt(indexPart,indexPart.length-2,parseInt(indexPart[indexPart.length-2])+1)
                    let nEspacios = this.counterEspacios(lineaActual)
                    this.indice = this.replaceWithoutPointBefore(this.indice, lineaAModificar.trim(),lineaAModificar.trim()+"\r\n"+nEspacios+indexACrear+" ")
                    let newPos = this.indice.indexOf(indexACrear) + indexACrear.length
                    while (lineaSiguiente != undefined){
                        let indexPart2=lineaSiguiente.trim().split(" ")[0]
                        let nPuntos2 = this.countPointsFromLine(indexPart2)
                        if(nPuntos2 == nPuntos){
                            let indiceNuevo = this.setCharAt(indexPart2,indexPart2.length-2,parseInt(indexPart2[indexPart2.length-2])+1)
                            this.indice = this.replaceAllExceptFirst(this.indice,indexPart2,indiceNuevo)
                        }
                            i=i+1
                            lineaSiguiente = lineas[parseInt(numlineaActu)+i]
                            
                    }
                    this.$nextTick(()=>{
                        let elem = document.getElementById("myTextarea")
                        elem.setSelectionRange(newPos, newPos);
                    })
                            
                }else { //si no hay subindices de por medio
                    
                    let lineaAModificar = lineas[parseInt(numlineaActu)]
                    // let nEspacios = this.counterEspacios(lineaActual)
                    if(lineaAModificar.trim().split(" ").length == 1){
                        
                        let nPuntos = this.countPointsFromLine(lineaAModificar)
                        let lineaAnterior = lineas[parseInt(numlineaActu)-1]
                        let nPuntosAnterior = this.countPointsFromLine(lineaAnterior)
                        if(lineaAnterior == undefined){
                            this.$toast.add({severity:'error', summary: 'Rellena el campo',  life: 3000});
                        }else if(nPuntos == nPuntosAnterior){
                            
                            let indexNumAnterior = lineaAnterior.trim().split(" ")[0]
                            let indexNumActual = lineaAModificar.trim().split(" ")[0]
                            this.indice = this.replaceWithoutPointBefore(this.indice,indexNumActual,"\u00a0\u00a0"+this.setCharAt(indexNumAnterior,indexNumAnterior.length-2,
                            parseInt(indexNumAnterior[indexNumAnterior.length-2]))+"1." )  
                            while (lineaSiguiente != undefined){
                                let indexPart2=lineaSiguiente.trim().split(" ")[0]
                                let nPuntos2 = this.countPointsFromLine(indexPart2)
                                if(nPuntos2 == nPuntos){
                                    let indiceNuevo = this.setCharAt(indexPart2,indexPart2.length-2,parseInt(indexPart2[indexPart2.length-2])-1)
                                    this.indice = this.replaceWithoutPointBefore(this.indice,indexPart2,indiceNuevo)
                                }
                                    i=i+1
                                    lineaSiguiente = lineas[parseInt(numlineaActu)+i]
                                    
                            }
                        }else{
                            this.$toast.add({severity:'error', summary: 'Rellena el campo',  life: 3000});
                        }
                    }else{        
                        let indexACrear =this.setCharAt(indexPart,indexPart.length-2,parseInt(indexPart[indexPart.length-2])+1)
                        let creadorIndices = this.createListsIndices(lineas, indexACrear)
                        let listaIndices = creadorIndices[0]
                        let listaTextos = creadorIndices[1]
                        let functionUpdateList = this.updateListIndices(listaIndices)
                        let primerVar = functionUpdateList[0]
                        let listaIndiceUpdated = functionUpdateList[1]
                        console.log(primerVar)
                        this.indice = this.mergeLists(listaIndiceUpdated,listaTextos)
                    }
                }
            } 
        },
        mergeLists(listIndice,ListaTexto){
            let i=0
            let res=""
            while(i<listIndice.length){
                let index=listIndice[i]
                let espacios = this.countPointsFromLine(index)*2
                let k = 0
                while (k<espacios){
                    res+=" "
                    k++
                }
                let text = ListaTexto[i]
                if(i == listIndice.length-1){
                    res+= index +" "+text
                }else{
                    res+= index +" "+text+"\n"
                }
                
                i++
            }
            return res;
        },
        updateListIndices(listaIndices){
            let primerVar
            let i=0 
            let anterior = ""
            let anteriorPost = ""
            let lastNumber;
            let pos;
            let j = 0
            let noIf = false
            let k = 0
            while(i<listaIndices.length){
                let index = listaIndices[i]
                let puntosIndex = this.countPointsFromLine(index)
                let puntosAnterior = this.countPointsFromLine(anterior)
                if(puntosIndex<=puntosAnterior&&(index==anterior || index==anteriorPost)){
                    console.log("estamos aqui",index)
                    lastNumber = parseInt(index[index.length-2])+1
                    index = this.setCharAt(index,index.length-2,lastNumber)
                    listaIndices[i]=index
                    j=0
                    noIf = true
                    anteriorPost=index
                    if(k==0){
                        primerVar = anterior
                    }
                    k++
                }else if((puntosIndex!=puntosAnterior && puntosAnterior!=0 && noIf)||j>0){
                    if(j==0){
                        pos = (puntosAnterior * 2) - 2
                    }
                    
                    index = this.setCharAt(index,pos,lastNumber)
                    listaIndices[i]=index
                    j++
                    k++
                }else{
                    j=0
                    k++
                }
                anterior = index
                
                i++
            }
            return [primerVar,listaIndices]
        },
        createListsIndices(lineas, index){
            let i=0
            let listaIndices = []
            let listaTextos = []
            while (i<lineas.length){
                let linea = lineas[i].trim().split(" ")
                let indice = linea[0]
                if(indice == ""){
                    indice = index
                }
                listaIndices.push(indice)
                linea.shift()
                listaTextos.push(linea.join(" "))
                i++
            }
            return [listaIndices,listaTextos]
        },
        replaceWithoutPointBeforeAndOnlySubindices(str, search, replace, puntos, puntosReq) {
            let cont = 0
            return str
                .split(search)
                .reduce((prev, curr) =>  
                (console.log("prev+",prev),cont++,prev + ((prev != "" && prev != undefined ?  puntos!=puntosReq && prev[prev.length-1]=="." : false) ? (cont=cont-1, search) : (cont == 1 ? search : replace)) + curr))
        },
        replaceWithoutPointBeforeAndNoSubindices(str, search, replace ,nPuntos) {
            let cont = 0
            let cuentaPuntos = nPuntos
            console.log(str.split(search))
            var currSplit 
            return str
                .split(search)
                .reduce((prev, curr) =>  
                (console.log("curr",curr),currSplit = curr.split("\r\n"),console.log("currSplit,",currSplit),cuentaPuntos = this.countPointsFromLine(currSplit[currSplit.length-1]),console.log(cuentaPuntos),cont++,prev + ((prev != "" && prev != undefined ?   prev[prev.length-1]=="." : false) ? (cont=cont-1, search) : (cuentaPuntos!=nPuntos && cont == 1 ? search : replace)) + curr))
        },
        replaceWithoutPointBefore(str, search, replace) {
            return str
                .split(search)
                .reduce((prev, curr) =>  
                prev + ((prev != "" && prev != undefined ? prev[prev.length-1]=="." : false) ? search :  replace) + curr)
        },
        replaceAllExceptFirst(str, search, replace) {
            
            let cont = 0
            return str
                .split(search)
                .reduce((prev, curr) =>  
                (console.log("prev+",prev),cont++,prev + ((prev != "" && prev != undefined ? prev[prev.length-1]=="." : false) ? (cont=cont-1, search) : (cont == 1 ? search : replace)) + curr))
        },
        counterEspacios(str){
            let contador=""
            for (let num in str){
                if(str[num] !== "\u00a0"){
                    return contador
                }
                contador+="\u00a0"
            }
        },
        setCharAt(str,index,chr) {
            if(index > str.length-1) return str;
            return str.substring(0,index) + chr + str.substring(index+1);
        },
        getLineaActual(lineas){
            var contLetras=0
            for (var nlinea in lineas) {
                if(contLetras+lineas[nlinea].length > this.cursorPosition-2){
                    return nlinea
                }else{
                    contLetras+=lineas[nlinea].length+1
                }
            }
        },
        isSubsection(linea){
            if(this.anteriorSubsection===0){
                let lineaTrimeada = linea.trim()
                for(var letra in lineaTrimeada){
                    if(lineaTrimeada[letra] === " "){
                        return 0
                    }else if(letra == lineaTrimeada.length-1){
                        return 1
                    }
                }
            }else {
                let lineaTrimeada = linea.trim()
                for(var letra2 in lineaTrimeada){
                    if(lineaTrimeada[letra2] === " "){
                        return 0
                    }else if(letra2 == lineaTrimeada.length-1){
                        return 2
                    }
                }
            }

        },
        countPointsFromLine(linea){
            let lineaTrimeada = linea.trim()
            let counter = 0
            for(var letra in lineaTrimeada){
                if (lineaTrimeada[letra] === "."){
                    counter+=1
                }else if(lineaTrimeada[letra] === " "){
                    return counter
                }
            }
            return counter
        },
        getCursorPosition(event) {
            let textarea =event.target;
            this.cursorPosition = textarea.selectionStart;
        },
    },
	computed: {

	},
    components: {
    }
}
</script>
<style>
    /*primerpunto-------------------------------------------------------------primerpunto */
    .primerpunto{
        width: 100%;
        height: 65rem;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .primerpunto-main{
        width: 80%;
        height: 90%;
        border: 1px solid #1D3557;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 100%;
    }

    .columna-primerpunto-generator{
        width: 100%;
        height: 100%;
    }
        /* cabecera-primer-punto */
        .cabecera-primerpunto-main{
            border: 0px solid white;
            width: 100%;
            float: left;
            display: inline-flex;

        }

        .numero-bloque-primerpunto{
            padding-left: 7%;
            padding-top: 1.5rem;
            width: 5%;
            height: 100%;
            background-color: white;
        }
        .titulo-bloque-primerpunto{
            display: flex;
            justify-content: left;
            align-content: center;
            width: 80%;
            padding-top: 2.4rem;
            margin-left: 120px;
            background-color:#1D3557;
            
        }   
        /* cabecera-primer-punto */
        /*primerpunto-cuerpo */
        .bloque-texto-explicacion{
            margin-top: 3rem;
            width: 100%;
            padding-top: 9rem;
            padding-left: 8%;
        }

  
        /*primerpunto-cuerpo */
        .colummna2{
            display: flex;
            justify-content: center;
            align-items: flex-start;
        }

        .vid1{
            margin-top: 4rem;
            width: 85%;
            height: 29%;
        }
    /*primerpunto-------------------------------------------------------------primerpunto */
    /*dialog -----------------------------------------------------------------dialog*/
    .p-dialog-header{
        display: flex !important;
        justify-content: center !important;
    }
    .p-dialog-title{
        font-size: 2rem !important;
        color: #1D3557 !important;
    }

    .p-dialog-content{
        display: flex;
        justify-content: center;
    }


    .boton-finalizar{
        background-color: #1D3557;
        color:#FCC200;
    }

    .boton-chapter{
        background-color:#457B9D;
        color:white;
    }
    /*dialog -----------------------------------------------------------------dialog*/

    @media (max-width: 990px) and (min-width: 300px) {

        .columna-primerpunto-generator{
            width: 100%;
            height: 35%;
        }

        .vid1{
            margin-top: 0rem;
            width: 85%;
            height: 87%;
        }

    }

    @media (max-width:300px){

        .numero-cabecera{
            font-size: 3.5rem;
        }
        .style-indice-manual{
            font-size: 2rem;
        }
    }
</style>