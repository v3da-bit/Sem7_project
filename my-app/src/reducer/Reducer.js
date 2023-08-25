export const initialState=NaN
export const Reducer=(state,action)=>{
    console.log(action.payload)
    if (action.type==='USER') {
        return action.payload
        
    }
    if(action.type==='ADMIN'){
        return action.payload
    }
    return state
}
