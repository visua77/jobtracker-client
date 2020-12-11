import React from 'react'

const Pagination = (props)=> {

    const pageNumbers = []
    for(let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++){
        pageNumbers.push(i)
    }
    //console.log('totalposts',props.totalPosts)
    //console.log('our numbers', pageNumbers)

    return(
        <nav className="pagination">
            <ul>
                {pageNumbers.map(no => (
                    <a href="#" key={no} onClick={()=>props.paginate(no)}><li className="pagination-no">{no}</li></a>
                ))}
            </ul></nav>
    )
}

export default Pagination