import React from "react";
<<<<<<< HEAD

const UserProfile = () => {

    return (
        <section id="main-profile-container">
            <h1>UserProfile</h1>
            <section id="user-banner">

            </section>
            <section id="user-profile">
                <section id="profile-picture">

                </section>
            </section>
=======
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../styles/userProfile.css";
import { checkToken } from "../components/forms/LoginForm";

const UserProfile = () => {
    const [agent, setAgent] = useState(null);

    useEffect(() => {
      const agent_id = checkToken();
      fetch(`/agents/${agent_id}`)
        .then((response) => response.json())
        .then((data) => {
          setAgent(data.agent);
        })
        .catch((error) => {
          console.error("Error fetching agent details:", error);
        });
    }, []);
    return (
        <section id="main-profile-container">
            <NavBar/>
            <h1>User Profile</h1>
            <section id="banner-container">
                <section id="user-banner">
                    {/* <img src="https://firebasestorage.googleapis.com/v0/b/real-estate-app-d5537.appspot.com/o/images%2Fuser-profile-background.jpg?alt=media&token=ef8de520-aaea-4406-ae08-c82de012f7b8"></img> */}
                </section>                
                <section id="profile-picture">

                </section>

                <section id="user-info">
                    
                    {agent && (
                        <>
                          <p>whatsapp: {agent.whatsapp}</p>
                          <p>Agent Call Number: {agent.agent_call_number}</p>
                          <p>Business web: {agent.business_web}</p>
                        </>
                    )}
                    
                </section>                
            </section>

            <section id="user-details">
            {agent && (
              <>
                <p>First Name: {agent.first_name}</p>
                <p>Last Name: {agent.last_name}</p>
                <p>E-mail Address: {agent.email}</p>
                <p>Business Name: {agent.business_name}</p>
              </>
            )}    
            </section>

            <Footer/>
            
>>>>>>> publish
        </section>
    )
}

export default UserProfile;