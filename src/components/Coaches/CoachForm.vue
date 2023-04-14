<template>
  <form>
    <div class="form-control">
      <label for="firstName" :class="{invalid: !valid.firstNameValid}">FirstName</label >
      <input type="text" id="firstName" v-model.trim="info.firstName" :class="{invalid: !valid.firstNameValid}"/>
    </div>
    <div class="form-control">
      <label for="lastName" :class="{invalid:valid.lastNameValid}"> Lastname </label>
      <input type="text" id="lastName" v-model.trim="info.lastName" :class="{invalid:!valid.lastNameValid}" />
    </div>
    <div class="form-control">
      <label for="description" :class="{invalid:valid.descValid}">Description</label>
      <textarea
        name=""
        id="description"
        cols="30"
        rows="5"
        v-model.trim="info.description"
        :class="{invalid:valid.descValid}"
      ></textarea>
    </div>
    <div class="form-control">
      <label for="rate" :class="{invalid:valid.rateValid}">Rate</label>
      <input type="number" id="rate" v-model.trim="info.rate" :class="{invalid:valid.rateValid}" />
    </div>
    <base-card>
    <span>
      <input type="checkbox" name="" id="frontend" @change="addAreas($event)" :class="{invalid:valid.checkboxValid}"/>
      <label for="frontend" :class="{invalid:valid.checkboxValid}">FrontEnd</label>
    </span>
    <span>
      <input type="checkbox" name="" id="backend" @change="addAreas($event)" :class="{invalid:valid.checkboxValid}"/>
      <label for="backend" :class="{invalid:valid.checkboxValid}">BackEnd</label>
    </span>
    <span>
      <input type="checkbox" name="" id="career" @change="addAreas($event)" :class="{invalid:valid.checkboxValid}"/>
      <label for="career" :class="{invalid:valid.checkboxValid}">Career</label>
    </span>
    </base-card>
  </form>
  <button @click="submitInfo">Submit</button>
</template>
<script>
import {useVuelidate} from '@vuelidate/core'
import {required} from '@vuelidate/validators'
export default {
  emits: ["save-coach"],
  setup(){
    return { V$:useVuelidate()}
  },
  data() {
    return {
      info: {
        firstName: "",
        lastName: "",
        description: "",
        rate: 0,
        areas: [],

      },
      valid:{
        formValid:true,
        firstNameValid:true,
        lastNameValid:true,
        checkboxValid:true,
        rateValid:true, 
        descValid:true,
      }
    };
  },
  validations(){
    return{
      firstName:{required},
      lastName:{required}
    }
  },
  methods: {
    addAreas(event){
        if (event.target.checked==true) {
            console.log(event.target.id);
            console.log("run");
            this.info.areas.push(event.target.id)
        }else{
            this.info.areas.splice(this.info.areas.indexOf(event.target.id),1)
        }
    },
    validateForm(){
        if(this.info.firstName.length<0){
        console.log(1);
        this.valid.firstNameValid==false
        this.valid.formValid==false
      }
      if(this.info.lastName.length<0){
        console.log(2);
        this.valid.lastNameValid==false
        this.valid.formValid==false
      }
      if(this.info.description.length<0){
        console.log(3);
        this.valid.descValid==false
        this.valid.formValid==false
      }
      if(this.info.rate<0 ){
        console.log(4);
        this.valid.rateValid==false
        this.valid.formValid==false    }
      if (this.info.areas.length<0) {
        console.log(5);
        this.valid.checkboxValid==false
        this.valid.formValid==false
      }
      
    },
    submitInfo() { 
      console.log(this.V$.firstName.$error)
      const infoCoach = {
        id:Math.floor(Math.random()*100),
        firstName: this.info.firstName,
        lastName: this.info.lastName,
        description: this.info.description,
        hourlyRate: this.info.rate,
        areas:this.info.areas
      };
      
      if (this.valid.formValid) {
        this.$emit("save-coach", infoCoach);
        this.$store.commit()
        this.$router.removeRoute('/register')
      }
    },
  },
};
</script>
<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea{
  border: 1px solid red;
}
</style>
