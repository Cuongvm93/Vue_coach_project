import {createRouter,createWebHistory} from 'vue-router'
import CoachDetail from './page/coaches/CoachDetail.vue'
import RequestRegister from './page/request/RequestRegister.vue'
import CoachList from './page/coaches/CoachesList.vue'
import Register from './page/coaches/CoacheRegister.vue'
const router=createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',redirect:'coaches'},
        {path:'/coaches', component:CoachList },
        {path:'/coaches:id', component:CoachDetail,children:{
            path:'contact',component:null
        }},
        {path:'/register', component:Register},
        {path:'/request', component:RequestRegister},
        {path:'/:notFound(.*)',component:null}
    ]
})
export default router;