<template>

    <div class="flex align-items-center justify-content-center overflow-hidden mt-5 mb-5" >
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <!-- <img :src="topbarImage()" alt="Logo" class="mb-5"> -->
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, white, #18042c 30%);">
                <div class="h-full w-full m-0 py-7 px-4" :style="'border-radius:53px; background: #b6ccde'">
                    <div class="text-center mb-5">
                        <img :src="topbarImage()" alt="Logo" class="mb-3" width="100">
                        <div class=" font-medium mb-3" style="font-size:2rem; color:#18042c; font-family: 'Montserrat';">¡Bienvenido a Beelasy!</div>
                        <span class="text-900 font-medium" style="font-size:medium; color:#18042c; font-family: 'Montserrat';">Inicia sesión para continuar</span>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="emailId" class="block text-900 text-xl mb-2" style="font-size:1.2rem; color:#18042c; font-family: 'Montserrat';">Añade tu email</label>
                        <InputText v-model="email" name="email" id="emailId" @keypress.enter="signIn()"
                        :class="{'p-invalid': submitted && error.field === 'email'} + '; w-full mb-2'" placeholder="Email" style="padding:1rem;" />
                        <small class="p-error" v-if="submitted && error.field === 'email'" :key="error.message">{{error.message}}</small>
                
                        <label for="passwordId" class="block text-900 text-xl mt-2 mb-2" style="font-size:1.2rem; color:#18042c; font-family: 'Montserrat';">Contraseña</label>
                        <Password v-model="password" name="password" id="passwordId" :feedback="false" @keypress.enter="signIn()" 
                        :class="{'p-invalid': submitted && error.field === 'password'}" placeholder="Contraseña" :toggleMask="true"
                        class="w-full mb-2" inputClass="w-full" inputStyle="padding:1rem" />
                        <small class="p-error" v-if="submitted && error.field === 'password'">{{error.message}}</small>

                        <div class="flex align-items-center justify-content-between mb-3 mt-2">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1" class="text-900">Recuérdame</label>
                            </div>
                            <!-- <a class="font-medium no-underline ml-2 text-right cursor-pointer text-900">¿Has olvidado la contraseña?</a> -->
                        </div>

                        <small class="p-error" v-if="submitted && error.message === 'Missing credentials'">¡Algunos campos están en blanco!</small>

                        <div class="grid justify-content-around mt-5">
                            <Button type="button" icon="pi pi-check" label="Iniciar sesión" class="p-3 text-xl text-900 col-12 md:col-5 mt-2" 
                            @click="signIn()" style="background-color:var(--surface-card)"/>
                            <Button type="button" icon="pi pi-user-plus" label="Registrarse" class="p-3 text-xl text-900 col-12 md:col-5 mt-2" 
                            @click="signUp()" style="background-color:var(--surface-card)" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from "../service/UserService";
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import axios from "axios";
export default {
    name: 'Login',
    components: {
    InputText,
    Password,
    Button,
    },
    created() {
        this.userService = new UserService;
        if (this.loggedIn) {
            this.$router.push("/");
        }
    },
    data() {
        return {
            error: {},
            submitted: false,
            email: this.$store.state.email,
            password: this.$store.state.password,
            grados: 1,
            checked: false
        }
    },
    userService: null,
    mounted() {
        setInterval(this.cambiaGrados, 20)
    },
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        }
    },
    methods: {
        topbarImage() {
            return '/images/favicon.svg';
        },
        cambiaGrados() {
            if (this.grados >= 360) {
                this.grados = 0
            } else {
                this.grados++
            }
        },
        signIn() {
            this.submitted = true
            this.$store.dispatch("saveEmail", this.email);
            this.$store.dispatch("savePassword", this.password);
            
            axios.post('/auth/login', {username: this.email, password: this.password})
            .then((response) => {
                let data = JSON.parse(this.userService.descifrarUsuarioYGuardar(response.data))
                this.$store.dispatch("saveEmail", this.email);
                this.$store.dispatch("saveUserId", data.userId);
                this.$store.dispatch("saveToken", data.token);
                this.$store.dispatch("logIn");
                this.$router.push(this.$store.state.lastPage)
                this.$toast.add({severity:'success', summary: 'Successful', detail: 'Inicio de sesión correcto', life: 3000});
            }).catch(err => {
                this.error = err.response
            })    
        },
        signUp() {
            this.$router.push({name:'register'});
        }
    },
}
</script>

<style>

</style>
