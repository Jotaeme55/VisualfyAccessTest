<template>
    <div style="width:100%; ">
        <section class="cabecera-about" :style="image">
            <div class="bloque-cabecera">
                <div class="main-bloque-cabecera">
                    <p class="style-bloque-cabecera">
                        Un día fuimos como tu y sufrimos como tu, desde ese momento soñamos con esta una solución  
                        y así empezó esta historia de amor.
                    </p>
                </div>
            </div>
            <div class="about-title">
                <p style="font-size: 2.6rem; color: #FCC200;">¿Quiénes somos?</p>
            </div>
        </section>
        <section class="cuerpo-about">
            <div class="columna-izquierda-cuerpo-about">
                <div class="div-img-about-columna-izquierda" :style="abeja">
                    <img class="img-about-izquierda" src="images/about-izquierda.png" alt="excited">
                </div>
                <div class="main-columna-izquierda-cuerpo-about">
                    <h1 style="color: #1d3557;">Acerca de nosotros</h1>
                    <p class="style-main-columna-izquierda-cuerpo-about" style="margin-left: 10px;font-size: medium;">Somos un equipo multidisciplinar, ingenieros, diseñadores y sobre todo soñadores.
                        Soñamos con poder ayudar a quien lo necesita, porque un día pasamos por lo mismo que tu y porque seguramente volveremos a pasar, pero ya no será tan duro gracias a Beelasy.</p>
                </div>
            </div>
            <div class="columna-derecha-cuerpo-about">
                <div class="div-ambiente-columna-derecha-cuerpo-about" :style="ambiente">
                    <!-- <img class="image-ambiente" src="images/ambiente.jpg" alt="excited"> -->
                </div>
                <div class="main-columna-derecha-cuerpo-about">
                    <h1 style="color: #1d3557;">
                        Sobre tu proyecto
                    </h1>
                    <p class="style-main-columna-derecha-cuerpo-about" style="margin-left: 5px;font-size: medium;">
                        Esta web NO termina tu trabajo, recopila la información que necesitas, la edita, la adapta y te evita horas de búsquedas navegando sin tino hasta que te escuecen los ojos, hasta que pierdes la razón, hasta que tu madre te grita que te bañes y que comas algo.
                        Por eso hoy estas aquí, y por eso nosotros estamos contigo, porque hemos sido sufridores.
                    </p>
                </div>  
            </div>
        </section>
        <section class="end-about">
            <div class="columna-izquierda-end-about">
                <div class="bloque1-columna-izquierda-end-about">
                    <h1 style="color: #1d3557;">¿Cuándo lo recibo?</h1>
                    <p style="font-size: large;">Tu documento no viene de Siberia, ni de ningún recóndito rincón de este planeta, tranquilo, no esperes al cartero, después de añadir tu índice en tan solo unos minutos tendrás tu trabajo listo</p>
                </div>
                <div class="bloque2-columna-izquierda-end-about">
                    <h1 style="color: #1d3557;">¿Los textos son exclusivos?</h1>
                    <p style="font-size: large;">Nuestra tecnología se basa en Inteligencia Artificial, busca en cientos de miles de fuentes, modifica y adapta los textos, para hacerlos singulares, únicos,  mas tuyos que tus genes.</p>
                </div>
            </div>
            <div class="columna-derecha-end-about">
                <div class="imagen-columna-derecha-end-about" :style="columnaDerecha">
                </div>
            </div>
        </section>
    </div>
    </template>
    
    <script>
    export default {
        data() {
            return {
                image: { backgroundImage: "url(./images/About-home.PNG)",  
                "background-size": "cover",  },
                ambiente: { backgroundImage: "url(./images/ambiente.jpg)","background-size": "cover",},
                columnaDerecha:{ backgroundImage: "url(./images/columna-derecha.jpg)","background-size": "cover",},
            }
            
        },
        UserService:null,
        async created() {

        },
        mounted() {
        },
        methods: {
            
        },
        computed: {
    
        },
        components: {
        }
    }
    </script>
    <style>
        .cabecera-about{
            width: 100%;
            height: calc(100vh - 10rem);;
            display: flex;
            flex-direction: column-reverse;
        }

        .bloque-cabecera{
            width: 40%;
            height: 40%;
            background-color: #FCC200;
            margin-left: 6rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .main-bloque-cabecera{
            width: 80%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .style-bloque-cabecera{
            color: black;
            font-size: x-large;
        }
    
        .about-title{
            margin-left: 6rem;
            margin-bottom: 2rem;
        }
        /* seccioón cuerpo-about ----------------------------------------- */
        .cuerpo-about{
            width: 100%;
            height: calc(105vh - 10rem);
            align-items: center;
            display: flex;
        }

        .columna-izquierda-cuerpo-about{
            width: 50%;
            height: 100%;
            background-color: white;
            display: flex;
            flex-direction: column-reverse;
            align-items: center;
            
        }

        .main-columna-izquierda-cuerpo-about{
            width: 80%;
            height: 35%;
            margin-bottom: 5%;
        }

        .div-img-about-columna-izquierda{
            display: flex;
            justify-content: center;
            height: 55%;
        }

        .columna-derecha-cuerpo-about{
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }   

        .div-ambiente-columna-derecha-cuerpo-about{
            width: 80%;
            height: 40%;
            margin-top: 10%;
        }


        .main-columna-derecha-cuerpo-about{
            margin-top: 4%;
            width: 80%;
            height: 46%;
        }
    /* end-about ----------------------------------------- */
        .end-about{
            width: 100%;
            height: calc(100vh - 10rem);
            align-items: center;
            display: flex;
            background-color: #FCC200;
        }

        .columna-izquierda-end-about{
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .bloque1-columna-izquierda-end-about{
            width: 80%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-top: 10%;
        }

        .bloque2-columna-izquierda-end-about{
            width: 80%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-bottom: 10%;
        }

        .columna-derecha-end-about{
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .imagen-columna-derecha-end-about{
            width: 90%;
            height: 60%;
            position: relative;
        }

        .imagen-columna-derecha-end-about::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-shadow: 0 0 10px 5px rgba(0, 0, 255, 0.5);
        }
        
        @media (max-width:920px) {

            /* Cabecera ------------------------ */
            .bloque-cabecera{
                width: 76vw;
            }

            .style-bloque-cabecera{
                font-size: large;
            }

            /* Cuerpo about ------------------------------- */
            
            .cuerpo-about{
                flex-direction: column;
                height: 70rem;
            }

            .columna-izquierda-cuerpo-about{
                width: 100%;
                height: 18rem;
            }

            .img-about-izquierda{
                display: none;
            }

            .columna-derecha-cuerpo-about{
                width: 100%;
                display: flex;
                align-items: center;
            }
            /* end-about ---------------------------------- */

            .end-about{
                flex-direction: column;
                height: 65rem;
            }
            .columna-izquierda-end-about{
                width: 100%;
            }

            .columna-derecha-end-about{
                width: 100%;
            }

            .bloque2-columna-izquierda-end-about{
                margin-top: 10%;
                margin-bottom: 0%;
            }
        }

        @media (min-width:650px) and (max-width:920px){
            .style-bloque-cabecera{
                font-size: xx-large;
            }

            .style-main-columna-izquierda-cuerpo-about{
                font-size: x-large !important;
            }
            
            .style-main-columna-derecha-cuerpo-about{
                font-size: x-large !important;
            }
        }

        @media (max-width:330px) {

            .bloque-cabecera{
                width: 69vw !important;
            }
            .style-bloque-cabecera{
                font-size: medium !important;;
            }
            .cuerpo-about{
                height: 85rem!important;
            }

            .div-ambiente-columna-derecha-cuerpo-about{
                margin-top: 50%;
            }
        }
    </style>