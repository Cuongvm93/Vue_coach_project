import { getField, updateField } from "vuex-map-fields"
export default{
    namespaced:true,
    state(){
        return{
            infoCoach:{
                firstName:"eqweqwe",
                lastName:'',
                areas:[],
                description:'',
                hourlyrate:''
            }
        }
    },
    getters:{
        getField,
    },
    mutations:{
        updateField,
        
    }
}