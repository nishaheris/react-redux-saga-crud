import React, { useEffect, useState } from "react";
import RenderComponent from "./RenderComponent";
import usePaginationRange, { DOTS } from "./usePaginationRange";
import "../components/pagination.css";

const Pagination = ({
  data,
  title,
  buttonConst,
  contentPerPage,
  siblingCount,
}) => {
  const [totalPageCount] = useState(Math.ceil(data.length / contentPerPage));
  const [currentPage, setCurrentPage] = useState(1);

  const paginationRange = usePaginationRange({
    totalPageCount,
    contentPerPage,
    buttonConst,
    siblingCount,
    currentPage,
  });

  useEffect(() => {
    window.scrollTo(
      {
        behavior: "smooth",
        top: "0px",
      },
      [currentPage]
    );
  });

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
  function gotToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }
  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }
  const getPaginatedData = () => {
    const startIndex = currentPage * contentPerPage - contentPerPage;
    const endIndex = startIndex + contentPerPage;
    return data.slice(startIndex, endIndex);
  };
  return (
    <div>
      <h1>{title}</h1>
      <div className="dataContainer">
        <table className="paginationTable">
          <tr>
            <th>Employee Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Experience</th>
            <th>Contact</th>
          </tr>

          {getPaginatedData().map((dataItem, index) => (
            <RenderComponent key={index} data={dataItem} />
          ))}
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={gotToPreviousPage}
          className={` prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          Previous
        </button>

        {paginationRange &&
          paginationRange.map((item, index) => {
            if (item === DOTS) {
              return (
                <button key={index} className={`paginationItem`}>
                  &#8230;
                </button>
              );
            }
            return (
              <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${
                  currentPage === item ? "active" : null
                }`}
              >
                <span>{item}</span>
              </button>
            );
          })}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === totalPageCount ? "disabled" : ""}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
