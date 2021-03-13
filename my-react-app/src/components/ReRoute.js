import React from 'react'
import { useLocation, useHistory } from 'react-router-dom';


const ReRoute = () => {
    let {state} = useLocation();
    let history = useHistory();
    let from = ''
    console.log(state)
    console.log(history)
    if (state === undefined){
        from = '/'
    }
    else{
        from = state.from
    }
    //history.replace(from)
    return(
        <>
            <p>IN Re route</p>
            {history.replace(from)}
        </>
    )
}

export default ReRoute;