import React,{useState} from 'react'

const Pagination = ({totalPages, handlePagClick, renderflag})=> {
    
    let pages 

    if (renderflag) {
    pages = [...Array(totalPages).keys()].map(num => num+1)
    console.log('from pag',totalPages)
    }

    return(
        <nav className="pagination">
            {pages.map(page =>(
                <button key={page} onClick={()=> handlePagClick(page)}>{page}</button>
            ))}
        </nav>
    )
}

export default Pagination