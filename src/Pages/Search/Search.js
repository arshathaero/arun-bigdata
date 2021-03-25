

import React, { useEffect, useState } from 'react'
import Button from "@material-ui/core/Button";
import classes from './Search.module.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

import { useMediaQuery } from "react-responsive";

import Container from 'react-bootstrap/Container'

import useRecorder from './Recorder'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Pie,Bar } from '@reactchartjs/react-chart.js'
import Switch from '@material-ui/core/Switch';

import searchData from '../../Data/searchData.json'
const Search= () =>{
  const { transcript, resetTranscript } = useSpeechRecognition()
const [listening,setListening] = useState(false)

const [searchText,setSearchText] = useState()


    const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
const [datasetValue,setDatasetValue] = useState([])
const [datasetLabel,setDatasetLabel] = useState([])
const [datasetColor,setDatasetColor] = useState([])
const [chart,setChart] = useState(true)



let datasets = ['product','sales','success','sales1','test_alpha','sales big data','sales date','big data','hell yeah']

    const [dataset,setDataset] = useState()

    const handleChange = (event) => {
      setDataset(event.target.value);
    };
useEffect(()=>{
setSearchText(transcript)
},[transcript])

    let color = 'rgb(214 60 131)'


  

    const stopListening =() =>{
console.log(transcript)
      setListening(false)

      SpeechRecognition.stopListening();
    }


const startListening =() =>{
  setSearchText(null)
  setListening(true)

  SpeechRecognition.startListening();
}


const onSubmit = (data) =>{
  data.preventDefault()
console.log(data.target[0].value)
}


useEffect(()=>{

  searchData.dataset.map(data=>{
    let profit = data.sum.toFixed(2)
    // b.push(a.sum)
    setDatasetLabel(prevState => [...prevState,data.Country + '-' + data['Item_Type']])
    setDatasetValue(prevState => [...prevState,profit])
    setDatasetColor(prevState => [...prevState,dynamicColors()])
  })
},[searchData])

useEffect(()=>{
  console.log(datasetValue)

},[datasetValue])

const data = {
  labels: datasetLabel && datasetLabel,
  datasets: [
    {
      label: 'Data',
      data: datasetValue && datasetValue,
      backgroundColor: datasetColor && datasetColor,
     
      borderWidth: 1,
    },

  ],
}


var dynamicColors = function() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};



    return (
        <div style={{padding:10,marginTop:20,backgroundColor:'#EFF2F6',height:'100%'}}>
            <Container fluid>
                <Row>
                    <Col sm={1} md={2} lg={2}>
                    </Col>
                    <Col xs={12} sm={10} md={8} lg={8}>
                    <form onSubmit={onSubmit}>

                    <div style={{position:'relative',width:'100%',backgroundColor:'white',display:'flex',padding:10,borderRadius:20,boxShadow:'0 0 10px #c4c4c4',}}>
              

                <input value={searchText} onChange={(e)=>setSearchText(e.target.value)} required  type='text' placeholder='Search' style={{paddingLeft:30,border:'none',outline:'none',width:'100%',height:35,border:'none',borderTopLeftRadius:10,borderBottomLeftRadius:10}} />
                <i style={{color:'grey',position:'absolute',fontSize:15,left:18,top:19}} class="fas fa-search"></i>
       {listening ? <i onClick={stopListening} id={classes.icon} style={{fontSize:20,position:'absolute',right:105,top:12,backgroundColor:color,color:'white',padding:'5px 8px',borderRadius:'50%'}}  class="fas fa-stop"></i> : 
                       <i onClick={startListening} id={classes.icon} style={{fontSize:20,position:'absolute',right:105,top:12,backgroundColor:color,color:'white',padding:'5px 8px',borderRadius:'50%'}} class="fas fa-microphone-alt"></i>

       } 


                <Button
            type='submit'
            
              style={{
                  

               height:35,
                backgroundColor: color,
                color:'white',
                borderRadius:20,
               


                border: "none",
                outline: "none",
              }}
              variant="contained"
            >
              Search
            </Button>

            </div>
            </form>

                    </Col>
                    <Col sm={1} md={2} lg={2}>
                      <div style={{display:'flex',marginTop:10,float:'right'}}>
                      <p style={{marginTop:8,color:color,fontWeight:'bold'}}>Chart</p>
                    <Switch
        checked={chart}
        onChange={()=>setChart(!chart)}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
                      </div>
                     
                    </Col>
                    </Row>



<br/>
<Row>
    <Col sm={12} md={3}>
        <div style={{backgroundColor:'white',padding:10,borderRadius:10,boxShadow:'0 0 10px #c4c4c4',marginTop:10}}>
    
  <h4 style={{textAlign:'center',fontWeight:'bold',color:'rgb(183 24 98)'}}>Datasets</h4>
<br/>
 <div className={classes.sidepanel} style={{marginLeft:20,height:'60vh',overflowY:'scroll'}}>
 <RadioGroup aria-label="gender" name="gender1" value={dataset} onChange={handleChange}>
      {datasets.map(data=>(
        <FormControlLabel value={data} control={<Radio />} label={<span style={{textTransform:'capitalize',color:data == dataset && color}}>{data}</span>} />

      ))}
       
      </RadioGroup>

 </div>

  
 
  
        </div>
    </Col>
    <Col md={9}>
    <Row>
      <Col>
      <div style={{backgroundColor:'white',fontSize:14,padding:10,borderRadius:10,boxShadow:'0 0 10px #c4c4c4',marginTop:10}}>
     
    
     <p style={{fontWeight:'bold',margin:10}}>{searchData.query}</p>
     <div style={{marginTop:20}}>
      {searchData.date_filtered.Day.length ? searchData.date_filtered.Day.map(day=>(
        <p key={day}>Day : <span style={{fontWeight:'bold'}}>{day}</span></p>
      )):null}
       {searchData.date_filtered.Month.length ? searchData.date_filtered.Month.map(month=>(
        <p key={month}>Month : <span style={{fontWeight:'bold'}}>{month}</span></p>
      )):null}
       {searchData.date_filtered.Year.length ? searchData.date_filtered.Year.map(year=>(
        <p key={year}>Year : <span style={{fontWeight:'bold'}}>{year}</span></p>
      )):null}
     </div>
     
    
      </div>
      </Col>
 
    </Row>
    <br/>
    <Row>

      {chart ? <> <Col>
      <div style={{backgroundColor:'white',padding:10,borderRadius:10,boxShadow:'0 0 10px #c4c4c4',height:'43vh',overflowY:'scroll'}}>
      <Pie data={data} />

      </div>

      </Col>
      <Col>
      <div style={{backgroundColor:'white',padding:10,borderRadius:10,boxShadow:'0 0 10px #c4c4c4',height:'43vh',overflowY:'scroll'}}>
      <Bar data={data} />

      </div>

      </Col> </> :  <Col>
      <div style={{backgroundColor:'white',padding:10,borderRadius:10,boxShadow:'0 0 10px #c4c4c4',maxHeight:'50vh',overflowY:'scroll'}}>

      <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      {searchData.columns.map(column=>(
      <th>{column}</th>

      ))}
     
    </tr>
  </thead>
  <tbody>
    {searchData.dataset && searchData.dataset.map((data,idx)=>(
  <tr>
  <td>{idx}</td>
  <td>{data.Country}</td>
  <td>{data.Item_Type}</td>
  <td>{data.sum}</td>
</tr>
    ))}
   
   
  </tbody>
</Table></div></Col>}
      
     
     

    </Row>
    </Col>
</Row>
            </Container>
   

        </div>
    )
}

{/* <div className="App">
<audio src={audioURL} controls />
<button onClick={startRecording} disabled={isRecording}>
  start recording
</button>
<button onClick={stopRecording} disabled={!isRecording}>
  stop recording
</button>

<p>
  <em>
    (On Codesandbox pop out the preview into a window to get a user media
    request.)
  </em>
</p>
</div> */}
export default Search