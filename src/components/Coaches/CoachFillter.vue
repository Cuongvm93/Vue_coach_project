<template>
    <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
        <input type="checkbox" checked id="frontEnd" @change="change($event)">
        <label for="frontend">FrontEnd</label>
    </span>
    <span class="filter-option">
        <input type="checkbox" checked id="backEnd" @change="change($event)">
        <label for="frontend">BackEnd</label>
    </span>
    <span class="filter-option">
        <input type="checkbox" checked id="career" @change="change($event)">
        <label for="frontend">Career</label>
    </span>
    </base-card>
</template>
<script>
export default{
    emits:['change-filter'],
    data(){
        return {
           fillterItem:{
            frontEnd:true,
            backEnd:true,
            career:true
        }
           }
    },
    methods:{
        change(event){
            const item=event.target.id;
            const check=event.target.checked;
            const updateFilter={...this.fillterItem,[item]:check}
            this.fillterItem=updateFilter;
            this.$emit('change-filter',updateFilter)
        }
    }
}
</script>
<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>