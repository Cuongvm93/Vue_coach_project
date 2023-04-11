<template>
    <section>Filter</section>
    <section>
        <div class="controll">
            <button>Refresh</button>
            <router-link to="/register">Register as coach</router-link>
        </div>
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
    </section>
</template> 
<script>
import CoachesItem from '../../components/Coaches/CoachesItem.vue';
export default{
    components:{
        CoachesItem
    },
    computed: {
        filterCoaches() {
            console.log(this.$store.getters["coach/coaches"]);
            return this.$store.getters["coach/coaches"];
        },
        hascoaches() {
            return this.$store.getters["coach/hasCoaches"];
        }
    },
    components: { CoachesItem }
}
</script>