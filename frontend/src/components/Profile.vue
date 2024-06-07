<template>
<div class="profile-app" style="width:100%; height:100vh; ">
    <Button :style="{ display: !mostrarMainTopBar ? 'none' : 'block' }" @click="displayMainTopBar()" class="display-main-topbar"> <i class="logout-pi pi pi-sign-out mr-2" style="font-size: 2rem;"></i></Button>
    <div class="main-topbar" :style="{ display: !mostrarMainTopBar ? 'flex' : 'none' }">
        <div class="logout mr-5" style="display: flex; align-items: center;" @click="displayLogOut=true">
            <i class="logout-pi pi pi-sign-out mr-2" style="font-size: 2rem;"></i>
            <p class="logout-p" style="font-size: large;">Cerrar sesión</p>
            
        </div>
        <div class="removeAccount ml-5" style="display: flex; align-items: center;" @click="displayRemoveAccount=true">
            <i class="removeAccount-pi pi pi-user-minus mr-2" style="font-size: 2rem"></i>
            <p class="removeAccount-p" style="font-size: large">Borrar cuenta</p>
        </div>
    </div>
    <section class="cabecera-profile" :style="image">
        <div class="tesoros">
            <p style="font-size: 2.6rem; color: #FCC200;">Tus Tesoross</p>
        </div>
        
    </section>
    <section>
        <div class="cabecera-dataview" style="background-color: #f5f5dc;">
            <div class="Titulo-cabecera-dataview">
                <h1 style="font-size: 300%;">Pedidos</h1>
            </div>
            <div class="agrupacion-buscador-orden">
                <div class="buscador-dataview">
                    <p style="font-size: large;">Busca tu proyecto</p>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText @input="buscarProject()" v-model="searchProject" placeholder="Search" />
                    </span>
                </div>
                <div class="orden-creation-dataview">
                    <p style="font-size: large;">Ordenar por:</p>
                    <Dropdown @change="changeOrder()" v-model="selectedOrden" :options="orden"  placeholder="orden">
                        <template #value="slotProps">
                            <div v-if="slotProps.value">
                                {{slotProps.value}}
                            </div>
                            <span v-else>
                                {{slotProps.placeholder}}
                            </span>
                        </template>
                    </Dropdown>
                </div>
            </div>

        </div>
        <DataView :value="projects" :style="{ display:projects==null || projects==undefined || projects.length===0 ? 'none' : 'block' }">
            <template #list="slotProps">
						<div class="bloque-dataview-profile col-12">
							<div class="flex flex-column md:flex-row align-items-center p-3 w-full" style="background-color: lightgray;">
								<div class="flex-1 text-center md:text-left">
									<div class="font-bold text-2xl ml-4">
										{{ slotProps.data.title }} 
									</div>
                                </div>
                                <div class="flex-1 text-center md:text-right mr-4">
									<div class="mb-3">
										{{ transformarFecha(slotProps.data.creationDate) }}
									</div>
								</div>
							</div>
                            <div class="flex flex-column md:flex-row align-items-center p-3 w-full">
								<div class="flex-1 text-center md:text-center" >
                                    <div class="mb-3">
                                        <Button @click="console.log('hola mundo')">Descargar demo</Button>
                                    </div>
                                    <div class="mb-3">
                                        <Button v-if="slotProps.data.payed===true" @click="console.log('hola mundo')">Descargar demo</Button>
                                        <Button v-else @click="console.log('hola mundo')">Descargar trabajo</Button>
                                    </div>
								</div>
							</div>
						</div>
					</template>
        </DataView>
    </section>
</div>

<Dialog v-model:visible="displayLogOut" modal header="¿Estás seguro que quieres cerrar sesión?" :style="{ width: '50vw' }">
        <div style="display: flex; justify-content: center; flex-direction:column">
            <div style="display: flex; justify-content: center;">
                <i class="pi pi-exclamation-triangle" style="font-size: 4rem; color: #FCC200;"></i>
            </div>
            <div class="mt-2">
                <Button class="mr-2" label="Si" icon="pi pi-check" @click="logout" style="background-color:#1D3557;color:white;"/>
            </div>
        </div>
    </Dialog>

    <Dialog v-model:visible="displayRemoveAccount" modal header="¿Estás seguro que quieres borrar la cuenta?" :style="{ width: '50vw' }">
        <div style="display: flex; justify-content: center; flex-direction:column">
            <div style="display: flex; justify-content: center;">
                <i class="pi pi-exclamation-triangle" style="font-size: 4rem; color: #FCC200;"></i>
            </div>
            <div class="mt-2">
                <Button class="mr-2" label="Si" icon="pi pi-check" @click="removeAccount" style="background-color:#1D3557;color:white;"/>
            </div>
        </div>
    </Dialog>

</template>

