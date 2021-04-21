import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import classes from "./Search.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

import { useMediaQuery } from "react-responsive";

import Container from "react-bootstrap/Container";

import useRecorder from "./Recorder";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Pie, Bar } from "@reactchartjs/react-chart.js";
import Switch from "@material-ui/core/Switch";

// import searchData from '../../Data/searchData.json'
import { color, getUser } from "../../Shared/Utility";
import axios from "../../axios";
const Search = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [listening, setListening] = useState(false);

  const [searchText, setSearchText] = useState();

  const [searchData, setSearchData] = useState();
  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  const [datasetValue, setDatasetValue] = useState([]);
  const [datasetLabel, setDatasetLabel] = useState([]);
  const [datasetColor, setDatasetColor] = useState([]);
  const [chart, setChart] = useState(true);

  const [disableChart, setDisableChart] = useState(false);

  let datasets = [
    "product",
    "sales",
    "success",
    "sales1",
    "test_alpha",
    "sales big data",
    "sales date",
    "big data",
    "hell yeah",
  ];

  const [dataset, setDataset] = useState();
  const [selectedDataset, setSelectedDataset] = useState();

  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);

  function getData(user) {
    axios
      .get("/data", {
        headers: {
          Authorization: `Bearer ${user.token}`, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        console.log(res);
        setDataset(res.data);
        setSelectedDataset(res.data[0]?.id);
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    getUser().then((user) => {
      setUserData(user);
      getData(user);
    });
  }, []);

  const datasetHandler = (event) => {
    setSelectedDataset(event.target.value);
  };

  useEffect(() => {
    setSearchText(transcript);
  }, [transcript]);

  const stopListening = () => {
    console.log(transcript);
    setListening(false);

    SpeechRecognition.stopListening();
  };

  const startListening = () => {
    setSearchText(null);
    setListening(true);

    SpeechRecognition.startListening();
  };

  const onSubmit = (data) => {
    setDatasetValue("");
    setDatasetLabel("");

    setDatasetColor("");

    data.preventDefault();
    setLoading(true);

    function obsKeysToString(o, k, sep) {
      let joinString = k
        .map((key) => o[key.title])
        .filter((v) => typeof v == "string")
        .join(sep);

      return setDatasetLabel((prevState) => [...prevState, joinString]);
    }

    function obsKeysToNumber(o, k, sep) {
      let joinString = k
        .map((key) => o[key.title])
        .filter((v) => typeof v == "number")
        .join("");

      return setDatasetValue((prevState) => [...prevState, joinString]);
    }
    let query = data.target[0].value;
    console.log(query, selectedDataset);

    if (selectedDataset && query) {
      axios
        .get(`/data/search?dataSetId=${selectedDataset}&query=${query}`, {
          headers: {
            Authorization: `Bearer ${userData.token}`, //the token is a variable which holds the token
          },
        })
        .then((res) => {
          setSearchData(res.data);
          let dataTypes = [];
          for (let key in res.data?.data.dataResponse[0]) {
            dataTypes.push(typeof res.data?.data.dataResponse[0][key]);
          }
          if (dataTypes.includes("number")) {
            setChart(true);
            setDisableChart(false);
            console.log(res);
            for (let data of res.data.data.dataResponse) {
              obsKeysToString(data, res.data?.data.columns, " ");
              obsKeysToNumber(data, res.data?.data.columns, "");
              setDatasetColor((prevState) => [...prevState, dynamicColors()]);
            }
            // res.data.data.dataResponse.map((data) => {

            //   obsKeysToString(data, searchData?.data.columns, " ");
            //   obsKeysToNumber(data, searchData?.data.columns, '')
            //   setDatasetColor((prevState) => [...prevState, dynamicColors()]);

            // });
          } else {
            setChart(false);
            setDisableChart(true);
          }
          // res.data?.data.columns.map((col) => {

          //   if (isString) {
          //     searchData?.data.dataResponse.map((data) => {
          //       obsKeysToString(data, searchData?.data.columns, " ");
          //     });
          //     res.data?.data.dataResponse.map((value) => {
          //       console.log(value[col.title]);
          //       // setDatasetValue(prevState=>[...prevState,value[col.title]])
          //     });
          //   } else {
          //     setChart(false);
          //     setDisableChart(true);
          //   }

          //   setDatasetLabel((prevState) => [...prevState, col.title]);
          // });

          // res.data?.data.dataResponse.map((value) => {
          //   res.data?.data.columns.map((col) => {
          //     // if (typeof value[col.title] == Number) {
          //     // }
          //   });
          // });
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      alert("Dataset is not selected");
    }
  };

  useEffect(() => {
    console.log(datasetValue);
  }, [datasetValue]);

  useEffect(() => {
    // searchData?.data.dataResponse.map(data => {
    //   console.log(Object.keys(data).reduce((sum, key) => data[sum]))
    //   searchData?.data.columns.map(col => {
    //     // console.log(data[col.title])
    //     // a.push(data[col.title])
    //   })
    // })
    // let profit = data.sum.toFixed(2)
    // b.push(a.sum)
    // setDatasetLabel(prevState => [...prevState,data.Country + '-' + data['Item_Type']])
    // setDatasetValue(prevState => [...prevState,profit])
  }, [searchData]);

  const data = {
    labels: datasetLabel && datasetLabel,
    datasets: [
      {
        label: "Data",
        data: datasetValue && datasetValue,
        backgroundColor: datasetColor && datasetColor,

        borderWidth: 1,
      },
    ],
  };

  var dynamicColors = function () {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  };

  let searchDisplayData = (
    <Row>
      <Col sm={12} md={3}>
        <div
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            boxShadow: "0 0 10px #c4c4c4",
            marginTop: 10,
          }}
        >
          <h4
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "rgb(183 24 98)",
            }}
          >
            Datasets
          </h4>
          <br />
          <div
            className={classes.sidepanel}
            style={{ marginLeft: 20, height: "60vh", overflowY: "scroll" }}
          >
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={Number(selectedDataset)}
              onChange={datasetHandler}
            >
              {dataset && dataset.length ? (
                dataset.map((data) => (
                  <FormControlLabel
                    value={data.id}
                    control={<Radio />}
                    label={
                      <span
                        style={{
                          textTransform: "capitalize",
                          color: data.id == selectedDataset && color,
                        }}
                      >
                        {data.fileName}
                      </span>
                    }
                  />
                ))
              ) : (
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                  No dataset added !
                </p>
              )}
            </RadioGroup>
          </div>
        </div>
      </Col>

      {searchData ? (
        <Col md={9}>
          <Row>
            <Col>
              <div
                style={{
                  backgroundColor: "white",
                  fontSize: 14,
                  padding: 10,
                  borderRadius: 10,
                  boxShadow: "0 0 10px #c4c4c4",
                  marginTop: 10,
                }}
              >
                <p style={{ fontWeight: "bold", margin: 10 }}>
                  {searchData.sqlQuery}
                </p>
                <div style={{ marginTop: 20 }}>
                  {searchData.dateQuery.Day.length
                    ? searchData.dateQuery.Day.map((day) => (
                        <p key={day}>
                          Day :{" "}
                          <span style={{ fontWeight: "bold" }}>{day}</span>
                        </p>
                      ))
                    : null}
                  {searchData.dateQuery.Month.length
                    ? searchData.dateQuery.Month.map((month) => (
                        <p key={month}>
                          Month :{" "}
                          <span style={{ fontWeight: "bold" }}>{month}</span>
                        </p>
                      ))
                    : null}
                  {searchData.dateQuery.Year.length
                    ? searchData.dateQuery.Year.map((year) => (
                        <p key={year}>
                          Year :{" "}
                          <span style={{ fontWeight: "bold" }}>{year}</span>
                        </p>
                      ))
                    : null}
                </div>
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            {chart ? (
              <>
                {" "}
                <Col>
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "20px 10px",
                      borderRadius: 10,
                      boxShadow: "0 0 10px #c4c4c4",
                      height: "auto",
                      overflowY: "scroll",
                    }}
                  >
                    <Pie data={data} height={200} />
                  </div>
                </Col>
                <Col>
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "20px 10px",
                      borderRadius: 10,
                      boxShadow: "0 0 10px #c4c4c4",
                      height: "auto",
                      overflowY: "scroll",
                    }}
                  >
                    <Bar data={data} height={200} />
                  </div>
                </Col>{" "}
              </>
            ) : (
              <Col>
                <div
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10,
                    boxShadow: "0 0 10px #c4c4c4",
                    maxHeight: "50vh",
                    overflowY: "scroll",
                  }}
                >
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        {searchData.data.columns.map((column) => (
                          <th>{column.title}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {searchData?.data.dataResponse.map((data, idx) => (
                        <tr>
                          {searchData?.data.columns.map((col) => (
                            <td>{data[col.title]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            )}
          </Row>
        </Col>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "70%",
          }}
        >
          <h4>
            <b>Search keyword to display data</b>
          </h4>
        </div>
      )}
    </Row>
  );

  return (
    <div
      style={{
        padding: 10,
        marginTop: 20,
        backgroundColor: "#EFF2F6",
        height: "90vh",
      }}
    >
      <Container fluid>
        <Row>
          <Col sm={1} md={2} lg={2}></Col>
          <Col xs={12} sm={10} md={8} lg={8}>
            <form onSubmit={onSubmit}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  backgroundColor: "white",
                  display: "flex",
                  padding: 10,
                  borderRadius: 20,
                  boxShadow: "0 0 10px #c4c4c4",
                }}
              >
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  required
                  type="text"
                  placeholder="Search"
                  style={{
                    paddingLeft: 30,
                    border: "none",
                    outline: "none",
                    width: "100%",
                    height: 35,
                    border: "none",
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                />
                <i
                  style={{
                    color: "grey",
                    position: "absolute",
                    fontSize: 15,
                    left: 18,
                    top: 19,
                  }}
                  class="fas fa-search"
                ></i>
                {listening ? (
                  <i
                    onClick={stopListening}
                    id={classes.icon}
                    style={{
                      fontSize: 20,
                      position: "absolute",
                      right: 105,
                      top: 12,
                      backgroundColor: color,
                      color: "white",
                      padding: "5px 8px",
                      borderRadius: "50%",
                    }}
                    class="fas fa-stop"
                  ></i>
                ) : (
                  <i
                    onClick={startListening}
                    id={classes.icon}
                    style={{
                      fontSize: 20,
                      position: "absolute",
                      right: 105,
                      top: 12,
                      backgroundColor: color,
                      color: "white",
                      padding: "5px 8px",
                      borderRadius: "50%",
                    }}
                    class="fas fa-microphone-alt"
                  ></i>
                )}

                <Button
                  type="submit"
                  style={{
                    height: 35,
                    backgroundColor: color,
                    color: "white",
                    borderRadius: 20,

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
            <div style={{ display: "flex", marginTop: 10, float: "right" }}>
              <p style={{ marginTop: 8, color: color, fontWeight: "bold" }}>
                Chart
              </p>
              <Switch
                disabled={disableChart}
                checked={chart}
                onChange={() => setChart(!chart)}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </div>
          </Col>
        </Row>

        <br />
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
          searchDisplayData
        )}
      </Container>
    </div>
  );
};

{
  /* <div className="App">
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
</div> */
}
export default Search;
