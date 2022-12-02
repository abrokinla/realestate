import React, { useState, useEffect} from "react";
import Card from "./Card";

const CardList = (rating) => {

    const [myProperties, setMyProperties] = useState([])

    useEffect(() => {
        const url= "http://127.0.0.1:5000/properties"

        const fetchData = async() => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                
                const properties = json.properties.filter(data =>
                    data.rating === rating)
                setMyProperties(properties);
                console.log(properties);
            } catch (error) {
                console.log("error", error)
            }
        };

        fetchData();
    },[]);
    return (
        <>
            {myProperties.map(data =>
                <Card
                key = {data.id} {...data}/>
                )}
        </>
    )
}
export default CardList;