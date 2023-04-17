const friendReducer = (state=[{ id: 1, name: 'Tom' }],action) =>{
    switch(action.type) {
        case 'ADD_FRIEND':
           state.push({id:state[state.length-1].id+1,name:action.payload})
           return state
        // case 'DELETE_FRIEND': 
        //    state.splice(action.payload,1)
        //    return state
        // case 'SEARCH_FRIEND':
        //     state.filter(({ name }) => name.toLowerCase().includes(action.payload.toLowerCase()))
        //     return state
        case 'LOCAL_STORAGE':
            return action.payload    
        default:
          return state;
      }
}

export default friendReducer