import React, { useState } from 'react'

const Pagination = ({ totalPages, handlePagClick, renderflag }) => {

    let pages

    if (renderflag) {
        pages = [...Array(totalPages).keys()].map(num => num + 1)
        //console.log('from pag', totalPages)
    }

    return (
        <nav className="pagination">
            {pages.map(no => (
                <a href="#" key={no} onClick={() => handlePagClick(no)}><li className="pagination-no">{no}</li></a>
            ))}
        </nav>
    )
}

export default Pagination