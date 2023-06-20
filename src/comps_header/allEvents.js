import React from 'react'

export default function AllEvents(props) {
  return (
   <div className='container row'>
    props.events.map(
        <a href="./missions/:idEvent" target='_blank'>
        <div className="card" id={props.icon}>
          <div className="top"><p className={props.icon}></p></div>
          <div className="bottom"><hr/><p>{props.name}</p></div>
        </div>
      </a>
    )
<div></div>
   </div>
  )
}
