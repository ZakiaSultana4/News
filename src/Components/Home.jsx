import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import swal from 'sweetalert';


const Home = () => {
  const [actors, setActors] = useState([]);
  const [select, setSelect] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const [cost, setCost] = useState(0);
  const budge = 20000;

  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setActors(data));
  }, []);

  const handleSelect = (act) => {
    const isExist = select.find((item) => item.id === act.id);

    let count = act.salary;

    if (isExist) {
      return swal({
        title: "OPPS !",
        text: "The Actor is Already been Selected",
        icon: "info",
        button: "Back",
      });
    } else {
      select.forEach((item) => {
        count = count + item.salary;
      });
      const totalRemaining = budge - count;
      if (count > budge) {
         return swal({
            title: "OPPS !",
            text: "Taka sesh",
            icon: "error",
            button: "Back",
          });
      } else {
        setCost(count);
        setRemaining(totalRemaining);
        setSelect([...select, act]);
      }
    }
  };

  return (
    <div className="flex flex-row ">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-y-12 w-2/3">
        {actors.map((act) => (
          <div className="card w-96 bg-base-100 shadow-lg">
            <figure>
              <img src={act.image} className=" rounded-full" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Name : {act.name}</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Consectetur accusantium minima modi ipsum saepe!
              </p>
              <div className="flex font-medium my-5">
                <p>Salary:{act.salary}</p>
                <p>Role:{act.role}</p>
              </div>
              <div className="card-actions justify-center">
                <button
                  onClick={() => handleSelect(act)}
                  className="btn btn-primary my-6"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className=" w-1/3">
        <Cart select={select} remaining={remaining} cost={cost}></Cart>
      </div>
    </div>
  );
};

export default Home;
