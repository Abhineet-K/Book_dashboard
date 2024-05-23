
import PropTypes from 'prop-types';
import SortButton from './SortButton';

const BookTable = ({ books, loading, onSort, sortConfig, loadingMessage }) => {
  if (loading) {
    return <div className=' flex items-start justify-center  '>

      <div className='flex items-end gap-1 text-5xl mt-20 text-slate-700'>
        <span className='mr-3'>{loadingMessage}</span>
        <div className='h-3 w-3 bg-slate-700 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-3 w-3 bg-slate-700 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-3 w-3 bg-slate-700 rounded-full animate-bounce'></div>
      </div>
    </div>;
  }

  return (
    <table>
      <thead className='bg-slate-400'>
        <tr className=' h-12 border-y border-y-slate-700'>
          <th className="py-2 px-4  border-r border-r-slate-700 ">
            Sr. No
          </th>
          <th className="py-2 px-4  border-r border-r-slate-700 w-[15%]">
            <SortButton columnKey="title" onSort={onSort} sortConfig={sortConfig} className="" >
              Title
            </SortButton>
          </th>
          <th className="py-2 px-4 border-r border-r-slate-700 w-[15%]">
            <SortButton columnKey="author_name" onSort={onSort} sortConfig={sortConfig}>
              Author
            </SortButton>
          </th>
          <th className="py-2 px-4 border-r border-r-slate-700 w-[5%] ">
            <SortButton columnKey="first_publish_year" onSort={onSort} sortConfig={sortConfig}>
              First Publish Year
            </SortButton>
          </th>
          <th className="py-2 px-4 border-r border-r-slate-700 w-[35%] ">
            <SortButton columnKey="subject" onSort={onSort} sortConfig={sortConfig}>
              Subject
            </SortButton>
          </th>
          <th className="py-2 px-4 border-r border-r-slate-700  w-[5%]">
            <SortButton columnKey="ratings_average" onSort={onSort} sortConfig={sortConfig}>
              Ratings Average
            </SortButton>
          </th>
          <th className="py-2 px-4 border-r border-r-slate-700 w-[5%]">
            <SortButton columnKey="author_birth_date" onSort={onSort} sortConfig={sortConfig}>
              Author Birth Date
            </SortButton>
          </th>
          <th className="py-2 px-4  w-[20%]">
            <SortButton columnKey="author_top_work" onSort={onSort} sortConfig={sortConfig}>
              Author Top Work
            </SortButton>
          </th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={index} className='bg-slate-300'>
            <td className="py-2 px-4 border-r border-b font-medium">{index + 1}</td>
            <td className="py-2 px-4 border-r border-b font-medium">{book.title ? book.title : "Not Found"}</td>
            <td className="py-2 px-4 border-r border-b">{book.author_name[0] ? book.author_name[0] : "Not Found"}</td>
            <td className="py-2 px-4 border-r border-b">{book.first_publish_year ? book.first_publish_year : "Not Found"}</td>
            <td className="py-2 px-4 border-r border-b">{book.subject.join(', ') ? book.subject : "Not Found"}</td>
            <td className="py-2 px-4 border-r border-b">{book.ratings_average}</td>
            <td className="py-2 px-4 border-r border-b">{book.author_birth_date ? book.author_birth_date : "Not Found"}</td>
            <td className="py-2 px-4 border-b">{book.author_top_work ? book.author_top_work : "Not Found"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

BookTable.propTypes = {
  books: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.object.isRequired,
};

export default BookTable;
