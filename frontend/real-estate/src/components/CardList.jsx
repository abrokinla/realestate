import React, { useState, useEffect} from "react";

const CardList = () => {

    useEffect(() => {
        const url= "http://127.0.0.1:5000/properties"

        const fetchData = async() => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                console.log(json);
            } catch (error) {
                console.log("error", error)
            }
        };

        fetchData();
    },[]);
    return (
        <>
        
        </>
    )
}