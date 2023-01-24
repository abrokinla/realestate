import React, { useState } from "react";
import axios from "axios";
import "../../styles/newproperty.css"

const NewProperty = () => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [location, setLocation] = useState("");
    const [bed, setBed] = useState("");
    const [bath, setBath] = useState("");
    const [toilet, setToilet] = useState("");
    const [action, setAction] = useState("");
    const [status, setStatus] = useState("");
    const [agentId, setAgentId] = useState("");

    const handleNewProperty = (e) => {
        e.preventDefault();
        const desc = description;
        const amt = amount;
        const loca = location;
        const numBed = bed;
        const numBath = bath;
        const numToilet = toilet;
        const act= action;
        const stat = status;
        const agtId = agentId;

        axios.post("http://loacalhost:5000/properties", {
            description : desc,
            amount : amt,
            location : loca,
            bed : numBed,
            bath : numBath,
            toilet : numToilet,
            action: act,
            status : stat,
            rating : "1",
            agentId:  agtId,
        })
        .then(res => {
            alert('New Property Added')
        })
        .catch(error => {
        // If there is an error, display the error message
        console.error(error.response.data.error);
        });
    }
    
    
    //   const handleChange = (event) => {
    //     setInputs({
    //       ...inputs,
    //       [event.target.name]: event.target.value,
    //     });
    //   };

      const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
      }
      
      const handleDragOver = (e) => {
        e.preventDefault();
      }
      
      const handleFileInputChange = (e) => {
        // handle file input changes here
      }
      
      const handleBrowseClick = () => {
        document.getElementById("file-input").click();
      }
      

    return (
        <section id="main-container">
            <section id="main-form-container">
                <section id="form-container">
                    <h1>Add New Property</h1>
                    <form id="new-property-form">                        
                        {error && <p className="error">{error}</p>}   
                        <div className="input-field">
                            <label> Description:
                                <textarea maxlength="120"
                                    name="description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="input-field">
                            <label>Amount:
                                <input
                                    type="number"
                                    name="amount"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="input-field">                        
                            <label>Location:
                                <input
                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                />
                            </label>
                        </div>

                        <section id="form-group">
                            <div className="input-field">                        
                                <label>Number of bedrooms:
                                    <select name="bed" 
                                        value={bed} 
                                        onChange={e => setBed(e.target.value)}>
                                            {Array.from(Array(10).keys()).map((value) => (
                                            <option key={value} value={value + 1}>{value + 1}</option>
                                            ))}
                                    </select>
                                </label>
                            </div>

                            <div className="input-field">
                                <label>Number of bathroom:
                                    <select name="bath" 
                                        value={bath} 
                                        onChange={e => setBath(e.target.value)}>
                                            {Array.from(Array(10).keys()).map((value) => (
                                            <option key={value} value={value + 1}>{value + 1}</option>
                                            ))}
                                    </select>
                                </label>
                            </div>

                            <div className="input-field">
                                <label>Number of toilet:
                                    <select name="toilet" 
                                        value={toilet} 
                                        onChange={e => setToilet(e.target.value)}>
                                            {Array.from(Array(10).keys()).map((value) => (
                                            <option key={value} value={value + 1}>{value + 1}</option>
                                            ))}
                                    </select>                    
                                </label>
                            </div>
                        </section>

                        <div className="input-field">
                            <label>Property for:
                                <select name="action" id="action" onChange={e => setAction(e.target.value)}>
                                    <option value="">Choose option</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Sale">Sale</option>
                                    <option value="Rent/Sale">Rent/Sale</option>
                                </select>
                            </label>
                        </div>    

                        <section id="form-group">
                            <div className="input-field">
                                <label>Status of property:
                                    <div id="status-cont">
                                        <input 
                                            type="radio" 
                                            id="status-new"
                                            name="status" 
                                            value="New"
                                        />
                                        <label for="status-new" onChange={e => setStatus(e.target.value)}>New</label>
                                        <input 
                                            type="radio" 
                                            id="status-renovated"
                                            name="status" 
                                            value="Renovated"
                                        />
                                        <label for="status-renovated" onChange={e => setStatus(e.target.value)}>Renovated</label>                    
                                    </div>
                                </label>
                            </div>                        
                        </section>
                        <p>Add images</p>
                        <div className="draggable-item" draggable={true} onDragStart={handleDragStart} onDragOver={handleDragOver} onClick={handleBrowseClick}>
                            <span>Drag files here</span>

                            <div className="browse-item" onClick={handleBrowseClick}>
                                <span><em>or click to browse</em></span>
                            </div>
                        </div>
                            <input type="file" id="file-input" accept="image/*" onChange={handleFileInputChange} multiple />
                        {/* <div className="browse-container">
                            
                        </div> */}

                        <div className="action">
                            <input type="submit" value="Submit" id="add-new-property" onClick={handleNewProperty} />
                        </div>

                    </form>
                </section>
            </section>
        </section>
    )
}

export default NewProperty;