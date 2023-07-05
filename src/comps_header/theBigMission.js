import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  doApiMethod,
  API_URL,
  TOKEN_NAME,
  doApiGet,
} from "../services/apiService";
import { red } from "@mui/material/colors";
export default function TheBigMission() {
  const params = useParams();
  const [check, setCheck] = useState([]);
  const [name, setName] = useState([]);
  const [check1, setCheck1] = useState([]);
  const [name1, setName1] = useState([]);
  useEffect(() => {
    doApi();
  }, [params]);

  let [items, setItems] = useState([]);
  let [items1, setItems1] = useState([]);
  let [arr, setArr] = useState({});
  const [init, setInit] = useState({});
  const [number, setNumber] = useState();
  const doApi = async () => {
    setInit(JSON.parse(localStorage.getItem("USER_NAME")));

    console.log("hgc");
    let url = API_URL + `/missions/${params["idMission"]}`;
    console.log("url");
    try {
      let resp = await doApiGet(url, "GET");
      setCheck(resp.data.checkIngredientList);
      setName(resp.data.nameIngredientList);
      setCheck1(resp.data.checkTaskList);
      setName1(resp.data.nameTaskList);
      setItems(resp.data.ingredientList);
      setItems1(resp.data.taskList);
      setArr(resp.data);

      console.log(arr);
      //   setItems(resp.data);
      console.log(resp.data);
      //   resp = resp.data;
    } catch (err) {
      console.log(err.response);
      //   alert("somthing wrong in the page");
    }
  };

  const nameeee = (index) => {
    const choose = [...items];
    items[index] = "{items[index]} ---- השיר";
    console.log("yeyyyyyy");
  };

const schema=async()=>{
    let bodyData={checkIngredientList:null,nameIngredientList:null,checkTaskList:null,nameTaskList:null};
    bodyData.checkIngredientList = check;
    bodyData.nameIngredientList = name;
    bodyData.checkTaskList = check1;
    bodyData.nameTaskList = name1;
  let id=arr._id;
    let url = API_URL + "/missions/changeCheck/" + id;
    console.log(url);
    try {
      let resp = await doApiMethod(url, "PUT", bodyData);
    } catch (err) {
      console.log(err.response);
      alert("somthing wrong in the page");
    }
    doApi();
}

  const isFullIngredient = async (index) => {
    if (check[index] == false) {
      check[index] = true;
      name[index] = init.name;
      console.log(check[index]);
      console.log(name[index]);
      console.log(arr);
      schema();
    }
  };

  const isFullTask = async (index) => {
    if (check1[index] == false) {
      check1[index] = true;
      name1[index] = init.name;
      console.log(check[index]);
      console.log(name[index]);
      console.log(arr);
      schema();
    }
  };
  return (
    <div className="container-fluid mt-5 addAdmin">
      <div className="row container text-center">
        <div className="namedes col-md-5">
          <h2>
            {arr.name}
            <i class="fa fa-bell" aria-hidden="true"></i>
          </h2>
          <h3>{arr.description}</h3>
        </div>
        <div className="timedate col-md-5">
          <h4>{new Date(arr.date).toLocaleDateString()}</h4>
          <h4>{arr.hour}</h4>
          <h4>{arr.place}</h4>
        </div>
      </div>

      <div className="all col-md-10">
        <div className="container col-md-5 ">
          <h1>מוצרים</h1>
          <div className="add"></div>
          <div className="content box">
            <ul className="list">
              {items?.map((item, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    className="check"
                    name="checkbox"
                    checked={check[index] == true}
                    disabled={check[index] == true}
                    onClick={() => isFullIngredient(index)}
                  />
                  <label>{item}<span style={{color:"red"}} className>{name[index]&&(<b style={{color:"black"}}>-----</b>)}  {name[index]}</span></label>
                </li>
              ))}
            </ul>
          </div>{" "}
        </div>
        <div className="container col-md-5 float-left">
          <h1>משימות</h1>
          <div className="add"></div>
          <div className="content box">
            <ul className="list">
              {items1?.map((item, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    className="check"
                    checked={check1[index] == true}
                    disabled={check1[index] == true}
                    onClick={() => isFullTask(index)}
                  />
                  <label>{item}<span style={{color:"red"}}>{name1[index]&&(<b style={{color:"black"}}>-----</b>)}  {name1[index]}</span></label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="container send "></div>
    </div>
  );
}
