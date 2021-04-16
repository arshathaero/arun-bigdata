import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Container from 'react-bootstrap/Container'
import { color } from '../../Shared/Utility'
import { useDispatch } from 'react-redux'
import * as actions from '../../Store/Action/index'
const Header = (props) => {
    let dispatch = useDispatch()
    let token = localStorage.getItem('token')

    // let color = '#D63D83'

    let pathname = window.location.pathname
    



    const logoutHanlder = () => {
        dispatch(actions.logout())
        window.location.href= '/'
}

    return(
        <div style={{paddingTop:30}}>
            <Container fluid>
                <Row>
                    <Col  md={3} lg={4}>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                    <div className={classes.mainDiv}>
            {/* <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/search'>Search</NavLink></li>

                <li><NavLink to='/pinboard'>Pinboard</NavLink></li>

                <li><NavLink to='/insights'>Insights</NavLink></li>

            </ul> */}
            <li><NavLink exact  activeStyle={{backgroundColor:color,padding:10,borderRadius:'50%',color:'white',fontSize:18}} to='/'><i id={pathname != '/' && classes.icon}   style={{fontSize:22}} class="fas fa-home"></i></NavLink></li>
                <li><NavLink activeStyle={{backgroundColor:color,padding:'13px 10px 8px 10px',borderRadius:'50%',color:'white'}} to='/search'><i id={pathname != '/search' && classes.icon}  style={{fontSize:22}} class="fas fa-search"></i></NavLink></li>

                <li><NavLink activeStyle={{backgroundColor:color,padding:'13px 10px 8px 10px',borderRadius:'50%',color:'white'}} to='/pinboard'><i id={pathname != '/pinboard' && classes.icon}   style={{fontSize:22,padding:'0 3px'}} class="fas fa-clipboard-list"></i></NavLink></li>

                <li><NavLink activeStyle={{backgroundColor:color,padding:'13px 10px 8px 10px',borderRadius:'50%',color:'white'}} to='/insights'><i id={pathname != '/insights' && classes.icon}   style={{fontSize:22}} class="fas fa-chart-line"></i></NavLink></li>
            </div>
                    </Col>
                    <Col  md={3} lg={4}>
                        {token &&
                            <div>
                              <div onClick={logoutHanlder}  style={{ float: 'right',boxShadow:'0 0 5px rgb(62 195 165)',cursor:'pointer',display:'flex',margin: 10, backgroundColor: 'rgb(62 195 165)', padding: '5px 20px', color: 'white', borderRadius: 20, fontWeight: 'bold',height:35 }}>
                                <p >Logout</p>
                                <i style={{ fontSize: 20,marginTop:2,marginLeft:10}} className="fas fa-sign-out-alt"></i>
                            </div>
                            <div onClick={()=>props.history.push('/profile')}  style={{ float: 'right',boxShadow:`0 0 5px ${color}`,cursor:'pointer',display:'flex',margin: 10, backgroundColor: color, padding: '5px 20px', color: 'white', borderRadius: 20, fontWeight: 'bold',height:35 }}>
                                <p >cdscsdgdsgsf</p>
                                <i style={{ fontSize: 20,marginTop:2,marginLeft:10}} className="fas fa-long-arrow-alt-right"></i>
                            </div>

                            </div>
                          }
                            
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}

// #d63cca
export default Header