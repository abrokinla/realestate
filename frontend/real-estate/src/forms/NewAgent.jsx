import react, { useState } from "React";

const NewAgent = () => {
    const [inputs, setInputs] = useState({});

    return (
        <>
            <form>
                <label>First Name:
                    <input
                    type="text"
                    name="first_name"
                    value= {inputs.first_name || ""}
                    />
                </label>

                <label>Last Name:
                    <input
                    type="text"
                    name="last_name"
                    value= {inputs.last_name || ""}
                    />
                </label>

                <label>Business Name:
                    <input
                    type="text"
                    name="business_name"
                    value= {inputs.business_name || ""}
                    />
                </label>

                <label>Email:
                    <input
                    type="email"
                    name="email"
                    value= {inputs.email || ""}
                    />
                </label>

                <label>Password:
                    <input
                    type="password"
                    name="pword"
                    value= {inputs.pword || ""}
                    />
                </label>

                <label>Verify Password:
                    <input
                    type="password"
                    name="pword"
                    // value= {}
                    />
                </label>

                <label>Mobile Number:
                    <input
                    type="tel"
                    name="tel"
                    value= {inputs.tel || ""}
                    />
                </label>

                <label>Whatsapp:
                    <input
                    type="tel"
                    name="whatsapp"
                    value= {inputs.whatsapp || ""}
                    />
                </label>

                <label>Business Website:
                    <input
                    type="url"
                    name="businees_web"
                    value= {inputs.business_web || ""}
                    />
                </label>
            </form>
        </>
    )
}
export default NewAgent;