<template>
    <section>
        <base-card>
      <h2>  {{  fullName }}</h2>
        <p>${{ rate }}/hour</p>
    </base-card>
    <base-card>
    <h3>Interested? Reach out now!</h3>
    <base-button link>Contact</base-button>
    <router-view></router-view>
    </base-card>
    <base-card>
        <base-badge v-for="e in ereas" :title="e" :type="e" :key="e"></base-badge>
        <p>{{ description}}</p>
    </base-card>
    </section>
</template>
<script>
export default{
    props:['id'],
    data(){
        return {
            infomation:null,
        }
    },
    created(){
        this.infomation=this.$store.getters['coach/coaches'].find((e)=>e.id==this.id)
    },
    computed:{
        fullName(){
            return this.infomation.firstName + " "+ this.infomation.lastName
        },
        rate(){
            return this.infomation.hourlyRate
        },
        ereas(){
            return this.infomation.areas
        },
        description(){
            return this.infomation.description
        }
    }
}
</script>
