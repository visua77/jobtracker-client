import React from 'react'

const ErrorMsg = (props)=> {
    return(
        <div className="error-message"><span>{props.message}</span><button onClick={props.clearError}>x</button></div>
    )
}

export default ErrorMsg