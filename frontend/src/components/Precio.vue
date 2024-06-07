<template>
    <div style="width:100%; ">
        <section class="cabecera-precio" :style="image">
            <div class="bloque-cabecera-precio">
                <div class="main-bloque-cabecera-precio">
                    <p class="style-bloque-cabecera-precio">
                        ¿En qué puedes invertir menos 5€ y que merezca
                        al pena? Nosotros lo hemos investigado y pensamos que invertir en tu futuro
                        es lo más recomendable.
                    </p>
                </div>
            </div>
            <div class="precio-title">
                <p style="font-size: 2.6rem; color: #FCC200;">Más barato de lo que esperas</p>
            </div>
        </section>
        <!-- Cuerpo precio -->
        <section class="cuerpo-precio">
            <div class="cuerpo-precio-columna cuerpo-precio-columna-1">
                <div class="main-cuerpo-precio-columna-1">
                    <h1 style="color: #1d3557;">
                        Por menos de 5 euros.
                    </h1>
                    <br>
                    <p class="style-text-main-precio-columna-1">
                        Después de un intenso estudio de mercado este es el listado con objetos de máximo interés por 5€.
                        <br><br>
                        Por menos de 4,99€ encontramos una braga para el cuello de neopreno 4,79€, una sudadera china para chicas 1,95 €, y una cartera de plástico para caballeros 0,75. 
                        Todo un éxito.
                        <br><br>
                        <b>De modo que tu proyecto a ese precio es un chollazo.</b>
                    </p>
                </div>
            </div>
            <div class="cuerpo-precio-columna cuerpo-precio-columna-2" :style="precio">

            </div>
            <div class="cuerpo-precio-columna cuerpo-precio-columna-3">
                <div class="main-cuerpo-precio-columna-3">
                    <h1 style="color: #1d3557;">
                        ¿Y por qué tan barato?
                    </h1>
                    <br>
                    <p class="style-text-main-precio-columna-3">
                        Bueno, y ¿por qué debería costar mas?.
                        Internet está al alcance de todos, nosotros no inventamos nada, bueno un algoritmo que agiliza los procesos de búsqueda, y lo ponemos tu disposición.
                        <br><br>
                        Simplemente utilizamos nuestros conocimientos y tecnología para que todo sea más fluido, rápido y cómodo para ti.
                    </p>
                </div>
            </div>
        </section>
        <!-- Fin seccion cuerpo precio -->
        <!-- Seccion end precio -->
        <section class="end-precio">
            <div class="end-precio-columna">
                <div class="main-end-precio-columna-1">
                    <div class="bloque-end-precio-columna-1">
                        <h1 style="color: #1d3557;">
                            ¿Varía el precio?
                        </h1>
                        <p class="style-bloque-end-precio-columna-1">
                            Pues verás, no cuesta lo mismo una tarta de medio kilo que una tarta para 50 personas.
                            <br><br>
                            No es lo mismo un trabajo de 10 páginas que uno de 8.500 páginas.
                        </p>
                    </div>
                    <div class="bloque-end-precio-columna-1 bloque-end-precio-columna-1-bloque-2">
                        <h1 style="color: #1d3557;">
                            ¿Esto lo hacen más empresas?
                        </h1>
                        <p class="style-bloque-end-precio-columna-1">
                            No.
                            <br><br>
                            Otras empresas, bajan un trabajo de internet y lo adaptan como mucho.
                            Nuestro algoritmo se nutre de cientos de miles de fuentes para darte un trabajo único
                        </p>
                    </div>
                </div>
            </div>
            <div class="end-precio-columna end-precio-columna-2">
                <div class="main-end-precio-columna-2" :style="end"></div>
            </div>
        </section>
    </div>
    </template>
    
    <script>
    export default {
        data() {
            return {
                image: { backgroundImage: "url(./images/precio.jpg)",  
                "background-size": "cover",  },
                precio: { backgroundImage: "url(./images/cuerpo-precio.jpg)",  
                'background-size': 'contain',
                'background-position': 'center',
                'background-repeat': 'no-repeat',
                },
                end: { backgroundImage: "url(./images/end-precio.jpg)",  
                'background-size': 'contain',
                'background-position': 'center',
                'background-repeat': 'no-repeat',
                },
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
        .cabecera-precio{
            width: 100%;
            height: calc(100vh - 10rem);;
            display: flex;
            flex-direction: column-reverse;
        }

        .bloque-cabecera-precio{
            width: 40%;
            height: 40%;
            background-color: #FCC200;
            margin-left: 6rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .main-bloque-cabecera-precio{
            width: 80%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .style-bloque-cabecera-precio{
            color: black;
            font-size: x-large;
        }
    
        .precio-title{
            margin-left: 6rem;
            margin-bottom: 2rem;
        }
        /* seccioón cuerpo-precio ----------------------------------------- */
        
        .cuerpo-precio{
            width: 100%;
            height: calc(100vh - 10rem);
            display: flex;
        }
        
        .cuerpo-precio-columna{
            width: 33.33%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .main-cuerpo-precio-columna-1{
            width: 90%;
            height: 90%;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }

        .style-text-main-precio-columna-1{
            font-size: larger;
        }

        .main-cuerpo-precio-columna-3{
            width: 90%;
            height: 90%;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }

        .style-text-main-precio-columna-3{
            font-size: larger;
        }
        /* End precio */

        .end-precio{
            width: 100%;
            height: calc(100vh - 10rem);
            display: flex; 
            background-color: #FCC200;
        }

        .end-precio-columna{
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .main-end-precio-columna-1{
            width: 90%;
            height: 90%;
        }
        .bloque-end-precio-columna-1{
            width: 100%;
            height: 50%;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }

        .style-bloque-end-precio-columna-1{
            font-size: larger;
        }

        .main-end-precio-columna-2{
            width: 90%;
            height: 90%;
            
        }

        @media (max-width:900px){
            /* cabecera */

            .cabecera-precio{
                background-position: center;
            }

            .bloque-cabecera-precio{
                width: 70%;
            }

            .style-bloque-cabecera-precio{
                font-size: large !important;;
            }

            /* cuerpo */
            .cuerpo-precio{
                flex-direction: column;
                height: 80rem!important;
            }

            .cuerpo-precio-columna{
                width: 100%;
                
            }

            .main-cuerpo-precio-columna-3{
                margin-bottom: 3rem;
            }

            /* end */

            .end-precio{
                height: 60rem;
                flex-direction: column;
            }

            .end-precio-columna{
                width: 100%;
            }

            .end-precio-columna-2{
                height: 50%;
            }
        }

        @media (max-width:300px){
            .precio-title{
                margin-left: 0rem;
            }

            .bloque-cabecera-precio{
                margin-left: 0rem;
                width: 90%;
            }

            .bloque-end-precio-columna-1-bloque-2{
                margin-top: 2rem;
            }
        }
        
    </style>