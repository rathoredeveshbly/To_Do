import React from 'react'

const Pagination = ({ postsPerPage, totalPosts, handlePagination }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (<div className='pagination'>
        <ul className='list'>
            {pageNumbers.map(number => <li key={number}>
                <a className='link' onClick={() => { handlePagination(number) }}>{number}</a>
            </li>)}
        </ul>
    </div>)
}

export default Pagination