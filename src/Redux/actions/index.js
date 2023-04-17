export const addFriend = (data) =>{
    return (dispatch)=>{
        dispatch({type:'ADD_FRIEND',payload:data})
    }
}

// export const deleteFriend = (data) =>{
//     return (dispatch)=>{
//         dispatch({type:'DELETE_FRIEND',payload:data})
//     }
// }

// export const searchFriend = (data) =>{
//     return (dispatch)=>{
//         dispatch({type:'SEARCH_FRIEND',payload:data})
//     }
// }