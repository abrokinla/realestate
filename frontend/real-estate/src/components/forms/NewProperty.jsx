import react, { useState } from "React";

const NewProperty = () => {
    const [inputs, setInputs] = useState({});
    const [status, setStatus] = useState("");

    const handleChange = (event) => {        
        setStatus(event.target.value)
    }

    return (
        <>
            <form>
                <label> Description:
                    <textarea maxlength="120"
                    name="description"
                    value= {inputs.description ||""}>

                    </textarea>
                </label>
                
                <label>Amount:
                    <input
                    type="number"
                    name="amount"
                    value= {inputs.amount || ""}
                    />
                </label>
                
                <label>Location:
                    <input
                    type="text"
                    name="location"
                    value= {inputs.location || ""}
                    />
                </label>
                
                <label>Number of bedroom:
                    <input
                    type="text"
                    name="bed"
                    value= {inputs.bed || ""}
                    />
                </label>

                <label>Number of bathroom:
                    <input
                    type="text"
                    name="bath"
                    value= {inputs.bath || ""}
                    />
                </label>

                <label>Number of toilet:
                    <input
                    type="text"
                    name="toilet"
                    value= {inputs.toilet || ""}
                    />
                </label>

                <label>Property for:
                    <select name = "action" value="choose option" onChange = {handleChange}>
                        <option value="Rent">Rent</option>
                        <option value="Sale">Sale</option>
                        <option value="Rent/Sale">Rent/Sale</option>
                    </select>
                </label>

                <label>Status of property:
                    <input 
                    type="radio" 
                    name="status" 
                    value="New"
                    />
                    <label for="new">New</label>
                    
                    <input 
                    type="radio" 
                    name="status" 
                    value="Renovated"
                    />
                    <label for="renovated">Renovated</label>                    
                </label>
            </form>
        </>
    )
}

export default NewProperty;