import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import "./privateArea.css";
export default function Card() {
  const [init, setInit] = useState({});

  const params = useParams();
  useEffect(() => {
    doApi();
  }, []);
  const [arr, setArr] = useState([]);
  const nav = useNavigate();

  const doApi = async () => {
    let bodyData =await JSON.parse(localStorage.getItem("USER_NAME"));
    console.log(bodyData.email);
    let url = API_URL + "/missions/userMissions";
    try {
      let resp = await doApiMethod(url, "POST",{email: bodyData.email});
       console.log(resp.data);
      setArr(resp.data);
      let date=arr.data.toLocaleDateString();
 
    } catch (err) {
      console.log(err.response);
      // alert("somthing wrong in the page");
    }
  };

  const moreInfo = async (id) => {
    nav("/login/theBigMission/"+id)
  };

  return (
    <div>
    <div className='container-fluid'>
       <div class="container row allcards">
 <h1>האירועים שלי</h1>
 {arr.map((mission) => (
 <div class="reminder col-md-3" onClick={()=>moreInfo(mission._id)}>
 <i class="fa fa-thumb-tack" aria-hidden="true"></i>

  <h2>{mission.description}</h2>
  <p>{mission.place}</p>
  <p>{mission.hour}</p>
  <p class="date">{(new Date(mission.date).toLocaleDateString())}</p>
 
 </div>
 ))}
 </div>
 </div>


    {/* <div className="container-fluid">
      <div className="row container col-md-6 mx-0 allcards m-5 " >
        {arr.map((mission) => (
          <>

            <div className="note col-md-3" >
              {mission.description}
              <br />
              {(new Date(mission.date).toLocaleDateString())}
              <br />
              בשעה:{mission.hour}
              <br />{mission.place}
            </div>{" "}
          </>
        ))}{" "}
      </div>
    </div> */}
    </div>
  );
}
