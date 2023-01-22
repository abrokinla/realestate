import React, { useState } from "react";
import NavBar from "../NavBar";
import "../../styles/newproperty.css"

const NewProperty = () => {
    const [inputs, setInputs] = useState({
        description: "",
        amount: "",
        location: "",
        bed: "",
        bath: "",
        toilet: "",
        action: "choose option",
        status: "",
      });
    
      const handleChange = (event) => {
        setInputs({
          ...inputs,
          [event.target.name]: event.target.value,
        });
      };

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
                        {error && <p className="error">{error}</p>}   
                        <div className="input-field">
                            <label> Description:
                                <textarea maxlength="120"
                                    name="description"
                                    defaultValue={inputs.description}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div className="input-field">
                            <label>Amount:
                                <input
                                    type="number"
                                    name="amount"
                                    defaultValue={inputs.amount}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div className="input-field">                        
                            <label>Location:
                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={inputs.location}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <section id="form-group">
                            <div className="input</div>-field">                        
                                <label>Number of bedrooms:
                                    <select name="bed" 
                                        value={inputs.bed || ""} 
                                        onChange={handleChange}>
                                            {Array.from(Array(10).keys()).map((value) => (
                                            <option key={value} value={value + 1}>{value + 1}</option>
                                            ))}
                                    </select>
                                </label>
                            </div>

                                
                                    <label>Number of bathroom:
                                        <select name="bath" 
                                            value={inputs.bath || ""} 
                                            onChange={handleChange}>
                                                {Array.from(Array(10).keys()).map((value) => (
                                                <option key={value} value={value + 1}>{value + 1}</option>
                                                ))}
                                        </select>
                                    </label>

                                    <label>Number of toilet:
                                        <select name="toilet" 
                                            value={inputs.toilet || ""} 
                                            onChange={handleChange}>
                                                {Array.from(Array(10).keys()).map((value) => (
                                                <option key={value} value={value + 1}>{value + 1}</option>
                                                ))}
                                        </select>                    
                                    </label>
                        </section>

                            <label>Property for:
                                <select name="action" onChange={handleChange}>
                                    <option value="">Choose option</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Sale">Sale</option>
                                    <option value="Rent/Sale">Rent/Sale</option>
                                </select>
                            </label>

                        <label>Status of property:
                            <input 
                                type="radio" 
                                id="status-new"
                                name="status" 
                                value="New"
                            />
                            <label for="status-new">New</label>
                            <input 
                                type="radio" 
                                id="status-renovated"
                                name="status" 
                                value="Renovated"
                            />
                            <label for="status-renovated">Renovated</label>                    
                        </label>

                        <div className="draggable-item" draggable={true} onDragStart={handleDragStart} onDragOver={handleDragOver}>
                            <span>Drag files here</span>
                        </div>
                            <input type="file" id="file-input" accept="image/*" onChange={handleFileInputChange} multiple />
                        <div className="browse-container">
                            <div className="browse-item" onClick={handleBrowseClick}>
                                <span>or click to browse</span>
                            </div>
                        </div>

                        <input type="submit" value="Submit" className="action" />

                    </form>
                </section>
            </section>
        </section>
    )
}

export default NewProperty;