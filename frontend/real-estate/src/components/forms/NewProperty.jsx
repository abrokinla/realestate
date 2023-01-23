import React, { useState } from "react";
import NavBar from "../NavBar";
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
            <NavBar />
            <section id="main-form-container">
                <section id="form-container">
                    <form id="new-property-form">
                        {/* {error && <p className="error">{error}</p>}    */}
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
                                <select name="action" onChange={e => setAction(e.target.value)}>
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
                                </label>
                            </div>                        
                        </section>

                        <div className="draggable-item" draggable={true} onDragStart={handleDragStart} onDragOver={handleDragOver}>
                            <span>Drag files here</span>
                        </div>
                            <input type="file" id="file-input" accept="image/*" onChange={handleFileInputChange} multiple />
                        <div className="browse-container">
                            <div className="browse-item" onClick={handleBrowseClick}>
                                <span>or click to browse</span>
                            </div>
                        </div>

                        <div className="action">
                            <input type="submit" value="Submit" id="add-new-property" />
                        </div>

                    </form>
                </section>
            </section>
        </section>
    )
}

export default NewProperty;