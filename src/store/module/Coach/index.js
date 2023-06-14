export default{
    namespaced  :true,
    state(){
        return{
            coach:[
                {
                  id: 'c1',
                  firstName: 'Maximilian',
                  lastName: 'Schwarzmüller',
                  areas: ['frontend', 'backend', 'career'],
                  description:
                    "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                  hourlyRate: 30
                },
                {
                  id: 'c2',
                  firstName: 'Julie',
                  lastName: 'Jones',
                  areas: ['frontend', 'career'],
                  description:
                    'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                  hourlyRate: 30
                }
              ]
        }
    },
    mutations:{
      addCoach(state,payload){
        const data = {...payload, id :'c' +(state.coach.length+1)}
        state.coach.push(data)
      }
    },
    getters:{
        coaches(state){
            return state.coach
        },
        hasCoaches(state){
            return state.coach && state.coach.length >0
        }
    },
    actions:{}
}