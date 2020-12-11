import React,{useEffect,useState,useRef} from 'react'
import ModalSavePost from './ModalSavePost'
import Pagination from './Pagination'
import PuffLoader from "react-spinners/PuffLoader"
import { css } from "@emotion/core"

const override = css`
  display: block;
  margin: 0 auto;
  margin-top:2rem;
`

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)  

const Search = ()=> {
    const [searchres,setSearchRes] = useState([])
    const [renderflag,setRenderFlag] = useState(false)
    const [query,setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const[modaltoggle, setModaltoggle] = useState(false)
    const [post, setPost] = useState({
        title:'',
        description:'',
        status:''
    })
    const api_key= 'YidVXHgwYkwiXHhlYlxucTc1XHgxNVx4ZDJoXHgxMSpceDlhXHg5ZVx4YWF3aFx4YmMn'
    const [postsPerPage, setPostsPerPage]= useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPosts, setCurrentPosts] = useState([])
    const [renderSplice, setRenderSplice] = useState(false)
  

useEffect(()=>{
    
    const apiCall = async ()=>{
    
    await fetch('https://jobsearch.api.jobtechdev.se/search?q=Frontend&limit=64',{
        headers:{'api-key': api_key,
         'accept': 'application/json'}
    })
    .then(res => res.json())
    .then(data => setSearchRes(data))
    
    setRenderFlag(true)
    setIsLoading(false)
    }
    
    apiCall()
    //console.log(searchres)   
},[renderflag])


const handleSubmit = (e)=> {
    e.preventDefault()
    fetch(`https://jobsearch.api.jobtechdev.se/search?q=${query}`,{
        headers:{'api-key': api_key,
         'accept': 'application/json'}
    })
    .then(res => res.json())
    .then(data => setSearchRes(data))

    setIsLoading(false)
}

const handleModal = () => {
    setModaltoggle(prev => !prev )
    //console.log('toggle is',modaltoggle)
    
}

    useEffect(()=>{

        const currPosts = async () =>{

        const indexOfLastPost = currentPage * postsPerPage
        const indexOfFirstPost = indexOfLastPost - postsPerPage
        
        if(renderflag){
        setCurrentPosts(searchres.hits.slice(indexOfFirstPost, indexOfLastPost))
        
        setRenderSplice(true)
        //console.log('currentposts are',currentPosts,renderSplice)
        }
        }
        
        currPosts()

    },[renderflag,renderSplice, currentPage, postsPerPage, searchres])

    const paginate = (number)=> {
        setCurrentPage(number)
    }
    

    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    return(
        <div ref={myRef}>
        <ModalSavePost class={modaltoggle} setModaltoggle={setModaltoggle} post={post} setPost={setPost} />

        {renderflag ? <Pagination postsPerPage={postsPerPage} totalPosts={searchres.hits.length}  paginate={paginate} /> : null}
        
        <h2>Search jobs using the jobtechdev API</h2>
        
        <form onSubmit={handleSubmit}>
            <input type="text"placeholder="Type something..."onChange={(e)=>setQuery(e.target.value)}></input>
            
        </form>

        {isLoading===true ?
            <PuffLoader
            css={override}
            size={250}
            color={"#56ab2fe1"}
            />:null}


        {renderSplice ? <>{currentPosts.map(search => (
        <div className="job-search-card"key={search.id}>
            <p className="search-res"><span className="search-headline">{search.headline}</span><span className="search-comp">{search.employer.name}</span>{search.logo_url ? <span><img src={search.logo_url} className="search-img" alt={search.id}/></span>:null}</p>
            <p className="json-p">{search.description.text}</p>
            <p className="apply"><span className="span-flex"><button className="search-button" onClick={()=> {
                setPost({
                title:search.headline, 
                description: search.description.text, 
                status:'Green'
            })
                handleModal()
                executeScroll()
            }}>Save this job</button> <span className="date">{search.last_publication_date}</span></span><span><a href={search.webpage_url}  className="external-link" target="new">External link &gt;&gt;</a></span></p>
        </div>
        ))}</> : null}

        
        
        </div>
    )
}

export default Search