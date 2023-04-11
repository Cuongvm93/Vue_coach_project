import {createStore} from 'vuex'
import axios from 'axios'
import coachStore from './module/Coach/index'
const store=createStore({
    modules:{
        coach:coachStore,
    }
})

export default store;