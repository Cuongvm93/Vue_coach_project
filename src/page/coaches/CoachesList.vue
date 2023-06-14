<template>
    <CoachFillter @change-filter="updateFilter"/>
    <section>
        <div class="controll">
            <button>Refresh</button>
            <router-link to="/register">Register as coach</router-link>
        </div>
        <base-card>
        <ul>
            <li>List of coach</li>
        </ul>
        <ul v-if="hascoaches">
            <li v-for="e in filterCoaches"><CoachesItem
                 :key="e.id"
                 :id="e.id"
                 :firstName="e.firstName"
                 :lastName="e.lastName"
                 :areas="e.areas"
                 :rate="e.hourlyRate"
                /></li>
        </ul>
    
        <h3 v-else>Has No Coach</h3>
    </base-card>
    </section>
</template> 
<script>
import CoachesItem from '../../components/Coaches/CoachesItem.vue';
import CoachFillter from '../../components/Coaches/CoachFillter.vue';
export default{
    data(){
        return {
            item:{
                frontEnd:true,
                backEnd:true,
                career:true
            }
        }
    },
    components:{
        CoachesItem,
        CoachFillter
    },
    computed: {
       filterCoaches(){
        const allCoaches=this.$store.getters['coach/coaches']
            console.log(allCoaches)
        const resultFilter= allCoaches.filter(e=>{
            
            if(this.item.frontEnd==true && e.areas.includes('frontend')){
                return true
            }
            if(this.item.backEnd==true && e.areas.includes('backend')){
                return true
            }
            if(this.item.career==true && e.areas.includes('career') ){
                return true
            }
            return false
        })
        return resultFilter
       },
        hascoaches() {
            return this.$store.getters["coach/hasCoaches"];
        }
    },
    methods:{
        updateFilter(updateItem){
            this.item=updateItem
        }
    }
}
</script>
<style scoped>
li{
    list-style: none;
}
</style>