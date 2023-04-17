import React, { Fragment, useState } from 'react'
import Pagination from './Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { actionsCreators } from './Redux'

const Dashboard = () => {
    const state = useSelector(state=>state.friendList)
    const dispatch = useDispatch()
    const [friendList, setFriendList] = useState(state)
    const [debounce, setDebounce] = useState()
    const [name, setName] = useState('')
    
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(5)

    const addFriend = () =>{
        if(name)
            dispatch(actionsCreators.addFriend(name))  
        setName('')
    }

    const handleAction = (id, type) => {
        let friendListCopy = [...friendList]
        let ind
        friendListCopy.filter((obj, index) => {
            if (obj.id == id) {
                ind = index
            }
        })
        switch (type) {
            case 'favorite':
                let temp = friendListCopy[0]
                friendListCopy[0] = friendListCopy[ind]
                friendListCopy[ind] = temp
                break;
            case 'delete':
                friendListCopy.splice(ind, 1)
                break;
        }
        setFriendList(friendListCopy)
        dispatch({type:'LOCAL_STORAGE',payload:friendListCopy})
    }

    const searchName = e => {
        let friendListCopy = [...state]
        let searchedValue = e.target.value

        clearInterval(debounce);
        let deboucer = setInterval(() => {
            let searchedName
            if (searchedValue) {
                searchedName = searchedValue && friendListCopy.filter(({ name }) => {
                    return name.toLowerCase().includes(searchedValue.toLowerCase())
                });
            } else {
                searchedName = state
            }
            setFriendList(searchedName)
        }, 400)
        setDebounce(deboucer)
    }

    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentFriends = friendList.slice(indexOfFirstPost,indexOfLastPost)

    const handlePagination = pageNumber => setCurrentPage(pageNumber)

    return (<Fragment>
        <div className="container">
            <input placeholder='Enter your friends name' onChange={(e) => { searchName(e) }} />
            <input placeholder='Enter name to add' value={name} onChange={(e)=>setName(e.target.value)}/>
            <button onClick={()=>{addFriend()}}>Add Friend</button>
            {currentFriends.map(friend => {
                return <div key={friend.id} className='row'>
                    <div>
                        <h1>{friend.name}</h1>
                        <p>is your friend.</p>
                    </div>
                    <div className='icons' onClick={() => { handleAction(friend.id, 'favorite') }}>favorite</div>
                    <div className='icons' onClick={()=>{ handleAction(friend.id, 'delete') }}>Delete</div>
                </div>
            })}
            {friendList.length>4 && <Pagination
        postsPerPage={postPerPage}
        totalPosts={friendList.length}
        handlePagination={handlePagination}
        />}
        </div>
    </Fragment>)
}

export default Dashboard