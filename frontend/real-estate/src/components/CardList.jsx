import React, { useState, useEffect} from "react";
import Card from "./Card";

const CardList = ({rating, page}) => {
    rating == 0;
    const [myProperties, setMyProperties] = useState([])
    

    useEffect(() => {
        const url= `http://127.0.0.1:5000/properties?page=${page}`

        const fetchData = async() => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                
                const properties = json.properties.filter(data =>
                    data.rating == parseInt(rating, 10)
                    )
                setMyProperties(properties);
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
            
            
            {/* <div>
                <p
                onClick={() =>{
                    setPage(page - 1);
                    fetchData();
                }}>
                    Prev
                    </p>
                <p
                onClick={() => {
                    setPage(page + 1);
                    fetchData();
                }}>
                    Next</p>
                {createPagination()}
                </div> */}
        </>
    )
}
export default CardList;