import React from 'react'
import Header from '../Components/Header/Header'


const Layout = (props) =>{
    return (
        <div style={{backgroundColor:'#EFF2F6',height:'100%'}}>
            <Header />
           <main>
               {props.children}
           </main>

        </div>
    )
}

export default Layout