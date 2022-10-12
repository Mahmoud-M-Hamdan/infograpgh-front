import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./form.css";

const AddPackage = (props) => {
  const history=useHistory()
 const [doneState,setDoneState]=useState(null)
  const [name, setName] = useState("fedix");
  const [labels, setLabels] = useState({});
  const [serviceID, setServiceID] = useState([]);
  const [serviceIDName, setServiceIDName] = useState([]);
  const width = useRef();
  const height = useRef();
  const length = useRef();
  const weight = useRef();
  const serviceProviderHandleer = () => {
    let e = document.getElementById("gg");
    let text = e.options[e.selectedIndex].text;
    console.log(text);
    setName(text);
  };
  const serviceIdHandleer = () => {
    let e = document.getElementById("dd");
    let text = e.options[e.selectedIndex].text;
    console.log(text);
    setServiceIDName(text);
  };
  const submitHandler = (e) => {
    e.preventDefault() 
    const obj = {
      serviceProvider: name,
      serviceID: serviceIDName,
      width: width.current.value,
      height: height.current.value,
      length: length.current.value,
      weight: weight.current.value,
    };
    console.log(obj);
    const sendData = async () => {
      const token=localStorage.getItem('token')
      try {
        const response = await fetch("https://infograph-backk.herokuapp.com/packages", {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            'Authorization': 'Bearar '+ token, 
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw "check your values";
        }
        setDoneState('Done !, you will redirect to your packages page soon')
        console.log("good");
setTimeout(()=>{
history.push('/viewpackage')
},1000)
      } catch (error) {
        console.log(error);
      }
    };
    sendData();
    width.current.value = "";
    height.current.value = "";
    length.current.value = "";
    weight.current.value = "";
  };

  useEffect(() => {
    if (name === "UPS") {
      setLabels({
        width: "width [inch]",
        height: "height [inch]",
        length: "length [inch]",
        weight: "weight [pound]]",
      });
      setServiceID(["UPSExpress", "UPS2DAY"]);
    } else {
      setLabels({
        width: "width [cm]",
        height: "height [cm]",
        length: "length [cm",
        weight: "weight [gram]",
      });
      setServiceID(["fedexAIR", "fedexGroud"]);
    }
  }, [name]);
  return (
    <>
      <div className="layout-div">
        <form className="form-layout" onSubmit={submitHandler}>
          <div className="ceils-field">
            <label>Choose the company</label>
            <select id="gg" onChange={serviceProviderHandleer} required>
            <option value="" disabled selected>Choose the Service Provider</option>
              <option value="1">FedEx</option>
              <option value="2">UPS</option>
            </select>
          </div>
          <div className="ceils-field">
            <label>ServiceID</label>
            <select id="dd" onChange={serviceIdHandleer} required>
              <option value="" disabled selected>Choose the Service id</option>
              <option value="1">{serviceID[0]}</option>
              <option value="2">{serviceID[1]}</option>
            </select>
          </div>

          <div>
            <p>packageDetails</p>
            <div className="ceils-field">
              {" "}
              <label>{labels.width} </label>
              <input type="number" ref={width} required></input>
            </div>
            <div className="ceils-field">
              <label>{labels.height}</label>
              <input type="number" ref={height} required></input>
            </div>
            <div className="ceils-field">
              <label>{labels.length}</label>
              <input type="number" ref={length} required></input>
            </div>
            <div className="ceils-field">
              {" "}
              <label>{labels.weight}</label>
              <input type="number" ref={weight} required></input >
            </div>
            {doneState}
            <div>
              <button className="btn">Add package</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPackage;
