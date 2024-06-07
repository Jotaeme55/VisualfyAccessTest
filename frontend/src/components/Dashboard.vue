<template> 
    <Toast />
    <!-- intro -->
    <section class="intro" :style="image">
        <div class="columnaintro">
            <router-link class="redbuton-intro boton-no-responsive" to="/indexInsert">
                <div >
                    <h1 style="color:#1D3557;text-align:center;margin-top:23px">Pruébalo ahora</h1>
                </div>
            </router-link>
        </div>
        <div class="columnaintro">
            <div class="texto-blanco-intro">
                <h1 class="style-texto-blanco-intro" style="text-shadow: 2px 0px 2px rgba(0, 0, 0, 0.3);color:white">Realiza ahora <br> tu prueba gratuita</h1>
            </div>
            <div class="redblock">
                <h3 class="text-redblock" style="color:#1D3557">No te agobies, ahora tienes toda la ayuda que
                    necesitas.
                    ¿No sabes como empezar, continuar, o terminar…?
                    Pues para eso estamos aquí, haz tu prueba ahora.
                </h3>
            </div>
        </div>
    </section>
    <!-- intro -->
    <!-- slogan -->
    <section class="slogan" :style="fondoslogan">
        <div class="columna-slogan-1">
            <div class="fila-columna-slogan-1">
                <div class="bloque-fila-columna-slogan-1">
                    <h1 style="font-size:70px;color:white;text-shadow: 6px 2px 3px black;">
                        Tu proyecto sin sufrir
                    </h1>
                    <h1 style="font-size:90px;color:#FCC200;text-shadow: 6px 2px 3px black;">
                        en minutos
                    </h1>
                    <h1 style="font-size:70px;color: white;text-shadow: 6px 2px 3px black;">
                        por solo 5 euros
                    </h1>
                </div>
            </div>
            <div class="fila-columna-slogan-1">
                <div class="bloque-fila-columna-slogan-1">
                    <h1 style="font-size:90px;color: white;text-shadow: 6px 2px 3px black;">
                        No PIERDAS
                    </h1>
                    <h1 style="font-size:70px;color: #FCC200;text-shadow: 6px 2px 3px black;">
                        ni tiempo ni dinero
                    </h1>
                </div>
            </div>
        </div>
        <div class="columna-slogan-2">
            <img class="img-despertador" src="images/despertador.svg" alt="despertador">
        </div>
    </section>
    <!-- slogan -->
    <!-- cuerpo -->
    <section class="cuerpo">
        <div class="container-excited">
            <img class="img-excited" src="images/excited.png" alt="excited">
        </div>
        <div class="agrupacion-redblocks">
            <div class="redblock-agrupado-cuerpo">
                <div class="redondel-redblock">
                    <i style="color:#1D3557;font-size:50px" class="pi pi-pencil"></i>
                </div>
                <div class="block-text-redblock">
                    <h3 class="text-redblock" style="color:#1D3557">Prepara un pequeño indice para tu trabajo.</h3>
                </div>  
            </div>
            <div class="redblock-agrupado-cuerpo">
                <div class="redondel-redblock">
                    <i style="color:#1D3557;font-size:50px" class="pi pi-cloud-upload"></i>
                </div>
                <div class="block-text-redblock">
                    <h3 class="text-redblock" style="color:#1D3557">Añade el índice a la web.</h3>
                </div>  
            </div>
            <div class="redblock-agrupado-cuerpo">
                <div class="redondel-redblock">
                    <i style="color:#1D3557;font-size:50px" class="pi pi-check"></i>
                </div>
                <div class="block-text-redblock">
                    <h3 class="text-redblock" style="color:#1D3557">Voilá, trabajo hecho.</h3>
                </div>  
            </div>
        </div>
    </section>
    <!-- cuerpo -->
    <!-- Video -->
    <section class="video"> 
        <video class="vid" controls>
            <source src="images/HOME_PAGE_VIDEO.mp4" />
            Your browser does not support the video tag.
        </video>
    </section>
    <!-- Video -->
    <!-- formulario -->
    <section class="formulario">
        <div class="columnaformulario">
            <div class="columna-izquierda-formulario" style="padding-left:20%">
                <h1 style="color:white">¿Tienes alguna duda?</h1>
                <h3 style="color:white">Contacta con nosotros</h3>
                <div class="boton-rojo-formulario" @click="enviarEmail">
                    <h1 class ="style-boton-rojo-formulario" style="color:#1D3557;text-align:center;padding-top:5%">Envíanoslo</h1>
                </div>
            </div>

        </div>
        <div class="columnaformulario columna-derecha-formulario">
            <span style="display: flex;flex-wrap: nowrap;" >
                <p style="margin-right:1%;color:white;">Nombre</p>
                <InputText style="width:40%" id="Nombre" type="text" v-model="nombre" />
                
            </span>
            <span class="" style="display: flex; flex-wrap: nowrap; margin-top:2%">
                <p style="margin-right:3%;color:white;">Email</p>
                <InputText style="width:41%" id="email" type="text"  v-model="email"/>
                
            </span>
            <p style="color:white;margin-top:2%">Consúltanos tus dudas</p>
            <Textarea class="textarea-formulario" style="width:50%" rows="5" cols="5" v-model="message"/>
        </div>
    </section>
    <!-- formulario -->
    <!-- opinion -->
    <section class="opinion">
        <div class="titulo-opinion">
            <h1>Otros usuarios opinan</h1>
        </div>
        <div class="opinion-bloque-azul-centrar">
            <div class="opinion-bloque-azul">
                <div class="container-arrogante">
                    <img class="img-arrogante" src="images/arrogante.png" alt="arrogante">
                </div>
                <div class="bloque-texto-opinion">
                    <div class="comentario-texto-opinion">
                        <h1 class="style-comentario-texto-opinion" style="color:white;font-size:large">
                            <div v-for="(image, index) in textos" :key="index"
                                :class="{ active: index === currentSlide }" class="carousel-image">
                                {{ image }}
                            </div>
                        </h1>
                    </div>
                    <div class="autor-texto-opinion">
                        <h1 class="style-autor-texto-opinion" style="color:white;">
                            <div v-for="(image, index) in autores" :key="index"
                                :class="{ active: index === currentSlide }" class="carousel-image">
                                {{ image }}
                            </div>
                        </h1>
                    </div>
                    <div class="puntos-seleccion-opinion">

                    </div>
                </div>
            </div>
        </div>

    </section>
    <!-- opinion -->
    <!-- redes -->
    <section class="redes" :style="imageredes">
        <div class="redes-siguenos">
            <h1 style="color:white">Síguenos en nuestras redes sociales</h1> 
        </div>
        <div class="redes-apps">
            <i class="pi pi-instagram app"></i>
            <i class="pi pi-twitter app" ></i>
            <i class="pi pi-whatsapp app"></i>
        </div>
        
    </section>
    <!-- redes -->
