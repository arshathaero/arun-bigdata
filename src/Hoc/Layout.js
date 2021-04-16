import React from 'react'
import Header from '../Components/Header/Header'
import {useHistory} from 'react-router-dom'

const Layout = (props) => {
    
    let history = useHistory()
    return (
        <div style={{backgroundColor:'#EFF2F6',height:'100%'}}>
            <Header history={history} />
           <main style={{marginTop:30}}>
               {props.children}
           </main>

        </div>
    )
}

export default Layout