import React, { useEffect, useState } from 'react'
import classes from './Homepage.module.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Button from "@material-ui/core/Button";

import Container from 'react-bootstrap/Container'

import listData from '../../Data/listData.json'

import axios from '../../axios'
import { useMediaQuery } from "react-responsive";

import {color,getUser} from '../../Shared/Utility'

const Homepage = () => {
    

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState()
    const [error, setError] = useState()
    const [modalShow, setModalShow] = React.useState(false);
    const [importModalShow, setImportModalShow] = React.useState(false);

    const [tableLoad,setTableLoad] = useState(false)
    const isMobile = useMediaQuery({ query: "(max-width: 550px)" });

    const [dataDetail,setDataDetail] = useState()
    let a = [1, 2, 3]



    function getData(user) {
        axios.get('/data', {
            headers: {
                Authorization: `Bearer ${user.token}`, //the token is a variable which holds the token
            },
        
        }).then(res => {
            console.log(res)
            setData(res.data)
            setLoading(false)
        })

    }
    
    useEffect(() => {
        setLoading(true)
        getUser().then(user => {
            setUserData(user)
            getData(user)
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
        setData(prevState=>[...prevState,res.data])
        setLoading(false)
        e.target.value = ''
    }).catch(err => {
        console.log(err.response)
        setError(err.response.data.fileName)
        setLoading(false)
        e.target.value = ''
    

    })
    };
    

    const dataHandler = (id) => {
        setDataDetail(null)
        setModalShow(true)
        setTableLoad(true)
        axios.get('/data/' + id, {
            headers: {
                Authorization: `Bearer ${userData.token}`, //the token is a variable which holds the token
              }, 
        }).then(response => {
            console.log(response)
            setDataDetail(response.data.data)
            setTableLoad(false)
        })
    }


    const deleteDataHandler = (id) => {
        setLoading(true)
        axios.delete('/data/' + id, {
            headers: {
                Authorization: `Bearer ${userData.token}`, //the token is a variable which holds the token
              }, 
        }).then(response => {
            getData(userData)
        })
    }



    function ImportModal(props) {

        const [file, setFile] = useState()
        const [filename,setFilename] = useState()


        const importHandler = (e) => {
            e.preventDefault()
            setImportModalShow(false)
            let data =  new FormData();
            data.append('defaultFile', file)
            data.append('fileName',filename)
        
            
            setLoading(true)
            axios.post('/data/', data, {
                headers: {
                    Authorization: `Bearer ${userData.token}`, //the token is a variable which holds the token
                  },
            
            }).then(res => {
                console.log(res)
                setData(prevState=>[res.data,...prevState])
                setLoading(false)
                e.target.value = ''
            }).catch(err => {
                console.log(err.response)
                setError(err.response.data.fileName)
                setLoading(false)
                e.target.value = ''
            
        
            })
        }



        return (
          <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        //   dialogClassName={!isMobile && classes.mymodal}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
Import File              </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    
                    <form onSubmit={importHandler} style={{margin:10}}>
                        <Container fluid>
                            <Row>
                                <Col xs={4}>
                                    <p style={{marginTop:5}}><b>Filename : </b></p>
                                </Col>
                                <Col xs={8}>
                                <input      placeholder='Type here...'     className={classes.text}
 type='text' value={filename} onChange={e=>setFilename(e.target.value)} required />

                                </Col>
                            </Row>
                            <br />
                            <br/>
                            <Row>
                            <Col xs={4}>
                                    <p><b>File : </b></p>
                                </Col>
                                <Col xs={8}>
                                <input type='file' accept='.csv' onChange={e => setFile(e.target.files[0])} required />

                                </Col>
                            </Row>
                        </Container>
                        <br />
                            <br/>
                        <div style={{textAlign:'center'}}>
                        <Button type='submit' style={{backgroundColor:color,color:'white'}}>Upload</Button>

                        </div>
                    </form>
        
            </Modal.Body>
           
          </Modal>
        );
      }
      


    function TableModal(props) {

        


        return (
          <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          dialogClassName={!isMobile && classes.mymodal}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
Table View              </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    
                    {tableLoad ? <div style={{ display:'flex',justifyContent:'center',alignItems:'center',height:'58vh' }}><Spinner animation="grow" variant={color} style={{ color: color }} size='sm' />{' '}<Spinner animation="grow" variant={color} style={{ color: color,marginLeft:5 }} size='sm' />{' '}<Spinner animation="grow" variant={color} style={{ color: color,marginLeft:5 }} size='sm' /></div> :      <Table striped bordered hover>
  <thead>
    <tr>
      {dataDetail?.columns.map(column=>(
      <th>{column.title}</th>

      ))}
     
    </tr>
  </thead>
  <tbody>
    {dataDetail?.csv_data.map((data,idx)=>(
  <tr>
        {dataDetail?.columns.map(col => <td>{data[col.title]}</td> )}
 
</tr>
    ))}
   
   
  </tbody>
</Table>}
        
            </Modal.Body>
           
          </Modal>
        );
      }
      






    let displayData = data &&  data.length ? data.map(element => (
        <Col xs={6} sm={5} md={4} lg={3}>
            
              <div style={{boxShadow:'0 0 10px #a8a8a8',backgroundColor:'#EFF2F6',borderRadius:10,height:'auto',marginTop:20,padding:10,color:'white'}}>
              <Row onClick={()=>dataHandler(element.id)} style={{margin:'15px 5px 0 5px',cursor:'pointer'}}>
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
                     

              {/* <input    onChange={fileHandler}
                                id="image" type='file' accept='.csv' /> */}
                            <p className={classes.uploadTag} onClick={()=>setImportModalShow(true)} >Import from File
                            </p>

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
            <TableModal
        show={modalShow}
        onHide={() => setModalShow(false)}
            />
            <ImportModal
        show={importModalShow}
        onHide={() => setImportModalShow(false)}
      />
        </div>
    )
}


export default Homepage