import React,{useEffect,useState} from 'react'
import PuffLoader from "react-spinners/PuffLoader"
import { css } from "@emotion/core"

const override = css`
  display: block;
  margin: 0 auto;
  margin-top:2rem;
`;

const Search = ()=> {
    const [searchres,setSearchRes] = useState([])
    const [renderflag,setRenderFlag] = useState(false)
    const [query,setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const api_key= 'YidVXHgwYkwiXHhlYlxucTc1XHgxNVx4ZDJoXHgxMSpceDlhXHg5ZVx4YWF3aFx4YmMn'

useEffect(()=>{
    
    const apiCall = async ()=>{
    
    await fetch('https://jobsearch.api.jobtechdev.se/search?q=Frontend',{
        headers:{'api-key': api_key,
         'accept': 'application/json'}
    })
    .then(res => res.json())
    .then(data => setSearchRes(data))
    
    setRenderFlag(true)
    setIsLoading(false)
    }
    
    apiCall()
    console.log(searchres)   
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

    return(
        <div>
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


        {renderflag ? <>{searchres.hits.map(search => (
        <div className="job-search-card">
            <p className="search-res"><span className="search-headline">{search.headline}</span><span className="search-comp">{search.employer.name}</span>{search.logo_url ? <span><img src={search.logo_url} className="search-img"/></span>:null}</p>
            <p className="json-p">{search.description.text}</p>
            <p className="apply"><span>Apply for this job: {search.last_publication_date}</span><span><a href={search.webpage_url}  className="external-link" target="new">External link &gt;&gt;</a></span></p>
        </div>
        ))}</> : null}
        
        
        </div>
    )
}

export default Search