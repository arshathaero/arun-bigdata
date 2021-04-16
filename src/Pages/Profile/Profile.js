import React, { useState, useRef, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import classes from "./Profile.module.css";
import Container from "react-bootstrap/Container";

import Button from "@material-ui/core/Button";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../Store/Action/index";
import { color, getUser } from "../../Shared/Utility";

const Profile = (props) => {
  let dispatch = useDispatch();
  const password = useRef({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  password.current = watch("password", "");

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState();
  const [userData,setUserData] = useState()

  useEffect(() => {
    setLoading(true);

    getUser().then((user) => {
      setUserData(user)
      if (user.token) {
        axios
          .get("/accounts/profile/", {
            headers: {
              Authorization: `Bearer ${user.token}`, //the token is a variable which holds the token
            },
          })
          .then((res) => {
            setValue("firstname", res.data.first_name);
            setValue("lastname", res.data.last_name);

            setValue("organization", res.data.organization);

            setUser(res.data);
            setLoading(false);
          });
      }
    });
  }, [getUser]);

  const onSubmit = (data) => {
    setLoading(true);

    let datas = {
      first_name: data.firstname,
      last_name: data.lastname,
      organization: data.organization,
      password: data.password,
      confirm_password: data.password,
    };
    axios
      .put("/accounts/profile/", datas, {
        headers: {
          Authorization: `Bearer ${userData.token}`, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data);
        setLoading(false);
      });
  };

  const deleteHandler = () => {
    const confirm = window.confirm("Are you sure ?");

    if (confirm) {
      axios
        .delete("/accounts/profile/", {
          headers: {
            Authorization: `Bearer ${userData.token}`, //the token is a variable which holds the token
          },
        })
        .then((res) => {
          dispatch(actions.logout());
          window.location.href = "/";
        });
    }
  };

  let formData = (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <div style={{ float: "right", marginBottom: 10 }}>
              {edit ? (
                <div>
                  <Button
                    type="submit"
                    style={{
                      height: 35,
                      backgroundColor: color,
                      color: "white",
                      margin: "10px 0",
                      borderRadius: 20,

                      border: "none",
                      outline: "none",
                    }}
                    variant="contained"
                  >
                    Update
                  </Button>

                  <Button
                    onClick={() => setEdit(false)}
                    style={{
                      height: 35,
                      backgroundColor: color,
                      color: "white",
                      margin: "10px 15px",
                      borderRadius: 20,

                      border: "none",
                      outline: "none",
                    }}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setEdit(true)}
                  style={{
                    height: 35,
                    backgroundColor: color,
                    color: "white",
                    margin: "10px 0",
                    borderRadius: 20,

                    border: "none",
                    outline: "none",
                  }}
                  variant="contained"
                >
                  Edit
                </Button>
              )}
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6} style={{ width: "100%" }}>
            <input
              className={classes.text}
              type="text"
              placeholder="First Name"
              {...register("firstname", { required: true })}
              disabled={!edit}
            />
          </Col>
          <Col xs={12} sm={6} style={{ width: "100%" }}>
            <input
              className={classes.text}
              type="text"
              placeholder="Last Name"
              {...register("lastname", { required: true })}
              disabled={!edit}

            />
          </Col>
        </Row>

        <input
          className={classes.text}
          type="text"
          placeholder="Organization"
          {...register("organization", { required: true })}
          disabled={!edit}

        />

        <input
          className={classes.text}
          type="password"
          placeholder="Password"
          {...register("password", { required: true, minLength: 5 })}
          disabled={!edit}

        />
        {error && error.password && (
          <p style={{ color: "red", fontSize: 13 }}>{error.password}</p>
        )}
        <input
          className={classes.text}
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: true,
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
          disabled={!edit}

        />
        <br />
        {errors.confirmPassword && (
          <p style={{ color: "red", fontSize: 13 }}>
            {errors.confirmPassword.message}
          </p>
        )}
        {error && error.confirm_password && (
          <p style={{ color: "red", fontSize: 13 }}>{error.confirm_password}</p>
        )}
        <br />
      </form>

      <Button
        onClick={deleteHandler}
        style={{
          height: 35,
          backgroundColor: "#d43737",
          color: "white",
          margin: "10px 0",
          borderRadius: 5,

          border: "none",
          outline: "none",
        }}
        variant="contained"
      >
        <i style={{ color: "white", marginRight: 10 }} class="fas fa-trash"></i>{" "}
        Delete Account
      </Button>
    </div>
  );

  return (
    <div
      style={{ padding: 10, backgroundColor: "#EFF2F6", minHeight: "100vh" }}
    >
      <Container fluid>
        <Row>
          <Col sm={2} md={3}></Col>
          <Col sm={8} md={6}>
            <div
              style={{
                backgroundColor: "white",
                minHeight: "75vh",
                borderRadius: 20,
                padding: 20,
                textAlign: "center",
              }}
            >
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "58vh",
                  }}
                >
                  <Spinner
                    animation="grow"
                    variant={color}
                    style={{ color: color }}
                    size="sm"
                  />{" "}
                  <Spinner
                    animation="grow"
                    variant={color}
                    style={{ color: color, marginLeft: 5 }}
                    size="sm"
                  />{" "}
                  <Spinner
                    animation="grow"
                    variant={color}
                    style={{ color: color, marginLeft: 5 }}
                    size="sm"
                  />
                </div>
              ) : (
                formData
              )}
            </div>
          </Col>
          <Col sm={2} md={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