<script>
import UserService from '../service/UserService';
import PaymentService from '../service/PaymentService';
export default {
	data() {
        return {
            image: { backgroundImage: "url(./images/background_profile.jpg)",  
                "background-size": "cover",  },
            displayLogOut: false,
            displayRemoveAccount:false,
            projects:null,
            orden:["Más recientes","Más antiguos"],
            selectedOrden:"Más recientes",
            searchProject:"",
            projectsOriginal:null,
            mostrarMainTopBar:true,
        }
        
    },
    UserService:null,
    PaymentService:null,
    async created() {
        this.userService = new UserService;
        this.paymentService = new PaymentService;
	},
	async mounted() {
        const response = await this.paymentService.getProjectsFromUser(this.$store.state.userId);
        console.log(response)
        if(response.status!=200){
            this.$toast.add({
                            severity: 'error',
                            summary: 'Actualmente hay un error en el servidor y no podemos importar tus trabajos, vuelve en un rato',
                            life: 3000
                        });
        }else{
            this.projects = response.data.proyectos
            this.projectsOriginal = response.data.proyectos
        }

    },
    methods: {
        displayMainTopBar(){
            this.mostrarMainTopBar=false
        },
        transformarFecha(fechaISO) {
            const fecha = new Date(fechaISO);
            const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
            const opcionesHora = { hour: 'numeric', minute: 'numeric' };

            const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
            const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);

            return `${fechaFormateada}, ${horaFormateada}`;
        },
        buscarProject(){
            this.projects = this.projectsOriginal.filter(a => a.title.includes(this.searchProject))
        },
        changeOrder(){
            if(this.selectedOrden === "Más recientes"){
                this.projects = this.projects.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
            }else{
                this.projects = this.projects.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate))
            }
        },
        logout() {
            this.$store.dispatch("saveEmail", '');
            this.$store.dispatch("savePassword", '');
            this.$store.dispatch("saveUserId", '');
            this.$store.dispatch("logOut");
            this.axios.post('/auth/logout')
            .catch((err) => {
                console.error("Error: ", err);
            });
            this.$router.push("/login");
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Cierre de sesión correcto', life: 3000});
        },
        async removeAccount() {
            try{
                await this.userService.deleteUser(this.$store.state.userId, this.$store.state.token)
                this.$store.dispatch("saveEmail", '');
                this.$store.dispatch("savePassword", '');
                this.$store.dispatch("saveUserId", '');
                this.$store.dispatch("logOut");
                this.axios.post('/auth/logout')
                    .catch((err) => {
                        console.error("Error: ", err);
                    });
                this.$router.push("/login");
                this.$toast.add({severity:'success', summary: 'Successful', detail: 'Cierre de sesión correcto', life: 3000});
            }catch{
                this.$toast.add({severity:'danger', summary: 'Failure', detail: 'Ha habido un error, inténtalo más tarde', life: 3000});
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
    .logout:hover  .logout-pi{
        cursor: pointer;
        color: #FCC200 !important;
    }
    .logout:hover  .logout-p{
        cursor: pointer;
        color: #FCC200 !important;
    }
    .removeAccount:hover  .removeAccount-pi{
        cursor: pointer;
        color: #FCC200 !important;
    }
    .removeAccount:hover  .removeAccount-p{
        cursor: pointer;
        color: #FCC200 !important;
    }

    .display-main-topbar{
        width: 4.5rem;
        height: 4.5rem;
        position: fixed;
        left: 80%;
        z-index: 1001;
        margin-top: 10px;
        border-radius: 100%;
        background-color: #FCC200;
    }

    .main-topbar{
        width: 40%;
        height: 4.7rem;
        position: fixed;
        left: 30%;
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        background-color: rgba(187,196,187,255);
    }

    .cabecera-profile{
        width: 100%;
        height: 50vh;
        background-color: white;
        position: relative;
    }

    .tesoros{
        width: 50%;
        height: 100px;
        position:absolute;
        bottom: 0;
        left: 10%;
    }

    .cabecera-dataview{
        width: 100%;
        height: 9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .Titulo-cabecera-dataview{
        width: 33%;
        /* height: 100%; */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .agrupacion-buscador-orden{
        width: 66%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .buscador-dataview{
        /* width: 33%;
        height: 100%; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .orden-creation-dataview{
        /* width: 33%;
        height: 100%; */
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .pedido{
        width: 100%;
        height: 25%;
    }

    .cabecera-dataview{
        border-bottom: 2px solid #1D3557 !important;
    }

    .bloque-dataview-profile{

        border-bottom: 2px solid #1D3557 !important;
    }

    @media (max-width: 990px) {
        .profile-app{
            height: auto !important;
        }

        .tesoros{
            margin-bottom: 10px;
        }

        .cabecera-dataview{
            flex-direction: column;
            height: 12rem;
        }

        .agrupacion-buscador-orden{
            margin-bottom: 10px;
        }

        .orden-creation-dataview{
            margin-left: 10px;
        }
    }

    @media only screen and (min--moz-device-pixel-ratio: 2),
       only screen and (-o-min-device-pixel-ratio: 2/1),
       only screen and (-webkit-min-device-pixel-ratio: 2),
       only screen and (min-device-pixel-ratio: 2),
       only screen and (min-resolution: 192dpi),
       only screen and (min-resolution: 2dppx) {
        .main-topbar {
            width: 100%;
            left: 0;
        }
    }
</style>