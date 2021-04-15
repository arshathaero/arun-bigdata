import React, { useEffect } from 'react'
import classes from './Homepage.module.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Container from 'react-bootstrap/Container'

import listData from '../../Data/listData.json'

import axios from 'axios'


const Homepage= () =>{
    let color = 'rgb(214 60 131)'

let a = [1,2,3]
    
    useEffect(() => {
        axios.get('http://34.227.94.228:8000/data', {
            headers: {
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIwNDk4NjUzLCJqdGkiOiI1MDY5ODFmOWY1NjU0NmJjOWVmODVjYjRjMDMwNmE0MyIsInVzZXJfaWQiOjJ9.Gra1kjR5V-x-E1xSzR7SK_xaHPZ7RfTfAcaov9g1pH0", //the token is a variable which holds the token
              },
        
    }).then(res=>console.log(res))
},[])


console.log(listData.json_datasets.datasets)


let colors =['red','blue','yellow','green']
    return (
        <div style={{padding:10,marginTop:30,backgroundColor:'#EFF2F6',height:'90vh'}}>

<div style={{backgroundColor:'white',borderRadius:10,height:'78vh',overflowY:'scroll',padding:20}}>
<Container fluid style={{width:'100%'}}>
    <Row style={{width:'100%'}}>
    <div style={{width:'100%'}}>
                <p className={classes.uploadTag}>Import from File</p>

            </div>
    </Row>
    <br/>
    <Row>
        {listData.json_datasets.datasets.map((element,i)=>(
  <Col xs={5} sm={5} md={4} lg={3}>
  {/* <div style={{boxShadow:'0 0 10px #a8a8a8',backgroundColor:'white',borderRadius:10,height:'auto',marginTop:20}}>
      <div style={{height:180,width:'100%',backgroundColor:color,borderTopRightRadius:10,borderTopLeftRadius:10}}>
            <p style={{color:'white',fontWeight:'bold',fontSize:100,textAlign:'center'}}>P</p>
      </div>
      <Row style={{margin:10}}>
          <Col xs={8}><p>fsdfds</p></Col>
          <Col xs={2}><p><i style={{color:color,fontSize:20}} class="fas fa-cloud-download-alt"></i></p></Col>
          <Col xs={2}><p><i style={{color:color,fontSize:20}}  class="fas fa-trash"></i></p></Col>
      </Row>
  </div> */}
  <div style={{boxShadow:'0 0 10px #a8a8a8',backgroundColor:color,borderRadius:10,height:'auto',marginTop:20,padding:10,color:'white'}}>
  <Row style={{margin:'15px 5px 0 5px'}}>
          <Col xs={9} md={9} lg={10}><p style={{textOverflow:'ellipsis',whiteSpace:'nowrap',overflow:'hidden'}}>{element}</p></Col>
          {/* <Col xs={1} md={1} lg={2}><p><i id={classes.icon} style={{fontSize:20}} class="fas fa-cloud-download-alt"></i></p></Col> */}
          <Col xs={1} md={1} lg={2}><p><i id={classes.icon} style={{fontSize:20}}  class="fas fa-trash"></i></p></Col>
      </Row>
  </div>
  </Col>
        ))}
      
    
    </Row>
</Container>
</div>
        </div>
    )
}


export default Homepage