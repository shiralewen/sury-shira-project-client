import React, { useState, useEffect } from "react";
import { API_URL, doApiGet } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import {BrowserRouter,Routes,Route} from "react-router-dom"

import "./allEvents.css"
import CreateMission from "./createMission";

export default function AllEvents(props) {

  const nav = useNavigate();

  const [ar, setAr] = useState([]);
  useEffect(() => {
    
    doApi();
  }, []);

  const doApi = async () => {
    
    let url = API_URL + "/events/";
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);
    } catch (err) {
      console.log(err);
      alert("there problem ,try again later");
    }
  };
  const moreInfo = async (id) => {
    nav("/login/createMission/"+id)
  };

  
  return (

    <div class="container-fluid">
    <div className="container cont ">
      <div class="row mt-5 d-flex col-md-10 text-center">
        {ar.map((item) => (
          <div class="col-lg-3 col-md-4  bg-dark text-center p-4 card" onClick={()=>moreInfo(item._id)}>
            <img src={"../images/"+item.image}></img>
            <p>_____________________</p>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
</div>
    </div>
  );
}
