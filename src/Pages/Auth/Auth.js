import React, { useEffect, useState,useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import Button from "@material-ui/core/Button";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";
import {useHistory} from 'react-router-dom'
import Col from "react-bootstrap/Col";
import classes from "./Auth.module.css";
import axios from '../../axios'
import {useDispatch,useSelector} from 'react-redux'
import * as actions from '../../Store/Action/index'




const Auth = (props) => {
let history = useHistory()
  const token = useSelector(state => state.auth.token)
  const signupData = useSelector(state => state.auth.signupData)

  const error = useSelector(state => state.auth.error)
  const loading = useSelector(state=>state.auth.loading)


  let dispatch = useDispatch()
  const password = useRef({});



  useEffect(() => {
    if (signupData) {

      setMode('Login');
    
     }
      
      
      
  }, [signupData])
  


  useEffect(() => {
    if (token) {

      history.push('/')
      
     }
      
      
      
  }, [token])
  


  let color = "rgb(214 60 131)";

  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  const isTab = useMediaQuery({ query: "(max-width: 780px)" });

  const [mode, setMode] = useState("Login");

  const { register, handleSubmit, reset, watch, formState: { errors }, } = useForm();
  
  const { register:register1, handleSubmit:handleSubmit1, } = useForm();



  password.current = watch("password", "");



  const onSubmit1 = ( data) => {
    
    let datas = new FormData()


    datas.append('email',data.email)

    datas.append('password',data.password)
    

    console.log('sff')

   dispatch(actions.login(data.email,data.password))
  };

  const onSubmit = ( data) => {
    
    let datas = new FormData()

    datas.append('first_name', data.firstname)
    datas.append('last_name',data.lastname)

    datas.append('email',data.email)

    datas.append('password',data.password)
    
    datas.append('confirm_password',data.confirmPassword)
    datas.append('organization', data.organization)
    

   dispatch(actions.signup(data.firstname,data.lastname,data.email,data.password,data.organization,reset))
  };

  let loginForm = (
    <form key={0} onSubmit={handleSubmit1(onSubmit1)}>
      <input
        className={classes.text}
        type="email"
        placeholder="Email"
        style={{width:'80%'}}
        {...register1("email", { required: true })}
      />
   
       
      <input
        className={classes.text}
        type="password"
        placeholder="Password"
        style={{width:'80%'}}
        {...register1("password", { required: true })}
        />
      {error && error.detail && <p style={{ color: "red", fontSize: 15,marginTop:10 }}>
        *{error.detail}

      </p>}
   <br/>
      {loading ? <div style={{marginTop:30}}><Spinner animation="grow" variant={color} style={{ color: color }} size='sm' />{' '}<Spinner animation="grow" variant={color} style={{ color: color }} size='sm' />{ ' '}<Spinner animation="grow" variant={color} style={{color:color}} size='sm'  /></div> :      <Button
        type="submit"
        style={{
          height: 35,
          backgroundColor: color,
            color: "white",
          margin:'20px 0 10px 0',
          borderRadius: 5,

          border: "none",
          outline: "none",
        }}
        variant="contained"
      >
        Submit
      </Button>}
    </form>
  );

  let registerForm = (
    <form key={1}  onSubmit={handleSubmit(onSubmit)}>

      <Row >
        <Col xs={12} sm={6} style={{width:'100%'}}>
        <input
className={classes.text}
type="text"
placeholder="First Name"
defaultValue=''
{...register("firstname", { required: true })}
/>
        </Col>
        <Col xs={12} sm={6} style={{width:'100%'}}>
          <input
        className={classes.text}
        type="text"
        placeholder="Last Name"

        {...register("lastname", { required: true })}
      />
        </Col>
      </Row>
      
     
        <input
className={classes.text}
type="text"
placeholder="Organization"

{...register("organization", { required: true })}
/>
      <input
        key={3}
        className={classes.text}
        type="email"
        placeholder="Email"

        {...register("email", { required: true })}
      />
      {error && error.email &&  <p style={{ color: "red", fontSize: 13 }}>
          {error.email}
        </p>}
      <input
        className={classes.text}
        type="password"
        placeholder="Password"

        {...register("password", { required: true, minLength: 5 })}
        />
{error && error.password &&  <p style={{ color: "red", fontSize: 13 }}>
          {error.password}
        </p>}
      <input
        className={classes.text}
        type="password"
        placeholder="Confirm Password"

              {...register("confirmPassword", { required: true,validate: (value) =>
                value === password.current || "The passwords do not match", })}
      /><br />
      {errors.confirmPassword && (
        <p style={{ color: "red", fontSize: 13 }}>
          {errors.confirmPassword.message}
        </p>
      )}
      {error && error.confirm_password &&  <p style={{ color: "red", fontSize: 13 }}>
          {error.confirm_password}
        </p>}
      <br />
      
      {loading ? <div style={{margin:10}}><Spinner animation="grow" variant={color} style={{ color: color }} size='sm' />{' '}<Spinner animation="grow" variant={color} style={{ color: color }} size='sm' />{ ' '}<Spinner animation="grow" variant={color} style={{color:color}} size='sm'  /></div> :      <Button
        type="submit"
        style={{
          height: 35,
          backgroundColor: color,
            color: "white",
          margin:'10px 0',
          borderRadius: 5,

          border: "none",
          outline: "none",
        }}
        variant="contained"
      >
        Submit
      </Button>}
           
    </form>
  );

  return (
    <div style={{ padding: 10, backgroundColor: "#EFF2F6", minHeight: "100vh" }}>
      <Container fluid>
        <Row>
          <Col sm={1} md={2} lg={3}></Col>
          <Col xs={12} sm={10} md={8} lg={6}>
            <center>
              <div
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                  boxShadow: "0 0 10px #c4c4c4",
                  marginTop: mode === 'Login' ? 100 : 10,
                  height: "auto",
                  textAlign: "center",
                  width: isTab ? "100%" : "80%",
                }}
              >
                <h2 className={classes.heading}>{mode}</h2>
                {mode == "Login" ? loginForm : registerForm}
                <br />

                {mode == "Login" ? (
                  <p>
                    Don't have Account ?,{" "}
                    <span
                      onClick={() => setMode("Sign Up")}
                      style={{ color: color, cursor: "pointer" }}
                    >
                      {" "}
                      Sign Up{" "}
                    </span>
                  </p>
                ) : (
                  <p>
                    Already have Account ?,{" "}
                    <span
                      onClick={() => setMode("Login")}
                      style={{ color: color, cursor: "pointer" }}
                    >
                      {" "}
                      Login{" "}
                    </span>
                  </p>
                )}
              </div>
            </center>
          </Col>
          <Col sm={1} md={2} lg={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Auth;
