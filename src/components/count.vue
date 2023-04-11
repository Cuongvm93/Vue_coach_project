
<template>
    <h1>count:{{$store.state.count }}</h1>
    <button @click="$store.commit('increment')"> + </button>
    <button @click="$store.commit('decrement')"> - </button>
    <button @click="fetchdata"> fetchData </button>

</template>

<script scoped>
import {mapActions} from 'vuex'
console.log(13132);
export default{
    data(){
        return{
            count:0
        }
    },
    methods:{
        ...mapActions([
            'fetchdata'
        ])
    },


    }
</script>
<style>

</style>