/* eslint-disable react/jsx-props-no-spreading */

"use client";

import React, {
  useMemo,
  useState,
  useReducer,
  useEffect,
} from "react";

import { usePagination, useTable } from "react-table";
import { useRouter } from "next/navigation";

import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";

import Filter from "./filter";
import Login from "./login";

const ACTION = {
  UID: "uid",
  FULLNAME: "fullname",
  LABNO: "labno",
  PCNO: "pcno",
  PERSONALLAPTOP: "personalLaptop",
  SUBJECT: "subject",
  SEMESTER: "semester",
  SECTION: "section",
};
const initialform = {
  uid: "",
  fullname: "",
  labno: "",
  pcno: "",
  personalLaptop: false,
  subject: "",
  semester: "",
  section: "",
};

function AdminPage() {
  const router = useRouter();

  const columns = useMemo(
    () => [
      {
        Header: "UID",
        accessor: "uid",
      },
      {
        Header: "Name",
        accessor: "fullname",
        Cell: ({ value }) => value.split(" ").map((v) => v.charAt(0).toUpperCase() + v.slice(1)).join(" "),
      },
      {
        Header: "Lab no.",
        accessor: "labno",
      },
      {
        Header: "Pc no.",
        accessor: "pcno",
        Cell: ({ value }) => (value.length > 0 ? value : "N/A"),
      },
      {
        Header: "Subject",
        accessor: "subject",
      },
      {
        Header: "Semester",
        accessor: "semester",
      },
      {
        Header: "Section",
        accessor: "section",
        Cell: ({ value }) => value.toUpperCase(),
      },
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }) => {
          const date = new Date(value);
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
          const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
          return `${formattedDate} - ${formattedTime}`;
        },
      },
      {
        Header: "IP Address",
        accessor: "ip",
      },
    ],
    [],
  );

  const reducer = (form, action) => {
    switch (action.type) {
      case ACTION.UID:
        return { ...form, uid: action.payload };
      case ACTION.FULLNAME:
        return { ...form, fullname: action.payload };
      case ACTION.LABNO:
        return { ...form, labno: action.payload };
      case ACTION.PCNO:
        return { ...form, pcno: action.payload };
      case ACTION.PERSONALLAPTOP:
        return { ...form, personalLaptop: action.payload };
      case ACTION.SUBJECT:
        return { ...form, subject: action.payload };
      case ACTION.SEMESTER:
        return { ...form, semester: action.payload };
      case ACTION.SECTION:
        return { ...form, section: action.payload };
      default:
        return form;
    }
  };

  const [isLogin, setIsLogin] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filter, dispatch] = useReducer(reducer, initialform);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const data = useMemo(() => filteredData, [filteredData]);

  async function fetchData() {
    const result = await fetch("https://freaky-api.vercel.app/LabEntry/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resultData = await result.json();
    // eslint-disable-next-line no-shadow
    const { data } = resultData;
    // data = data.map((d) => {
    //   const createdAt = new Date(d.createdAt);
    //   return {
    //     ...d,
    // eslint-disable-next-line max-len
    //     createdAt: `${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`,
    //   };
    // });
    setOriginalData(data);
    setFilteredData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = originalData.filter((d) => {
      const uid = d.uid.toString();
      const semester = d.semester.toString();
      const pcno = d.pcno.toString();

      if (
        (filter.uid === "" || uid.includes(filter.uid.toLowerCase()))
        && (filter.fullname === "" || d.fullname.toLowerCase().includes(filter.fullname.toLowerCase()))
        && (filter.labno === "" || d.labno.toLowerCase().includes(filter.labno.toLowerCase()))
        && (filter.pcno === "" || pcno.toLowerCase().includes(filter.pcno.toLowerCase()))
        && (filter.subject === "" || d.subject.toLowerCase().includes(filter.subject.toLowerCase()))
        && (filter.semester === "" || semester.toLowerCase().includes(filter.semester.toLowerCase()))
        && (filter.section === "" || d.section.toLowerCase().includes(filter.section.toLowerCase()))
        && (d.personalLaptop === filter.personalLaptop || filter.personalLaptop === false)
      ) {
        return true;
      }
      return false;
    });
    setFilteredData(filtered);
  }, [filter]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageOptions,
    state: { pageIndex },
  } = useTable({ columns, data }, usePagination);

  if (!isLogin) {
    return <Login setIsLogin={setIsLogin} />;
  }

  return (
    <main className="bg-primary w-screen h-screen flex flex-col items-center justify-center">
      <header className="w-4/5 flex justify-between md:m-10 m-5">
        <h1 className="font-bold md:text-5xl text-2xl  mx-14 text-tertiary">
          Student Data
        </h1>
        <div>
          <button
            type="button"
            className="text-base p-3 bg-tertiary text-white rounded-md w-fit cursor-pointer shadow-lg active:shadow-sm mx-2"
            onClick={() => setIsFilter(!isFilter)}
          >
            <span className="text-white">
              <FaFilter />
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              router.push("/");
              setIsLogin(false);
            }}
            className="text-base p-3 bg-tertiary text-white rounded-md w-fit cursor-pointer shadow-lg active:shadow-sm"
          >
            <span className="text-white">
              <BiLogOut />
            </span>
          </button>
        </div>
      </header>
      <div className="flex w-4/5 h-4/5 relative overflow-hidden bg-white rounded-lg shadow-lg">
        <div
          className={`rounded-lg ${
            isFilter ? "md:w-2/3 w-0" : "w-full"
          } transition-all duration-700 w-f md:!overflow-x-hidden  overflow-scroll`}
        >
          {
            page.length > 0
              ? (
                <table
                  {...getTableProps}
                >
                  <thead className="sticky top-0 left-0 bg-tertiary text-white text-base font-bold">
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {
                    page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          className="hover:bg-secondary cursor-pointer"
                        >
                          {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                          ))}
                        </tr>
                      );
                    })
                    }
                  </tbody>
                </table>
              )
              : (
                <>
                  <table
                    {...getTableProps}
                  >
                    <thead className="sticky top-0 left-0 bg-tertiary text-white text-base font-bold">
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                              {column.render("Header")}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                  </table>
                  <div className="w-full h-full flex items-center justify-center text-center">
                    <h3 className="text-3xl">
                      No Data Found
                    </h3>
                  </div>
                </>
              )
            }
        </div>

        <Filter isFilter={isFilter} filter={filter} dispatch={dispatch} />
      </div>
      <br />
      <div className=" flex justify-between w-4/5 ">
        <button
          disabled={!canPreviousPage}
          className="text-base p-3 bg-tertiary text-white rounded-md w-fit cursor-pointer shadow-lg active:shadow-sm disabled:bg-secondary disabled:cursor-not-allowed"
          onClick={() => previousPage()}
          type="button"
        >
          <span>
            <AiOutlineArrowLeft size="20px" />
          </span>
        </button>

        <div className="flex items-center">
          <span className="text-base">Page</span>

          <select
            name=""
            id=""
            value={pageIndex}
            className="text-base p-2 bg-tertiary text-white rounded-md  mx-2 cursor-pointer shadow-lg active:shadow-sm "
            onChange={(e) => gotoPage(e.target.value)}
          >
            {pageOptions.map((option) => (
              <option value={option} key={option}>
                {option + 1}
              </option>
            ))}
          </select>
          <span className="text-base">
            of
            {pageOptions.length}
          </span>
        </div>

        <button
          disabled={!canNextPage}
          className="text-base p-3 bg-tertiary text-white rounded-md w-fit cursor-pointer shadow-lg active:shadow-sm  disabled:bg-secondary disabled:cursor-not-allowed"
          onClick={() => nextPage()}
          type="button"
        >
          <span className="text-white">
            <AiOutlineArrowRight size="20px" />
          </span>
        </button>
      </div>
    </main>
  );
}

export default AdminPage;
