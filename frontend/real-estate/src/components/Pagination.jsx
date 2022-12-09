import React, { useState} from "react";
import "../pagination.css";
import CardList from "./CardList";

const Pagination = () => {
    
    const [page, setPage] = useState(1);

    const selectPage = (num) => {
        setPage(num);
    }

    const createPagination = () => {
        let pageNumbers = [];
        let maxPage = Math.ceil(totalProps / 6);
        console.log(maxPage);
        // for (let i = 1; i <= maxPage; i++) {            
        //   pageNumbers.push(
        //     <span
        //       key={i}
        //       className={`page-num ${i === page ? 'active' : ''}`}
        //       onClick={() => {
        //         selectPage(i);
        //       }}
        //     >
        //       {i}
        //     </span>
        //   );
        // }
        // return pageNumbers;
      }

    return (
        <>
            <section id="pag-container">
                <p
                onClick = {() => {
                    setPage(page - 1);
                }}>Prev </p>
                <p>{page}</p>
                <p
                onClick = {()=> {
                    setPage(page + 1);
                }}> Next</p>
            </section>
            {/* {createPagination()} */}
        </>
    )
    
}

export default Pagination;