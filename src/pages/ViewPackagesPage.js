import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../store/auth";

import "./vpack.css";
const ViewPackage = () => {
  const ctx = useContext(AuthContext);
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    const getMyData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3030/packages", {
        method: "GET",
        headers: {
          Authorization: "Bearar " + token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPackages(data);
      console.log(data);
    };

    getMyData();
  }, []);



  return (
    <>
      <h1 className="sen">Hello {ctx.user} , Here Your Packages </h1>
      <div className="layoo">
        {packages.length === 0
          ? <p className="nopack">There is no packages or still loading</p>
          : packages.map((ele) => {
              return (
                <>
                  {" "}
                  <div className="card">
                    <img
                      src="https://www.shiplilly.com/wp-content/uploads/2016/06/AdobeStock_109502859-846x565.jpeg"
                      alt="Avatar"
                      style={{ width: "100%" }}
                    />
                    <div className="container">
                      <h3> Shipment No.</h3>
                      <p> {ele.IDs}</p>

                      <h4>
                        {" "}
                        Service ID : <b>{ele.serviceID}</b>
                      </h4>
                      <h4>Packages Details</h4>
                      <p>Height : {ele.height}</p>
                      <p> Weight :{ele.weight}</p>
                      <p>Width :{ele.width}</p>
                      <p>Length:{ele.length}</p>
                    </div>
                  </div>
                  ;
                </>
              );
            })}
      </div>
    </>
  );
};

export default ViewPackage;
