<template>
    <Toast />
    <div style="height: 100vh;">
    <!-- primerpunto -->
    <section class="primerpunto">
        <div class="primerpunto-main">
            <div class="columna-primerpunto">
                <!--cabecera-->
                <div class="cabecera-primerpunto-main">
                    <div class="numero-bloque-primerpunto">
                        <h1  style="font-size:5rem;color:#1D3557" class="numero-cabecera">1</h1>
                    </div>
                    <div class="titulo-bloque-primerpunto">
                        <h1 class="style-titulo-bloque-primerpunto" style="font-size:3rem;color:#FCC200;padding-left: 5%;">Creando el índice</h1>
                    </div>
                </div>
                <!--cabecera-->
                <!--cuerpo-->
                <div class="cuerpo-primer-punto">
                    <div class="bloque-texto-explicacion">
                        <p style="font-size:18px"> El primer paso es insertar tu índice lo mas detallado
                        posible, de esta manera podremos crear los
                        contenidos, recuerda que cuanto mas detallado sea,
                        tu contenido será mas completo y específico.
                        </p>
                    </div>
                    <div class="bloque-imagen-primerpunto">
                        <div class="imagen-primerpunto">
                            <img id="imagen-indice" @load="imagenCargada" style="display: none;" src="images/indice.png" alt="indice">
                            <Skeleton :style="{ display: mostrarSkeleton ? 'block' : 'none' }" id="skeleton-indice" width="100%" height="20rem" borderRadius="16px"></Skeleton>
                        </div>
                    </div>

                </div>

                <!--cuerpo-->
            </div>
            <div class="columna-primerpunto col2">
                <div class="boton-importar" @click="dialogImportar=true">
                        <p class="style-boton-importar" style="font-size:250%;color: #1D3557;">Importar índice</p>
                </div>
                <div class="text-under-boton">
                    <p class="style-text-under-boton" style="font-size:170%;color: #1D3557;">Puedes importar un archivo de word o txt</p>
                </div>
                <router-link class="boton-importar" to="/indexGenerator">
                        <p class="style-boton-importar" style="font-size:250%;color: #1D3557;">Crear índice</p>
                </router-link>
                <div class="text-under-boton">
                    <p class="style-text-under-boton" style="font-size:170%;color: #1D3557;">Manualmente, tu te lo guisas tu te lo comes</p>
                </div>
            </div>
            
        </div>
    </section>  
    <!-- primerpunto -->  
    <Dialog v-model:visible="dialogImportar" modal header="Añade tu archivo de índices" :style="{ width: '70vw' }">
        <div class="bloque-dialog-1" style="margin-right: 5px;">
            <p>Recuerda que el formato debe ser parecido al siguiente:</p>
            <div style="border: 1px solid black; padding: 5px;">
                <p>El título</p>
                <div style="display: flex; align-items: start; flex-direction: column;">
                    <p>1. Reinado de la Reina Isabel 2</p>
                    <p>&nbsp;&nbsp; 1.1. Reinado, problemas y circunstancias.</p>
                    <p>2. Biografía de la Reina Isabel 2</p>
                </div>         
            </div>
        </div>
        <FileUpload name="demo[]" @upload="uploaded" :multiple="false" accept=".TXT,.txt,.docx" :maxFileSize="1000000" @select="onSelectedFiles">
        <template #header="{ chooseCallback, clearCallback, files }">
                <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                    <div class="flex gap-2">
                        <Button @click="chooseCallback()" icon="pi pi-file-pdf" rounded outlined :disabled="files && files.length >= 1"></Button>
                        <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
                    </div>
                </div>
            </template>
            <template #content="{ files }">
                <div v-if="files.length > 0" >
                    <h5>Tu archivo</h5>
                    <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                        <div v-for="(file) of files" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                            <span class="font-semibold">{{ file.name }}</span>
                            <Button icon="pi pi-check" @click="uploadfile(file)" outlined rounded  severity="danger" />
                        </div>
                    </div>
                </div>
            </template>
            <template #empty>
                <div class="flex align-items-center justify-content-center flex-column">
                    <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
                    <p class="mt-4 mb-0">Arrastra los archivos txt o docx.</p>
                </div>
            </template>
        </FileUpload>
    </Dialog>
    </div>
</template>

