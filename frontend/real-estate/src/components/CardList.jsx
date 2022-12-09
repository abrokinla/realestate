import React, { useState, useEffect} from "react";
import Card from "./Card";
import Pagination from "./Pagination";

const CardList = ({rating}) => {
    rating == 0;
    const [myProperties, setMyProperties] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0);

    

    useEffect(() => {
        const url = `http://127.0.0.1:5000/properties?page=${currentPage}`

        const fetchData = async() => {
            try {
                const res = await fetch(url);
                const json = await res.json();                
                const totalPages=json.length;
                
                setTotalPages(totalPages);
                console.log(json);
                
                const properties = json.properties.filter(data =>
                    data.rating == parseInt(rating, 10)
                    )
                setMyProperties(properties);
            } catch (error) {
                console.log("error", error)
            }
        };

        fetchData();
    },[currentPage]);

    return (
        <>
            {myProperties.map(data =>
                <Card
                key = {data.id} {...data}/>
                )}

            <Pagination 
                totalPages={totalPages} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
            />
        </>
    )
}
export default CardList;