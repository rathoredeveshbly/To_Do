import React, { Fragment, useState } from 'react'
import Pagination from './Pagination'

const Dashboard = () => {
    const friendListNew = [{ id: 1, name: 'Tom' }, { id: 2, name: 'Jerry' }, { id: 3, name: 'Draco' }]
    const [friendList, setFriendList] = useState(friendListNew)
    const [debounce, setDebounce] = useState()
    const [name, setName] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(10)

    const addFriend = () =>{
        let friendListCopy = [...friendList]
        friendListCopy.push({id:friendList.length+1,name}) 
        setFriendList(friendListCopy)
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
    }

    const searchName = e => {
        let friendListCopy = [...friendList]
        let searchedValue = e.target.value

        clearInterval(debounce);
        let deboucer = setInterval(() => {
            let searchedName
            if (searchedValue) {
                searchedName = searchedValue && friendListCopy.filter(({ name }) => {
                    return name.toLowerCase().includes(searchedValue.toLowerCase())
                });
            } else {
                searchedName = friendListNew
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
            <input placeholder='Enter name to add' onChange={(e)=>setName(e.target.value)}/>
            <button onClick={()=>{addFriend()}}>Add Friend</button>
            {currentFriends.map(friend => {
                return <div key={friend.id} className='row'>
                    <div>
                        <h1>{friend.name}</h1>
                        <p>is your friend.</p>
                    </div>
                    <div className='icons' onClick={() => { handleAction(friend.id, 'favorite') }}>favorite</div>
                    <div className='icons' onClick={() => { handleAction(friend.id, 'delete') }}>Delete</div>
                </div>
            })}
            {currentFriends.length>4 && <Pagination
        postsPerPage={postPerPage}
        totalPosts={friendList.length}
        handlePagination={handlePagination}
        />}
        </div>
    </Fragment>)
}

export default Dashboard