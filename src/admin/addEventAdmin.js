import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doApiMethod, API_URL, TOKEN_NAME } from "../services/apiService";
import { useForm } from "react-hook-form";
import "./addEventAdmin.css";

export default function AddEventAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const nav = useNavigate();
  const nameRef = register("name", { required: true, minLength: 4 });
  const descriptionRef = register("description", {
    required: true,
    minLength: 6,
  }); 


   const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

 const [items1, setItems1] = useState([]);
  const [inputValue1, setInputValue1] = useState("");

  // setItems ("ingredientList", {
  //   required: true
  // });
  // setItems1 ("taskList", { required: true});

  // const onSubForm = (bodyData) => {
    
  //   console.log(bodyData);
  //   doApiForm(bodyData);
  // };

  const doApiForm = async (bodyData) => {
    bodyData.ingredientList=items;
    bodyData.taskList=items1
    let url = API_URL + "/events";
    try {
      let resp = await doApiMethod(url, "POST", bodyData);
      // לשמור את הטוקן
      // localStorage.setItem(TOKEN_NAME, resp.data.token);
      if(resp.data._id){
        alert("product added succefuly");
       
      nav("/admin/allEvents");
      }
      else{
        alert("There problem , try again later")
      }

      // console.log(resp.data)
    } catch (err) {
      console.log(err.response);
      alert("somthing wrong in the page");
    }
  };




  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !="") {
      setItems([...items,inputValue ]);
      setInputValue("");
    }
  };

  const handleDeleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

 

  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  };

  const handleAddItem1 = () => {
    if (inputValue1.trim() != "") {
      setItems1([...items1, inputValue1 ]);
      setInputValue1("");
    }
  };

  const handleDeleteItem1 = (index) => {
    const newItems = [...items1];
    newItems.splice(index, 1);
    setItems1(newItems);
  };
  return (
    <div   className="container-fluid mt-5 addAdmin">
      <div className="name col-md-8">
        <label>שם המשימה</label>
        <input type="text" {...nameRef} className="form-control b1" />
        <label>תיאור המשימה</label>
        <input type="text" {...descriptionRef} className="form-control b1" />
      </div>
      <div className="all col-md-10">
        <div className="container col-md-5 ">
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
             
              {items?.map((item, index) => (
                <li key={index}>
                  <input type="checkbox" className="check" />
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
        <div className="container col-md-5 float-left">
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

              {items1?.map((item, index) => (
                <li key={index}>
                  <input type="checkbox" className="check" />
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
      <div className="container send ">
        <button className="btn btn-warning p-2 px-4 mt-5"  onClick={handleSubmit(doApiForm)}>
          אישור
        </button>
      </div>
    </div>
  );
}
