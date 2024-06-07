<template>
    <div class="layout-topbar ">
        <div class="highbar-topbar">
            <div class="columna-highbar">
                <div class="bloque-rojo">
                    <img id="beelasy-vertical" @load="BeelasyVerticalCargada" style="display: none;" src="images/beelasy_ver.svg" alt="Description of image">
                    <Skeleton :style="{ display: mostrarSkeletonBeelasyVertical ? 'block' : 'none' }" width="13rem" height="8rem"></Skeleton>
                </div>
            </div>
            <div class="columna-highbar">
                <ul class="layout-topbar-menu hidden lg:flex origin-top align-items-center justify-content-left" style="margin-right: 12%;">
                    <li class="mr-5">
                        <i class="pi pi-home" style="font-size: 2rem; color: #1D3557"></i>
                    </li>
                    <li class="mr-5">
                        <h5 >0(000) 000 000</h5>
                    </li>
                    <li class="mr-5">
                        <h5 >L-V 8am-7pm</h5>
                    </li>
                    <li class="mr-10">
                        <h5 >info@support.com</h5>
                    </li>
                </ul>
            </div>
        </div>
        <div class="lowbar-topbar">
            <div class="columna-lowbar"></div>
            <div class="columna-highbar">
                <ul class="layout-topbar-menu hidden lg:flex origin-top align-items-center justify-content-center">
                    <li class="mt-3 ml-8">
                        <router-link to="/">
                            <h4 style="color:white">Inicio</h4>
                        </router-link>
                    </li>
                    <li class="mt-3 ml-8">
                    <router-link to="/precio">
                        <h4 style="color:white">Precio </h4>
                    </router-link>
                    </li>
                    <li class="mt-3 ml-8">
                    <router-link to="/about">
                        <h4 style="color:white" >Nosotros </h4>
                    </router-link>
                    </li>
                    <li class="">
                        <button class="p-link layout-topbar-button ml-8 " @click="handleUser">
                            <i class="pi pi-user"></i>
                        </button>
                    </li>
                    <Menu ref="menu" :model="overlayMenuItems" :popup="true"/>
                    

                    <Dialog header="Confirmación" v-model:visible="displayConfirmationTopBar" :style="{width: '350px'}" :modal="true">
                        <div class="flex align-items-center justify-content-center">
                            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                            <span>¿Seguro que quiere salir?</span>
                        </div>
                        <template #footer>
                            <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text p-button-info" autofocus style="background-color:#1da750; color:white;"/>
                            <Button label="Si" icon="pi pi-check" @click="logout" class="p-button-text p-button-info" style="background-color:#1da750;color:white;"/>
                        </template>
                    </Dialog>
                </ul>
                <div style="margin-left: 30px;">
                    <button class="p-link layout-topbar-menu-button layout-topbar-button mr-3" id="btUsuario" @click="handleUser">
                        <i class="pi pi-user"></i>
                    </button>
                    <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="visibleLeft=true">
                        <i class="pi pi-ellipsis-v"></i>
                    </button>
                </div>
            
                <Sidebar class="sidebar" v-model:visible="visibleLeft" :baseZIndex="1001" >
                    <div class="imagenBeelasy">
                        <img id="beelasy-abeja" @load="BeelasyAbeja" class="imagenBeelasy-img" src="images/favicon.svg" alt="Description of image">
                        <Skeleton :style="{ display: mostrarSkeletonAbeja ? 'block' : 'none' }" width="80%" height="8rem" class="mb-2"></Skeleton>
                    </div>
                    <div style="display:block; align-items: center;">
                        <router-link to="/">
                            <div class="enlace">
                                <i style="font-size:25px;color: white;" class="column-a pi pi-user"></i>
                                <h3 class="Enlaces-sidebar" style="color: white;font-size: 30px;">Inicio </h3>
                            </div>
                        </router-link>
                        <router-link to="/precio">
                            <div class="enlace">
                                <i style="font-size:25px;color: white;" class="column-a pi pi-user"></i>
                                <h3 class="Enlaces-sidebar" style="color: white;font-size: 30px;">Precio </h3>
                            </div>
                        </router-link>
                        <router-link to="/about">
                            <div class="enlace">
                                <i style="font-size:25px;color: white;" class="column-a pi pi-user"></i>
                                <h3 class="Enlaces-sidebar" style="color: white;font-size: 30px;">Nosotros </h3>
                            </div>
                        </router-link>
                    </div>
                </Sidebar>
            </div>
        </div>
    </div>  
</template>


<script>
export default {
    data() {
        return {
            visibleLeft:false,
            displayConfirmationTopBar: false,
            overlayMenuItems: [],
            mostrarSkeletonBeelasyVertical: true,
            mostrarSkeletonAbeja: true,
        }
    },
    mounted(){
        if (this.$store.state.loggedIn) {
            this.overlayMenuItems.push({
                label: 'Log out',
                icon: 'pi pi-sign-out',
                command: () => {this.openConfirmation()}
            })
        }
    },
    methods: {
        BeelasyAbeja(){
            this.mostrarSkeletonAbeja = false;
            const imagen = document.getElementById('beelasy-abeja');
            imagen.style.display = 'block';
        },
        BeelasyVerticalCargada(){
            this.mostrarSkeletonBeelasyVertical = false;
            const imagen = document.getElementById('beelasy-vertical');
            imagen.style.display = 'block';
        },
        topbarImage() {
            return '/images/logo.png';
        }, 
        handleUser(){
            let userId = this.$store.state.userId
            if(userId == ""){
                this.$router.push("/login");
            }else{
                // this.toggleMenu(event)
                this.$router.push("/profile")
            }
            
            
        },
        toggleMenu(event) {
            this.$refs.menu.toggle(event);
        },
        openConfirmation() {
            this.displayConfirmationTopBar = true;
        },
        closeConfirmation() {
            this.displayConfirmationTopBar = false;
        },
        logout() {
            this.closeConfirmation()
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
        }
    },
    computed: {
        darkTheme() {
            return this.$appState.darkTheme;
        }
    },

}
</script>
<style>
    .bloque-rojo{
        position: relative;
        top:0.75rem;
        left: 10rem;
        width: 13rem;
        height: 5rem;

    }

    .sidebar{
        background-color: #1D3557;
    }


    .enlace{
        width: 100%;
        margin-bottom: 40px;
        border: 1px solid #fff;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .Enlaces-sidebar:hover{
        color: #FCC200;
        
    }

    .column-a{
        width: 20%;
        margin-left: 15px;
    }

    .Enlaces-sidebar{
        width:80%;
        padding-bottom: 7px;
    }


    .imagenBeelasy-img{
        margin-top: 20px;
        margin-bottom: 40px;
        width: 80%; 
        height: auto;
    }

    @media (max-width: 990px) {
        .bloque-rojo{
            left: 1rem;
        }
    }
    


    /* RESPONSIVE------------------------------------------------ */
</style>