<template>
    <li>
        <h3>{{ fullName }}</h3>
        <h4>${{ rate }}</h4>
        <div>
            <base-badge v-for="e in areas" :key="e" :type="e" :title="e"></base-badge>
        </div>
        <div class="actions">
            <base-button link    mode="outline" :to="contact">Contact</base-button>
            <base-button link  :to="viewDetail">View Detail</base-button>
        </div>
    </li>
</template>
<script>
    export default{
     
        props:['id','firstName','lastName','rate','areas'],
        computed:{
            fullName(){
                return this.firstName +" " + this.lastName
            },
            contact(){
                return this.$route.path + '/'+this.id +'/contact'
            },
            viewDetail(){
                return this.$route.path + '/'+this.id
            }

        }
    }
</script>
<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>