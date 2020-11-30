import React,{useEffect,useState} from 'react'

const Search = ()=> {
    const [searchres,setSearchRes] = useState([])
    const [renderflag,setRenderFlag] = useState(false)
    const [query,setQuery] = useState('')
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
}

    return(
        <div>
        <h2>Search jobs using the jobtechdev API</h2>
        
        <form onSubmit={handleSubmit}>
            <input type="text"placeholder="Type something..."onChange={(e)=>setQuery(e.target.value)}></input>
        </form>


        {renderflag ? <>{searchres.hits.map(search => (
        <div className="job-search-card">
            <p className="search-res"><span className="search-headline">{search.headline}</span><span>{search.employer.name}</span>{search.logo_url ? <span><img src={search.logo_url} className="search-img"/></span>:null}</p>
            <p className="json-p">{search.description.text}</p>
            <p className="apply"><span>Apply for this job: {search.last_publication_date}</span><span><a href={search.webpage_url}  className="external-link" target="new">External link &gt;&gt;</a></span></p>
        </div>
        ))}</> : null}
        
        
        </div>
    )
}

export default Search