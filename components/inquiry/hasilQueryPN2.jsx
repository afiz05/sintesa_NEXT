import React, { useState, useContext, useEffect } from "react";
import MyContext from "../../utils/Context";
import numeral from "numeral";
import { handleHttpError } from "../notifikasi/toastError";
import DataExport from "../CSV/formatCSV";
import ReactPaginate from "react-paginate";
import { Tgupdate } from "./hasilQuery";

const HasilQueryPN2 = (props) => {
  const { showModalPN2, closeModalPN2 } = props;
  const { axiosJWT, token, sql, from, thang } = useContext(MyContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [executionTime, setExecutionTime] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    if (showModalPN2) {
      fetchData();
    }
  }, [showModalPN2, currentPage]);

  useEffect(() => {
    if (data.length > 0) {
      const results = data.filter(item => 
        Object.values(item).some(val => 
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(results);
    }
  }, [searchTerm, data]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const startTime = performance.now();
      const response = await axiosJWT.post(
        "/api/inquiry/getPN2",
        {
          sql,
          page: currentPage,
          limit: itemsPerPage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const endTime = performance.now();
      setExecutionTime((endTime - startTime) / 1000); // Convert to seconds
      
      if (response.data) {
        setData(response.data.data || []);
        setTotalData(response.data.total || 0);
        setPageCount(Math.ceil((response.data.total || 0) / itemsPerPage));
      }
    } catch (error) {
      handleHttpError(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const formatNumber = (num) => {
    return numeral(num).format("0,0");
  };

  // Function to determine if a column should be right-aligned (for numeric values)
  const isNumericColumn = (header) => {
    return ['pagu', 'jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'ags', 'sep', 'okt', 'nov', 'des', 'vol'].includes(header.toLowerCase());
  };

  if (!showModalPN2) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Data Capaian Output {thang}</h2>
            <button 
              onClick={closeModalPN2}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          {executionTime && (
            <p className="text-sm text-gray-500 mt-1">
              Query executed in {executionTime.toFixed(2)} seconds
            </p>
          )}
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded px-3 py-2 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-600">
              Total: {totalData} records
            </div>
          </div>
          
          <div className="mt-2">
            <Tgupdate />
          </div>
          
          <div className="mt-2">
            <DataExport data={data} filename={`capaian_output_${thang}`} />
          </div>
        </div>
        
        <div className="overflow-auto max-h-[calc(90vh-200px)]">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center p-8 text-gray-500">
              No data available
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  {data.length > 0 && Object.keys(data[0]).map((header, index) => (
                    <th 
                      key={index}
                      className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        isNumericColumn(header) ? 'text-right' : 'text-left'
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(searchTerm ? filteredData : data).map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {Object.entries(row).map(([key, value], cellIndex) => (
                      <td 
                        key={cellIndex}
                        className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
                          isNumericColumn(key) ? 'text-right' : 'text-left'
                        }`}
                      >
                        {isNumericColumn(key) && typeof value === 'number' 
                          ? formatNumber(value) 
                          : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className="p-4 border-t">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center mt-4 space-x-1"}
            pageClassName={"px-3 py-1 rounded border hover:bg-gray-100"}
            previousClassName={"px-3 py-1 rounded border hover:bg-gray-100"}
            nextClassName={"px-3 py-1 rounded border hover:bg-gray-100"}
            breakClassName={"px-3 py-1"}
            activeClassName={"bg-blue-500 text-white"}
          />
        </div>
      </div>
    </div>
  );
};

export default HasilQueryPN2;