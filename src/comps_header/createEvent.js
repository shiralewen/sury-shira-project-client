import React, { useState } from 'react';
import "./addEventAdmin.css"

export default function AddEventAdmin() {
 const [items, setItems] = useState([]);
 const [inputValue, setInputValue] = useState('');

 const handleInputChange = (event) => {
  setInputValue(event.target.value);
 };

 const handleAddItem = () => {
  if (inputValue.trim() !== '') {
   setItems([...items, { content: inputValue }]);
   setInputValue('');
  }
 };

 const handleDeleteItem = (index) => {
  const newItems = [...items];
  newItems.splice(index, 1);
  setItems(newItems);
 };

 return (
  <div className="container">
   <label>שם המשימה</label>
   <input type='text' className='form-control'/>
   <label>תיאור המשימה</label>
   <input type='text' className='form-control'/>
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
       <input type="checkbox" className="check" />
       <label>{item.content}</label>
       <a
        className="delete"
        href="#"
        onClick={() => handleDeleteItem(index)}>
        X
       </a>
      </li>
     ))}
    </ul>
    
   </div>
   <h1>משימות</h1>
   <div className="add">
    <input
     type="text"
     placeholder="הוספת משימה"
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
       <input type="checkbox" className="check" />
       <label>{item.content}</label>
       <a
        className="delete"
        href="#"
        onClick={() => handleDeleteItem(index)}>
        X
       </a>
      </li>
     ))}
    </ul>
    
   </div>
  </div>
 );
}