</template>

<script>
import UserService from "../service/UserService";
export default {
	data() {
        return {
            image: { backgroundImage: "url(./images/bookimage.png)" },
            imageredes: { backgroundImage: "url(./images/fotoredes.png)" },
            fondoslogan: { backgroundImage: "url(./images/fondoslogan.png)" },
            currentSlide: 0,
            textos: [
                "No me aclaraba con mi proyecto, tenia muchas ideas pero no canseguía avanzar. Gracias a BeeLasy en minutos tenia todo el desarrollo.",
                "Como vi q costaba tan poco pensé que no perdía mucho. Aprobé con notaza.",
                "Me la recomendó un compañero de clase y se quedó cortísimo, rapidísimo.",
                "Estaba super agobiada con montones de exámenes y ya no me daba tiempo para nada, un sobre super guay.",
                "Entre la casa, el trabajo, la familia y los estudios estaba pensando en tirar la toalla, y me hablaron de BeeLasy. El mejor consejo de mi vida.",
            ],
            autores: [
                "Marcos de León- Empresariales",
                "Álvaro Sevilla - Psicología",
                "Gorka Sevilla - Psicología",
                "Esther - Bachillerato Segovia",
                "Ana - Filología",
            ],
            nombre:"",
            message:"",
            email:"",
        }
        
    },
    userService: null,
    async created() {
        this.userService = new UserService;
	},
	mounted() {

        setInterval(this.nextSlide, 5000);
    },
    methods: {
        nextSlide() {
            if (this.currentSlide === this.textos.length - 1) {
                this.currentSlide = 0;
            } else {
                this.currentSlide++;
            }
        },
        async enviarEmail(){

            if (this.email=="" || this.name=="" || this.message=="") {
                this.$toast.add({severity:'error', summary: 'El nombre, el mensaje o el email están vacíos',  life: 3000});
            }else{
                try{
                    await this.userService.sendUserQuestionToBeelasy(this.nombre,this.message,this.email);
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Se ha enviado corréctamente', life: 3000});
                }catch{
                    this.$toast.add({severity:'error', summary: 'Ha habido un error en el mensaje',  life: 3000});
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
     /*  layout main container controla el padding del topbar y el footbar */
     /*intro ----------------------------------------------------------intro*/
    .intro{
        height:44rem;
        background-size: cover;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 100%;
    }

    .columnaintro{
        position:relative;

    }

    .redblock{
        top: 55%;
        width: 80%;
        height:13rem;
        position:absolute;
        background-color:#FCC200;
        overflow:hidden;
        display:flex;
        text-align:center;
        justify-content:center;
    }

    .text-redblock{
        padding:5%;

    }

    .texto-blanco-intro{
        position: absolute;
        top: 35%;
        left: 30%;
    }

    .redbuton-intro{
        position: absolute;
        top: 55%;
        left: 40%;
        border-radius:20px;
        width:20rem;
        height:7rem;
        background-color:white;
        display:flex;
        text-align:center;
        justify-content:center;
        box-shadow: 6px 6px 3px #1d3557;
    }

    .redbuton-intro:hover{
        background-color: #ccc;
    }

    /*intro ----------------------------------------------------------intro*/
    /*slogan ----------------------------------------------------------slogan*/
    .slogan{
        width: 100%;
        height: 60rem;
        background-color: #1d3557;
        display: flex;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .columna-slogan-1 {
        flex-basis: 66%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: center;
    }
    
    .fila-columna-slogan-1 {
        width: 100%;
        height: 50%;
        /* text-align: right; */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bloque-fila-columna-slogan-1{
        text-align: right;
    }

    .columna-slogan-2 {
        flex-basis: 34%;
        display: flex;
        align-content: right;
        align-items: center;
        justify-content: end;
    }

    .img-despertador{
        float: right;
        height: 100%;
    }

    /*slogan ----------------------------------------------------------slogan*/
    /*cuerpo ---------------------------------------------------------cuerpo*/
    .cuerpo{
        height:27rem;
        background-color:white;
        display: block;
        position: relative;
     
    }

    .container-excited{
        position: absolute;
        bottom: -0.1%;
         

    }
    .img-excited{
        width: 27rem;
    }

    .agrupacion-redblocks{
        width: 70%;
        height: 100%;
        float: right;
        margin-right: 3rem;
        display: flex;
        justify-content: center;
        align-items: end;
    }

    .redblock-agrupado-cuerpo{
        width: 30%;
        height: 65%;
        background-color: #FCC200;
        margin-right: 3%;
        align-items: center;
        position: relative;
    }

    .redondel-redblock{
        border-radius:1000px;
        position: absolute;
        top: -25%;
        left: 25%;
        width: 50%;
        height: 50%;
        background-color: #FCC200;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .block-text-redblock{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    /*cuerpo ---------------------------------------------------------cuerpo*/
    /*video ---------------------------------------------------------video*/
    .video {
        height: 43rem;
        background-color: #1d3557;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .vid{
        width: 75% !important;
        height: 80% !important;
    }

    /*video ---------------------------------------------------------video*/
    /*formulario ---------------------------------------------------------formulario*/
    .formulario{
        height:23rem;
        background-color:#457B9D;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 100%;
    }

    .columnaformulario{
        display:flex;
        flex-direction: column;
        justify-content:center;

    }

    .boton-rojo-formulario{
        width:50%;
        height:45%;
        background-color:#FCC200;
        border-radius:20px;
        cursor: pointer;
    }

    .boton-rojo-formulario:hover{
        background-color: #ccc;
    }

    /*formulario ---------------------------------------------------------formulario*/
    /*opinion ---------------------------------------------------------opinion*/
    .opinion {
        width: 100%;
        height: 30rem;
        background-color: white;
        display: block;
    }

    .titulo-opinion {
        padding-top: 3rem;
        padding-left: 25%;
        padding-bottom: 1%;
    }

    .opinion-bloque-azul-centrar {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .opinion-bloque-azul {
        width: 80%;
        height: 20rem;
        background-color: #1d3557;
        position: relative;
    }

    .container-arrogante {
        position: absolute;
        bottom: -0.1%;
    }

    .img-arrogante {
        width: 80%;
    }

    .bloque-texto-opinion {
        width: 60%;
        height: 100%;
        float: right;
        margin-right: 3rem;
        display: flex;
        justify-content: center;
        align-items: start;
        flex-direction: column;
    }

    .comentario-texto-opinion {
        text-align: left;
    }

    .slider {
        position: relative;
        height: 30vh;
        overflow: hidden;
        background-color: #ccc;
        scroll-snap-type: y mandatory;
    }

    .slider__content {
        height: 30vh;
        background-position: center;
        background-size: cover;
        scroll-snap-align: center;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: calc(3rem + 4vmin);
    }

    .carousel-image {
        display: none;
    }

    .carousel-image.active {
        display: block;
    }

    /*opinion ---------------------------------------------------------opinion*/
    /*redes ---------------------------------------------------------redes*/
    .redes{
        background-size: cover;
        width: 100%;
        height: 26rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .redes-siguenos{
        
        margin-bottom: 2%;
    }


    .app{
        color:white;
        font-size: 500%;
        margin-right: 25px;
        margin-left: 25px;
    }
    /*redes ---------------------------------------------------------redes*/

     /* RESPONSIVE------------------------------------------------ */


     @media (max-width: 990px) {
        /* intro-------------------- */
        .intro{
            height: 30rem;
            display: flex;
            grid-template-columns:none;
        }
        .intro .redblock{
            display: none;
        }

        .intro .texto-blanco-intro{
            top: 20%;
            width: 100vw;
            
            text-align: center;
        }

        .intro .texto-blanco-intro .style-texto-blanco-intro{
            font-size: 3rem;
            color:white !important;
            
        }

        .intro .redbuton-intro{
            width: 20rem;
            top: 55%;
            margin-left: calc(-10em + 50vw);
        }


        /* intro------------------ */
        .slogan{
            display: none;
        }

        .cuerpo{
            display: none;
        }

        /* video --------------------------- */

        .video{
            height: 16rem;
        }

        /* video ----------------------------- */
        /* formulario ---------------------------------- */

        .columna-izquierda-formulario{
            padding-left: 10%;
        }

        .columna-derecha-formulario{
            padding-left: 5%;
        }

        .textarea-formulario{
            width: 80% !important;
        }

        .boton-rojo-formulario{
            width: 90%;
            height: 4.2rem;
        }

        .style-boton-rojo-formulario{
            font-size: 1.8rem;
            padding-top: 10px !important;
        }

        /* formulario ---------------------------------- */

        /* opinion ------------------------------------- */

        .opinion-bloque-azul{
            height: 17rem;
        }

        .container-arrogante{
            display: none;
        }

        .style-autor-texto-opinion{
            font-size: 1.2rem;
            color: #FCC200 !important;
        }

        /* opinion -------------------------------------- */
        /* redes ------------------------------------------ */
        .redes{
            text-align: center;
        }
     }
</style>