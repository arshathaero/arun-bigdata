import React, { useEffect, useState,useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "@material-ui/core/Button";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";

import Col from "react-bootstrap/Col";
import classes from "./Auth.module.css";
import axios from '../../axios'
import {useDispatch,useSelector} from 'react-redux'
import * as actions from '../../Store/Action/index'




const Auth = (props) => {


  const error = useSelector(state => state.auth.error)
  const loading = useSelector(state=>state.auth.loading)


  let dispatch = useDispatch()
  const password = useRef({});

  let color = "rgb(214 60 131)";

  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  const isTab = useMediaQuery({ query: "(max-width: 780px)" });

  const [mode, setMode] = useState("Login");

  const { register, handleSubmit, watch, formState: { errors }, } = useForm();
  password.current = watch("password", "");

  const onSubmit = (data) => {
    let datas = new FormData()

    datas.append('first_name', data.firstname)
    datas.append('last_name',data.lastname)

    datas.append('email',data.email)

    datas.append('password',data.password)
    
    datas.append('confirm_password',data.confirmPassword)
    datas.append('organization', data.organization)
    

   dispatch(actions.signup(data.firstname,data.lastname,data.email,data.password,data.organization))

  };

  let loginForm = (
    <form>
      <input className={classes.text} type="email" placeholder="Email" />
      <br />
      <input className={classes.text} type="password" placeholder="Password" />
      <br />
      <br />

      <Button
        type="submit"
        style={{
          height: 35,
          backgroundColor: color,
          color: "white",
          borderRadius: 5,
          margin:'10px 0',

          border: "none",
          outline: "none",
        }}
        variant="contained"
      >
        Submit
      </Button>
    </form>
  );

  let registerForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input

        className={classes.text}
        type="text"
        placeholder="First Name"

        {...register("firstname", { required: true })}
      />
      <input
        className={classes.text}
        type="text"
        placeholder="Last Name"

        {...register("lastname", { required: true })}
      />
        <input

className={classes.text}
type="text"
placeholder="Organization"

{...register("organization", { required: true })}
/>
      <input

        className={classes.text}
        type="email"
        placeholder="Email"

        {...register("email", { required: true })}
        />
      <br />
      <input

        className={classes.text}
        type="password"
        placeholder="Password"

        {...register("password", { required: true, minLength: 5 })}
        />

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
          <br/>
                <Button
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
      </Button>
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
                    Don't have Account,{" "}
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
                    Already have Account,{" "}
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
