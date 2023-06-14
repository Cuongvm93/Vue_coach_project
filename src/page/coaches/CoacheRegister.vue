<template>
    <CoachForm @save-coach="saveCoach"/>
 </template>
 <script>
 import TheHeader from '../../components/layout/TheHeader.vue'
 import CoachForm from '../../components/Coaches/CoachForm.vue'
 export default{
 components:{
     TheHeader,CoachForm
 },
 methods:{
    saveCoach(data){
    this.$store.commit('coach/addCoach',data)
    this.$router.push('/coaches')
    }
 }
 }
 </script>         