<script>
import * as mammoth from 'mammoth';
export default {
	data() {
        return {
            dialogImportar:false,
            contenido:"",
            mostrarSkeleton: true,
        }
    },
    async created() {
	},
	mounted() {
    },
    methods: {
        imagenCargada() {
            this.mostrarSkeleton = false;
            const imagen = document.getElementById('imagen-indice');
            imagen.style.display = 'block';
        },

        async uploadfile(file){
            if(file["name"].charAt(file["name"].length - 1)==="t" || file["name"].charAt(file["name"].length - 1)==="T"){
                this.procesarTXT(file)
            }
            else if(file["name"].charAt(file["name"].length - 1)==="x" || file["name"].charAt(file["name"].length - 1)==="X"){
                this.procesarWord(file)
            }
            else{
                this.$toast.add({severity:'error', summary: 'Ha habido un error',  life: 3000});
                    return 0;
            }
        },
        procesarTXT(file) {
            
            const lector = new FileReader();

            lector.onload = (e) => {
                this.contenido = e.target.result;
                this.extraerIndice(this.contenido)
            };

            lector.readAsText(file);
        },
        obtenerListaNumerada(cadena) {
           let listaEncontrada = true
            for (var i = 0; i < cadena.length && listaEncontrada; i++) {
                if (cadena.slice(i, i + 4) === "<ol>") {
                    listaEncontrada = false;
                }
            }
            listaEncontrada=true
            for (var j = cadena.length-1; j !=0 && listaEncontrada; j--){
                if (cadena.slice(j, j + 5) === "</ol>") {
                    listaEncontrada = false;
                }
            }
            return cadena.slice(i+3,j+1)
            
        },
        asignarNumeros(text, res, number, ){
            let obj;
            let cortar = 2;
            let contadorLi = 0;
            let primeraVez = -1;
            let ultimaVez = -1;
            let listaPuntos=[];
            let punto;
            let i=0;
            let y=1;
            while( i<text.length-4 ){
                while( i<text.length && ultimaVez==-1 ){
                    if(text.slice(i, i + 4) === "<li>"){
                        contadorLi++;
                        if(primeraVez == -1){
                            primeraVez = i;
                        }
                    }
                    if(text.slice(i, i + 5) === "</li>"){
                        contadorLi--;
                        if(contadorLi==0){
                            ultimaVez = i; 
                        }
                    }
                    i++;
                }
                punto = text.slice(primeraVez,ultimaVez+5)
                listaPuntos.push(punto)
                primeraVez = -1;
                ultimaVez = -1; 
                y++
            }

            for(let j=1; j<y ;j++){
                if(text!=""){
                    if(listaPuntos[j-1].includes("<ol>")){
                        cortar=1
                        let segundaLista = this.obtenerListaNumerada(listaPuntos[j-1]);
                        let primeraParteDeTexto = listaPuntos[j-1].split("<ol>")[0];
                        res[number+(j)+"."] = primeraParteDeTexto;
                        number = number+(j)+"."
                        obj = this.asignarNumeros(segundaLista, res, number)
                        for (const key in obj) {
                            res[key] = obj[key];
                        }
                    }else{
                        cortar = 2
                        res[number+(j)+"."] = listaPuntos[j-1]
                    }

                }
                if(cortar==1){
                    number = number.slice(0, -2);
                }
            }
            return res
        },
        extraerIndiceWord(html){
            console.log(html)
            if(html.includes("<ol>")){
                let listaNum = this.obtenerListaNumerada(html)
                console.log(listaNum)
                let listaNumSplitted = listaNum.split("</ol>")
                let validacion = false
                let validacion2 = false
                for (let i=0;i<listaNumSplitted.length;i++){
                    if(!(listaNumSplitted[i].startsWith("<li>") || listaNumSplitted[i].startsWith("</li>"))){
                        validacion = true
                    }else if(listaNumSplitted[i].includes("<p>") || listaNumSplitted[i].includes("</p>")){
                        validacion2 = true
                    }
                }
                if(validacion) {
                    this.$toast.add({severity:'error', summary: 'Por favor inserte un único índice',  life: 3000});
                    return 0;
                }else if(validacion2){
                    this.$toast.add({severity:'error', summary: 'Por favor, no indexes más de 5 veces',  life: 3000});
                    return 0;
                }else{
                    let indice = this.asignarNumeros(listaNum, {},"")
                    console.log(indice)
                }
            }  
        },
        procesarWord(file){
            const reader = new FileReader();
            reader.onload = (event) => {
                const arraybuffer = event.target.result;
                mammoth.convertToHtml({arrayBuffer: arraybuffer })  
                .then((result) => {
                        const text = result.value;
                        console.log(this.extraerIndiceWord(text))
                    })
                .catch((error) => {
                    console.error('Error al extraer el texto:', error);
                });
            
                };        
            reader.readAsArrayBuffer(file); 
        },
        async procesarPDF(file){
            let reader = new FileReader();
 
            reader.onload = (e) => {
                console.log((atob(e.target.result.split(',')[1])))
                this.contenido = e.target.result;
                // this.extraerIndice(this.contenido)
            };

            reader.readAsDataURL(file);
        },
        extraerIndice(file){
            
            if (!(typeof file === 'string' && file.trim() !== '')) {
                this.$toast.add({severity:'error', summary: 'El archivo está vacío',  life: 3000});
            }else{

                let lineas = file.split("\r\n");
                if(lineas.length == 1){
                    this.$toast.add({severity:'error', summary: 'Añade un índice como el del formato',  life: 3000});
                    return 0;
                }else{
                    let titulo = lineas[0]
                    lineas.shift()
                    let listaDeLineas = []
                    let haFuncionado = true
                    for (let nLinea in lineas){
                        let lineaActual = lineas[nLinea].trim();
                        if(!isNaN(lineaActual.charAt(0)) && lineaActual.charAt(1) == "." || (!isNaN(lineaActual.charAt(1)) && lineaActual.charAt(2) == ".")){  
                            if(lineaActual!=""){
                                listaDeLineas.push(lineaActual)
                            }
                        }else{
                            this.$toast.add({severity:'error', summary: 'Añade un índice como el del formato',  life: 3000});
                            haFuncionado = false
                            return 0;
                            
                        }
                    }
                
                    if(haFuncionado){
                        console.log(titulo)
                        console.log(listaDeLineas)
                        
                    }
                    
                }
                
            }
        }
    },
	computed: {

	},
    components: {
    }
}
</script>
<style>

    /*segundopunto-------------------------------------------------------------primerpunto */
    .primerpunto{
        width: 100%;
        height: calc(100vh )!important;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .primerpunto-main{
        width: 80%;
        height: 80%;
        border: 1px solid #1D3557;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 100%;
    }

    .columna-primerpunto{
        width: 100%;
        height: 80%;
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

        .bloque-imagen-primerpunto{
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 5rem;
        }

        .imagen-primerpunto{
            width: 66%;
            height: 20rem;
            overflow: hidden;
        }
        
        .imagen-primerpunto img{
            object-fit: cover;
            object-position: center;
            width: 100%;
        }
        /*primerpunto-cuerpo */

    .col2{
        display: block;
        justify-content: center;
        margin-top: 10rem;
    }    

    .boton-importar{
        margin-top: 2rem;
        margin-left: 15%;
        width: 60%;
        height: 5rem;
        background-color:#FCC200;
        border-radius:15px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .boton-importar:hover{
        background-color: darkorange;
    }

    .text-under-boton{
        margin-top: 1%;
        margin-left: 15%;
        width: 60%;
    }

    .bloque-dialog-1{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    /*primerpunto-------------------------------------------------------------primerpunto */

    /* RESPONSIVE ------------------------------------ */
    @media (max-width: 990px) and (min-width: 300px) {
        .primerpunto{
            height: 43rem!important;
        }
        .primerpunto-main{
            margin-top: 3rem;
            height: 38rem!important;
            grid-template-columns: none;
            display: flex !important;
            flex-direction: column;

        }

        .cuerpo-primer-punto{
            display: none;
        }

        .columna-primerpunto{
            height: 0px !important;
        }

        .col2{
            margin-top: 23rem;
            height: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .boton-importar{
            margin-left: 0;
        }

        .text-under-boton{
            margin-left: 0;
        }

        .boton-importar{
            width: 80%;
        }

        .style-boton-importar{
            font-size: xx-large !important;
        }

        .style-text-under-boton{
            font-size: 150%!important;
        }

        .style-titulo-bloque-primerpunto{
            font-size: 2rem!important;
        }

    }

    @media (max-width: 300px) {

        .primerpunto{
            height: 30rem!important;
        }
        .primerpunto-main{
            margin-top: 7rem;
            height: 35rem!important;
            grid-template-columns: none;
            display: flex !important;
            flex-direction: column;
        }

        .cuerpo-primer-punto{
            display: none;
        }

        .columna-primerpunto{
            height: 0px !important;
        }

        .col2{
            margin-top: 20rem;
            height: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .boton-importar{
            margin-left: 0;
        }

        .text-under-boton{
            margin-left: 0;
        }

        .boton-importar{
            width: 85%;
        }

        .style-boton-importar{
            font-size: 26px !important;
        }

        .style-text-under-boton{
            font-size: 120%!important;
        }

        .style-titulo-bloque-primerpunto{
            font-size: 1.5rem!important;
        }

        .titulo-bloque-primerpunto{
            margin-left: 60px!important;
        }
    }
</style>