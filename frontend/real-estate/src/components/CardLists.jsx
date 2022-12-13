import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import "../pagination.css";


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
                setTotalPages(totalProperties);
            } catch (error) {
                console.log("error", error)
            }
        };

        const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
            const handleClick = (e, page) => {
                e.preventDefault();
                setCurrentPage(page);
              };
              return (
                <div>
                    {Array.from({ length: Math.ceil(totalPages / 12) }, (_, i) => (
                        <button
                            key={`pagination-number${i + 1}`}
                            className={`pagination-number ${
                                i + 1 === currentPage ? 'active' : ''
                            }`}
                            onClick={e => handleClick(e, i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            );
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
