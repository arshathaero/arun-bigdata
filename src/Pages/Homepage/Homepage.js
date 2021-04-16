import React, { useEffect, useState } from 'react'
import classes from './Homepage.module.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

import Container from 'react-bootstrap/Container'

import listData from '../../Data/listData.json'

import axios from '../../axios'

import {color,getUser} from '../../Shared/Utility'

const Homepage = () => {
    

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState()
    const [error, setError] = useState()
    let a = [1, 2, 3]
    
    useEffect(() => {
        setLoading(true)
        getUser().then(user => {
            setUserData(user)
            axios.get('/data', {
                headers: {
                    Authorization: `Bearer ${user.token}`, //the token is a variable which holds the token
                },
            
            }).then(res => {
                console.log(res)
                setData(res.data)
                setLoading(false)
            })
        })

    
    }, [])
    

    useEffect(() => {
        if (error) {
            alert(error)
            setError(null)
        }
    },[error])


    const fileHandler = (e) => {
    console.log('sds')
    let file = e.target.files[0];
    console.log(file)

    let data =  new FormData();
    data.append('defaultFile', file)
    data.append('fileName',file.name)

    
    setLoading(true)
    axios.post('/data/', data, {
        headers: {
            Authorization: `Bearer ${userData.token}`, //the token is a variable which holds the token
          },
    
    }).then(res => {
        console.log(res)
        
        setLoading(false)
        e.target.value = ''
    }).catch(err => {
        console.log(err.response)
        setError(err.response.data.fileName)
        setLoading(false)
        e.target.value = ''
    

    })
    };
    


    const deleteDataHandler = (id) => {
        axios.delete('/')
    }

    let displayData = data &&  data.length ? data.map(element => (
        <Col xs={6} sm={5} md={4} lg={3}>
            
              <div style={{boxShadow:'0 0 10px #a8a8a8',backgroundColor:'#EFF2F6',borderRadius:10,height:'auto',marginTop:20,padding:10,color:'white'}}>
              <Row style={{margin:'15px 5px 0 5px'}}>
                      <Col xs={9} md={9} lg={10}><p style={{textOverflow:'ellipsis',whiteSpace:'nowrap',overflow:'hidden',color:color,fontWeight:'bold'}}>{element.fileName}</p></Col>
                      {/* <Col xs={1} md={1} lg={2}><p><i id={classes.icon} style={{fontSize:20}} class="fas fa-cloud-download-alt"></i></p></Col> */}
                      <Col xs={1} md={1} lg={2}><i onClick={()=>deleteDataHandler(element.id)} id={classes.icon} style={{fontSize:20,color:color}}  class="fas fa-trash"></i></Col>
                  </Row>
              </div>
              </Col>
    )) : <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'48vh',width:'100%'}}><p style={{fontWeight:'bold',fontSize:30}}>No Data Added</p></div>


let colors =['red','blue','yellow','green']
    return (
        <div style={{padding:10,backgroundColor:'#EFF2F6',height:'90vh'}}>

<div style={{backgroundColor:'white',borderRadius:10,height:'78vh',overflowY:'scroll',padding:20}}>
<Container fluid style={{width:'100%'}}>
    <Row style={{width:'100%'}}>
                        <div className={classes.import} style={{ width: '100%' }}>
                     

              <input    onChange={fileHandler}
                                id="image" type='file' accept='.csv' />
                            <label className={classes.uploadTag} htmlFor="image">Import from File
                            </label>

            </div>
    </Row>
                    <br />
                    
                    {loading ? <div style={{ display:'flex',justifyContent:'center',alignItems:'center',height:'58vh' }}><Spinner animation="grow" variant={color} style={{ color: color }} size='sm' />{' '}<Spinner animation="grow" variant={color} style={{ color: color,marginLeft:5 }} size='sm' />{' '}<Spinner animation="grow" variant={color} style={{ color: color,marginLeft:5 }} size='sm' /></div> : 
                    
                        <Row>
                  {displayData}
                  
                
                </Row>
                    }
 
</Container>
</div>
        </div>
    )
}


export default Homepage