import { useState, useMemo, useEffect } from "react";
import Table from "./Table";
import { range } from "lodash";

// const refPageLimit = 5;
// const pageLimit = 5;
const paginationDataLimit = 5;

const Pagination = ({ data }: any) => {
  console.log("all data is:", data);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(-1);
  const [startingPage, setStartingPage] = useState(0);
  const [currentPost, setCurrentPosts] = useState(data);
  const [refPageLimit, setRefPageLimit] = useState(5);
  const [pageLimit, setPageLimit] = useState(5);

  const changePage = (changedVal: any) => {
    const currentVal = currentPage + changedVal;
    setCurrentPage(currentVal);
    if (
      currentVal < startingPage ||
      currentVal > startingPage + refPageLimit - 1
    ) {
      setStartingPage((value) => value + changedVal);
    }
  };

  useEffect(() => {
    console.log("data111:", data);
    if (data.length > 0 && data.length <= 5) {
      setStartingPage(0);
      setPageLimit(1);
    } else if (data.length > 6) {
      setStartingPage(0);
      setPageLimit(5);
    }
  }, [data]);

  const pages = useMemo(() => {
    console.log("startingPage22:", startingPage);
    console.log("pageLimit22:", pageLimit);
    const pageArray = [] as any;
    range(startingPage, startingPage + pageLimit).forEach((num) => {
      pageArray.push(
        <li>
          <a
            href="/#"
            onClick={() => jumpToPage(num)}
            className={`py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 ${
              num === currentPage ? "bg-gray-300 text-black-700" : ""
            }`}
          >
            {/* dark:hover:bg-gray-700 dark:hover:text-white */}
            {num + 1}
          </a>
        </li>
        // <Pagination.Item
        //   className="paginationNos"
        //   active={num === currentPage}
        //   key={num}
        //   onClick={() => jumpToPage(num)}
        // >
        //   {num + 1}
        // </Pagination.Item>
      );
    });
    return pageArray;
  }, [currentPage, startingPage, data, pageLimit]);

  const nextPage = () => changePage(1);
  const prevPage = () => changePage(-1);
  const jumpToPage = (num: any) => setCurrentPage(num);

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data.length / paginationDataLimit));
      if (currentPage === -1) setCurrentPage(0);
    }
  }, [data, currentPage]);

  useEffect(() => {
    if (currentPage > -1 && data) {
      const offset = currentPage * paginationDataLimit;
      setCurrentPosts(data.slice(offset, offset + paginationDataLimit));
    }
  }, [currentPage, data]);

  console.log("post data:", currentPost);

  return (
    <>
      <Table currentPost={currentPost} />
      <div className="grid place-items-center h-6 mt-10">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px">
            <li>
              <a
                href="/#"
                onClick={prevPage}
                className={`py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 ${
                  currentPage === 0
                    ? "cursor-not-allowed pointer-events-none"
                    : ""
                }`}
              >
                Previous
              </a>
            </li>
            {pages}
            {/* <li>
          <a
            href="#"
            className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            1
          </a>
        </li> */}
            {/* <li>
          <a
            href="#"
            className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            2
          </a>
        </li> */}
            {/* <li>
          <a
            href="#"
            aria-current="page"
            className="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            3
          </a>
        </li> */}
            {/* <li>
          <a
            href="#"
            className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            4
          </a>
        </li> */}
            {/* <li>
          <a
            href="#"
            className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            5
          </a>
        </li> */}
            <li>
              <a
                className={`py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 ${
                  currentPage === totalPages - 1
                    ? "cursor-not-allowed pointer-events-none"
                    : ""
                }`}
                href="/#"
                onClick={nextPage}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
