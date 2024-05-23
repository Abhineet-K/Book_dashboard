
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalRecords, limit, onPageChange, onLimitChange }) => {
  const totalPages = Math.ceil(totalRecords / limit);

  return (
    <div className="flex items-center justify-between mt-4 py-4 px-3 rounded-t-2xl text-slate-200 bg-slate-700">
      <div>
        <span className='text-center text-lg font-medium'>Rows per page: </span>
        <select
          value={limit}
          onChange={(e) => {
            onLimitChange(parseInt(e.target.value));
            onPageChange(1);
          }}
          className="border border-slate-500 rounded p-1 bg-slate-600 text-slate-100 outline-none "
        >
          <option value={10} >10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border p-1 rounded mx-1 relative h-9 w-20 overflow-hidden  border-blue-500 bg-slate-200  text-blue-500 shadow-2xl transition-all before:absolute before:bottom-0 before:right-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-blue-500 before:transition-all before:duration-500 hover:text-white hover:before:right-0 hover:before:w-full"
        >
          <span className="relative z-10">Previous</span>
        </button>
        <span className='mx-2'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className=" p-1 rounded mx-1  relative h-9 w-20 overflow-hidden border border-blue-500 bg-slate-200  text-blue-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-blue-500 before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full"
        >
          <span className="relative z-10">Next</span>
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onLimitChange: PropTypes.func.isRequired,
};

export default Pagination;
