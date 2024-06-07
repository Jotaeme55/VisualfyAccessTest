<template>    
	<div style="width:100%;display:flex;justify-content:center;flex-direction:column">	
        <h1>TITULO</h1>
        <Textarea v-model="value1" rows="5" cols="30" />
        <div id="agregar">
            <h1 id="section1">{{section}}.</h1>
        </div>
        <Textarea v-model="value1" rows="5" cols="30" />
        <br>
        <div>
            <Button label="Seccion" icon="pi pi-check" class="p-button-md" @click="anyadirSeccion()"/>
            <Button label="Subseccion" icon="pi pi-check" class="p-button-md" @click="anyadirSubSeccion()"/>
            <br>
            <br>
            <Button label="Large" icon="pi pi-check" class="p-button-lg" @click="sendIndex2Backend"/>
        </div>

        {{value1}}
	</div>
</template>

<script>

export default {
	data() {
        return {
            value1: '',
            section: 1,
            subsection:1,
            subsectionCounter:0
        }
    },
    async created() {
	},
	mounted() {
    },
    methods: {
        //si tienes hasta 3 subsecciones meteremos hasta 3 margenes
        anyadirSeccion(){
            if(this.value1!=""){
                var agregar=document.getElementById("agregar")
                const div1 = document.createElement("h1");
                div1.textContent = this.section+". "+this.value1;    
                agregar.insertAdjacentElement("beforebegin",div1)
                console.log(agregar.innerHTML)
                this.section=this.section+1;
            }

        },
        anyadirSubSeccion(){
            if(this.value1!=""){
                var agregar=document.getElementById("agregar")
                const div1 = document.createElement("h2");
                div1.textContent = this.section+". "+this.subsection+". "+this.value1;    
                agregar.insertAdjacentElement("beforebegin",div1)
                this.subsectionCounter=this.subsectionCounter+1
                this.subsection=this.subsection+1;
            }

        },
    },
	computed: {

	},
    components: {
    }
}
</script>