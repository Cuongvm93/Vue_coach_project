import {createStore} from 'vuex'
import coachStore from './module/Coach/index'
import request from './module/Request/index'
const store=createStore({
    modules:{
        coach:coachStore,
        request: request,
    }
})

export default store;