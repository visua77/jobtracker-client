import React, { useEffect, useState, useRef } from 'react'
import ModalSavePost from './ModalSavePost'
import Pagination from './Pagination'
import PuffLoader from "react-spinners/PuffLoader"
import { css } from "@emotion/core"

const PAGELIMIT = 15

const override = css`
  display: block;
  margin: 0 auto;
  margin-top:2rem;
`

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

const Search = () => {

    const [renderflag, setRenderFlag] = useState(false)
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [modaltoggle, setModaltoggle] = useState(false)
    const [post, setPost] = useState({
        title: '',
        description: '',
        status: ''
    })
    const api_key = 'YidVXHgwYkwiXHhlYlxucTc1XHgxNVx4ZDJoXHgxMSpceDlhXHg5ZVx4YWF3aFx4YmMn'

    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [totalpages, setTotalPages] = useState(0)

    const [sortedPosts, setSortedPosts] = useState([])
    const [sortedPosts2, setSortedPosts2] = useState([])

    const startIndex = (page - 1) * PAGELIMIT
    //console.log(startIndex, PAGELIMIT)
    //console.log('sorted posts', sortedPosts)


    useEffect(() => {

        const apiCall = async () => {

            await fetch(`https://jobsearch.api.jobtechdev.se/search?q=Frontend&limit=100`, {
                headers: {
                    'api-key': api_key,
                    'accept': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => setPosts(data))

            setRenderFlag(true)

            if (renderflag) {
                //console.log(posts.hits.length)
                setSortedPosts(posts.hits.slice(startIndex, startIndex + PAGELIMIT))
                setTotalPages(Math.ceil(posts.hits.length / PAGELIMIT))
                //console.log('total of pages', totalpages)
            }
            setIsLoading(false)
        }

        apiCall()

    }, [renderflag, totalpages])


    //Handle when user click a pagination no, need to understand what happens here
    const handlePagClick = (num) => {
        setPage(num)
        setSortedPosts(posts.hits.slice(startIndex, startIndex + PAGELIMIT))
        console.log(num, 'pagClick fired!')
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch(`https://jobsearch.api.jobtechdev.se/search?q=${query}&limit=100`, {
            headers: {
                'api-key': api_key,
                'accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setSortedPosts(data.hits))

        if (renderflag) {
            console.log('handleSubmit', sortedPosts2)
        }


        setIsLoading(false)
        //console.log('our posts', posts.hits.length)
    }

    const handleModal = () => {
        setModaltoggle(prev => !prev)
        //console.log('toggle is',modaltoggle)

    }

    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    console.log('handleSubmit', sortedPosts2)

    return (
        <div ref={myRef}>
            <ModalSavePost class={modaltoggle} setModaltoggle={setModaltoggle} post={post} setPost={setPost} />

            {renderflag ? <Pagination totalPages={totalpages} handlePagClick={handlePagClick} renderflag={renderflag} /> : null}

            <h2>Search jobs using the jobtechdev API</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Type something..." onChange={(e) => setQuery(e.target.value)}></input>

            </form>

            {isLoading === true ?
                <PuffLoader
                    css={override}
                    size={250}
                    color={"#56ab2fe1"}
                /> : null}


            {renderflag ? <>{sortedPosts.map(search => (
                <div className="job-search-card" key={search.id}>
                    <p className="search-res"><span className="search-headline">{search.headline}</span><span className="search-comp">{search.employer.name}</span>{search.logo_url ? <span><img src={search.logo_url} className="search-img" alt={search.id} /></span> : null}</p>
                    <p className="json-p">{search.description.text}</p>
                    <p className="apply"><span className="span-flex"><button className="search-button" onClick={() => {
                        setPost({
                            title: search.headline,
                            description: search.description.text,
                            status: 'Green'
                        })
                        handleModal()
                        executeScroll()
                    }}>Save this job</button> <span className="date">{search.last_publication_date}</span></span><span><a href={search.webpage_url} className="external-link" target="new">External link &gt;&gt;</a></span></p>
                </div>
            ))}</> : null}
        </div>
    )
}

export default Search