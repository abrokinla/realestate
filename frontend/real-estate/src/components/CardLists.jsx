import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import "../styles/pagination.css";


const CardLists =() => {
    
    const [myProperties, setMyProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const url = `http://127.0.0.1:5000/properties?page=${currentPage}`

    useEffect(() => {

        const fetchData = async() => {
            try {
                const res = await fetch(url);
                const json = await res.json();

                const myProps = json.properties;
                const totalProperties = json.total_properties;

                setMyProperties(myProps);
                // calculate number of pages
                let numberOfPages = 0;
                if(totalProperties % 12 !== 0) {
                    numberOfPages = ((totalProperties/12) + 1);
                } else {
                    numberOfPages = (totalProperties/12);
                }
                
                setTotalPages(numberOfPages);

            } catch (error) {
                console.log("error", error)
            }
        };

        
        

        fetchData();
    },[currentPage]);

    return (
        <>
            <section id="cards-container">
                {myProperties.map(data =>
                    <Card
                    key = {data.id} {...data}/>
                    )}
            </section>

            <div id="pagination-menu">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    )
    
}

export default CardLists;
