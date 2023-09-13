import React from "react";

const Cart = ({ select,remaining,cost }) => {
  return (
    <div className="w-1/3 font-semibold">
      <h3>This is the Cart.</h3>
      <p>Total Selection : {select.length}</p> 
      <h2>Remaining:{remaining}</h2>
      <h2>Total Cost:{cost}</h2>
      <hr className=" my-3" />

      {select.map((act) => (
        <li key={act.id} className=" list-decimal">{act.name}</li>
      ))}
    </div>
  );
};

export default Cart;
