import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Swal from "sweetalert2";
import {
  doApiMethod,
  API_URL,
  TOKEN_NAME,
  doApiGet,
} from "../services/apiService";
import { useForm } from "react-hook-form";
import "../admin/addEventAdmin.css";
import { MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";

export default function CreateMission() {
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();
  // const nameRef = register("name", { required: true, minLength: 4 });
  // const descriptionRef = register("description", {
  //   required: true,
  //   minLength: 6,
  // });
  // const [date, setDate] = useState();
  // const [hour, setHour] = useState();
  // const [place, setPlace] = useState();
  // const [description, srtDescription] = useState();

  const dateRef = register("date", { required: true });
  const hourRef = register("hour", { required: true });
  const placeRef = register("place", { required: true });
  const descriptionRef = register("description", { required: true });

  
  // const dateRef = useRef();
  // const hourRef =  useRef();
  // const placeRef =  useRef();
  // const descriptionRef =  useRef();

  const onSubForm = async () => {
console.log(descriptionRef.current.value); 
   let bodyData={
      allUsers:items2,name:arr.name,ingredientList:items,
      taskList:items1,
      date:dateRef.current.value
   ,
      description:descriptionRef.current.value,
      hour:hourRef.current.value,
      place:placeRef.current.value
    }
    console.log("offfffffffffff");
    //     bodyData.allUsers = items2;
    // bodyData.name = arr.name;
    // // bodyData.description =arr.description;
    // bodyData.ingredientList = items;
    // bodyData.taskList = items1;

    const newArray1 = Array.from({ length: items.length }, () => false);
    const newArray2 = Array.from({ length: items.length }, () => null);
    const newArray3 = Array.from({ length: items1.length }, () => false);
    const newArray4 = Array.from({ length: items1.length }, () => null);



    bodyData.checkIngredientList = newArray1;
    bodyData.nameIngredientList = newArray2;
    bodyData.checkTaskList = newArray3;
    bodyData.nameTaskList = newArray4;

    // data -> מכיל את כל המאפיינים שלה השמות של האינפוטים עם הערך שלהם
    let url = API_URL + "/missions/";
    ;console.log(bodyData);
    try {
      console.log(bodyData);
      let resp = await doApiMethod(url, "POST", bodyData);
      console.log("ddddddddddddd");
      if (resp.data._id) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
                nav("/login/privateArea");
      } else {
        alert("There problem , try again later");
      }
    } catch (err) {
      console.log(err.response);
      alert("somthing wrong in the page");
    }
  };
  useEffect(() => {
    doApi();
  }, [params]);
  const [arr, setArr] = useState({ name: "Exp" });
  // const item={};

  const doApi = async () => {
    let url = API_URL + `/events/${params["idEvent"]}`;
    try {
      let resp = await doApiGet(url, "GET");
      // setItems=resp.ingredientList;
      // setItems1=resp.taskList;
      setArr(resp.data);
      setItems(resp.data.ingredientList);
      setItems1(resp.data.taskList);
      console.log(resp.data);
      resp = resp.data;
    } catch (err) {
      console.log(err.response);
      alert("somthing wrong in the page");
    }
  };

  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const [items1, setItems1] = useState([]);
  const [inputValue1, setInputValue1] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  };

  const handleAddItem1 = () => {
    if (inputValue1.trim() !== "") {
      setItems1([...items1, inputValue1]);
      setInputValue1("");
    }
  };

  const handleDeleteItem1 = (index) => {
    const newItems = [...items1];
    newItems.splice(index, 1);
    setItems1(newItems);
  };

  const [items2, setItems2] = useState([]);
  const [inputValue2, setInputValue2] = useState("");

  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  };

  const handleAddItem2 = () => {
    // let ifEx = doApiForm2(inputValue2);
    // if (ifEx) {
      if (inputValue2.trim() !== "") {
        setItems2([...items2, inputValue2]);
        setInputValue2("");
      }
    // } else {
    //   alert("user must register before");
    // }
  };

  const handleDeleteItem2 = (index) => {
    const newItems = [...items2];
    newItems.splice(index, 1);
    setItems2(newItems);
  };

  const doApiForm2 = async (email) => {
    let url2 = API_URL + "/users/ifEmailExists";
    console.log("emaillll");
    try {
      let object = { email: email };

      let resp = await doApiMethod(url2, "POST", object);
      console.log(resp);
      return true;
    } catch (err) {
      console.log(err.response);
      return false;
    }
  };

  return (
    <div className="container-fluid mt-5 addAdmin">
      <div className="row container ">
        <div className=" name col-md-8 text-center">
          <h1>{arr.name}</h1>
          <h3 style={{color:"black"}}>תיאור:</h3>
          <input  type="text" placeholder={arr.description}  className="form-control mb-4"  ref={descriptionRef}/>

        </div>
         <div className="col-md-4  mt-3">
          <input  type="date" placeholder="תאריך"  className="form-control mb-4" ref={dateRef}/>

          <input type="time" placeholder="שעה" className="form-control mb-4" ref={hourRef} />

          <input type="text" placeholder="מקום"className="form-control mb-4"  ref={placeRef} />
        </div> 
      

      {/* <MDBCol col="4" md="4">
        <div className="divider d-flex align-items-center my-4">
          <p className="text-center fw-bold mx-3 mb-0"></p>
        </div>

        <MDBInput
          wrapperClass="mb-4"
          label="date"
          id="formControlLg"
          type="date"
          size="lg" {...dateRef}
        />

        <MDBInput
          wrapperClass="mb-4"
          label="time"
          id="formControlLg"
          type="time"
          size="lg"{...hourRef}
        />

        <MDBInput
          wrapperClass="mb-4"
          label="place"
          id="formControlLg"
          type="text"
          size="lg" {...placeRef}
        />
      </MDBCol> */}
      </div>
      <div className="all col-md-10">
        <div className="container col-md-3 ">
          <h1>מוצרים</h1>
          <div className="add">
            <input
              type="text"
              placeholder="הוספת מוצר"
              className="add-txt box"
              value={inputValue}
              onChange={handleInputChange}
            />
            <input
              type="button"
              className="add-btn"
              value="+"
              onClick={handleAddItem}
            />
          </div>
          <div className="content box">
            <ul className="list">
              {items.map((item, index) => (
                <li key={index}>
                  {/* <input type="checkbox" className="check" /> */}
                  <label>{item}</label>
                  <a
                    className="delete"
                    href="#"
                    onClick={() => handleDeleteItem(index)}
                  >
                    X
                  </a>
                </li>
              ))}
            </ul>
          </div>{" "}
        </div>
        <div className="container col-md-3 float-left">
          <h1>משימות</h1>
          <div className="add">
            <input
              type="text"
              placeholder="הוספת משימה"
              className="add-txt box"
              value={inputValue1}
              onChange={handleInputChange1}
            />
            <input
              type="button"
              className="add-btn"
              value="+"
              onClick={handleAddItem1}
            />
          </div>
          <div className="content box">
            <ul className="list">
              {items1.map((item, index) => (
                <li key={index}>
                  {/* <input type="checkbox" className="check" /> */}
                  <label>{item}</label>
                  <a
                    className="delete"
                    href="#"
                    onClick={() => handleDeleteItem1(index)}
                  >
                    X
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="container col-md-3 float-left">
        <h1>משתתפים</h1>
        <div className="add">
          <input
            type="text"
            placeholder="הוספת משתתף"
            className="add-txt box"
            value={inputValue2}
            onChange={handleInputChange2}
          />
          <input
            type="button"
            className="add-btn"
            value="+"
            onClick={handleAddItem2}
          />
        </div>
        <div className="content box">
          <ul className="list">
            {items2.map((item, index) => (
              <li key={index}>
                {/* <input type="checkbox" className="check" /> */}
                <label>{item}</label>
                <a
                  className="delete"
                  href="#"
                  onClick={() => handleDeleteItem2(index)}
                >
                  X
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='container send '>
    <button className='btn btn-warning p-2 px-4  mt-5' onClick={onSubForm}>אישור</button>
    </div>
    </div>
  );
}
