import React from "react"
import NavBar from "./components/NavBar.jsx"
import Main from "./components/Main.jsx"
import Footer from "./components/Footer"


export default function App() {
    return (
        <div className="container">
            <NavBar />
            <Main />            
            <Footer />            
        </div>
    )
}

