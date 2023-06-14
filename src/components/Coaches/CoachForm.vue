<template>
  <form>
    <div class="form-control">
      <label for="firstName" >FirstName</label >
      <input type="text" id="firstName" v-model.trim="info.firstName" :class="{invalid_input: V$.info.firstName.required.$invalid && isCheck}"/>
      <span v-if="V$.info.firstName.required.$invalid && isCheck" class="invalid-text">FirstName is not empty!</span>
    </div>
    <div class="form-control">
      <label for="lastName" > Lastname </label>
      <input type="text" id="lastName" v-model.trim="info.lastName" :class="{invalid_input: V$.info.lastName.required.$invalid && isCheck}" />
      <span v-if="V$.info.lastName.required.$invalid && isCheck" class="invalid-text">LastName is not empty</span>
    </div>
    <div class="form-control">
      <label for="description" >Description</label>
      <textarea
        name=""
        id="description"
        cols="30"
        rows="5"
        v-model.trim="info.description"
        :class="{invalid_input: V$.info.description.required.$invalid && isCheck}"
        @input="handleInput"
      ></textarea>
      <span v-if="V$.info.description.required.$invalid && isCheck" class="invalid-text">Description is not empty!</span>
      <span v-if="!V$.info.description.minValue.$response && isCheck" class="invalid-text">Description min 20 characters</span>
    </div>
    <div class="form-control">
      <label for="rate" >hourlyRate</label>
      <input type="number" id="rate" v-model.trim="info.hourlyRate"    />
    </div>
    <base-card>
    <span>
      <input type="checkbox" name="" id="frontend" @change="addAreas($event)" />
      <label for="frontend" >FrontEnd</label>
    </span>
    <span>
      <input type="checkbox" name="" id="backend" @change="addAreas($event)" />
      <label for="backend" >BackEnd</label>
    </span>
    <span>
      <input type="checkbox" name="" id="career" @change="addAreas($event)" />
      <label for="career">Career</label>
    </span>
    </base-card>
    <span v-if="V$.info.areas.required.$invalid && isCheck" class="invalid-text"> Must choice at least 1 skill</span>
  </form>
  <button @click="submitInfo">Submit</button>
</template>
<script>
import {useVuelidate} from '@vuelidate/core'
import {required, minLength, minValue} from '@vuelidate/validators'
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
        hourlyRate: 0,
        areas: [],

      },
      isCheck: false
    };
  },
  validations(){
    return{
     info:{
      firstName: {required},
      lastName: {required},
      description: {required, minValue: minLength(20)},
      areas: {required}
     }
    }
  },
  computed:{
    isEnableSubmit(){
      return (
        !this.V$.info.firstName.required.$invalid &&
        !this.V$.info.lastName.required.$invalid &&
        !this.V$.info.description.required.$invalid &&
        this.V$.info.description.minValue.$response &&
        !this.V$.info.areas.required.$invalid
      )
    }
  },
  methods: {
    addAreas(event){
        if (event.target.checked==true) {
          this.info.areas.push(event.target.id)
        }else{
            this.info.areas.splice(this.info.areas.indexOf(event.target.id),1)
        }
    },
  
    submitInfo() { 
      this.isCheck = true
      if(this.isEnableSubmit){
        this.$emit('save-coach',this.info)
      }
      
      // if (this.valid.formValid) {
      //   this.$emit("save-coach", infoCoach);
      //   this.$store.commit()
      //   this.$router.removeRoute('/register')
      // }
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

.invalid-text{
  color: red
}
.invalid_input {
  border:1px solid red;
}
.invalid textarea{
  border: 1px solid red;
  background-color: red
}
</style>
