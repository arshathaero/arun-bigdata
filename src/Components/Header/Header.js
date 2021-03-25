import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Container from 'react-bootstrap/Container'

const Header =() =>{

    let iconColor = 'rgb(214 60 131)'

    let pathname= window.location.pathname
    return(
        <div style={{paddingTop:30}}>
            <Container fluid>
                <Row>
                    <Col sm={2} md={3} lg={4}>
                    </Col>
                    <Col xs={12} sm={8} md={6} lg={4}>
                    <div className={classes.mainDiv}>
            {/* <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/search'>Search</NavLink></li>

                <li><NavLink to='/pinboard'>Pinboard</NavLink></li>

                <li><NavLink to='/insights'>Insights</NavLink></li>

            </ul> */}
            <li><NavLink exact  activeStyle={{backgroundColor:iconColor,padding:10,borderRadius:'50%',color:'white',fontSize:18}} to='/'><i id={pathname != '/' && classes.icon}   style={{fontSize:22}} class="fas fa-home"></i></NavLink></li>
                <li><NavLink activeStyle={{backgroundColor:iconColor,padding:'13px 10px 8px 10px',borderRadius:'50%',color:'white'}} to='/search'><i id={pathname != '/search' && classes.icon}  style={{fontSize:22}} class="fas fa-search"></i></NavLink></li>

                <li><NavLink activeStyle={{backgroundColor:iconColor,padding:'13px 10px 8px 10px',borderRadius:'50%',color:'white'}} to='/pinboard'><i id={pathname != '/pinboard' && classes.icon}   style={{fontSize:22,padding:'0 3px'}} class="fas fa-clipboard-list"></i></NavLink></li>

                <li><NavLink activeStyle={{backgroundColor:iconColor,padding:'13px 10px 8px 10px',borderRadius:'50%',color:'white'}} to='/insights'><i id={pathname != '/insights' && classes.icon}   style={{fontSize:22}} class="fas fa-chart-line"></i></NavLink></li>
            </div>
                    </Col>
                    <Col sm={2} md={3} lg={4}>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}

// #d63cca
export default Header