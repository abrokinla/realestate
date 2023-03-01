import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pagination from "./Pagination";
import "../styles/pagination.css";

const SearchList = ({ properties }) => {
  const [myProperties, setMyProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setMyProperties(properties);

    let numberOfPages = 0;
    if (properties.length % 12 !== 0) {
      numberOfPages = Math.floor(properties.length / 12) + 1;
    } else {
      numberOfPages = Math.floor(properties.length / 12);
    }

    setTotalPages(numberOfPages);
  }, [properties]);

  return (
    <>
      <section id="cards-container">
        {myProperties.map((data) => (
          <Card key={data.id} {...data} />
        ))}
      </section>

      <div id="pagination-menu">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default SearchList;