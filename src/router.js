import {createRouter,createWebHistory} from 'vue-router'
import CoachDetail from './page/coaches/CoachDetail.vue'
import RequestRegister from './page/request/RequestRegister.vue'
import CoachList from './page/coaches/CoachesList.vue'
import Register from './page/coaches/CoacheRegister.vue'
import ContactCoach from './page/request/ContactCoach.vue'
import CoachRegister from './page/coaches/CoacheRegister.vue'
const router=createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',redirect:'coaches'},
        {path:'/coaches', component:CoachList },
        {path:'/coaches/:id', component:CoachDetail,props:true,
        children:{
            path:'contact',component:ContactCoach
        }},
        {path:'/register', component:CoachRegister},
        {path:'/request', component:RequestRegister},
        {path:'/:notFound(.*)',component:null}
    ]
})
export default router;