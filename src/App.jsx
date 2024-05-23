import { useState, useEffect } from 'react';
import axios from 'axios';
import BookTable from './components/BookTable';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';

const App = () => {
  const [books, setBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  useEffect(() => {
    fetchBooks();
  }, [query]);

  useEffect(() => {
    updateDisplayedBooks();
  }, [page, limit, sortConfig, books]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      const bookData = response.data.docs;
      const booksWithAuthors = await Promise.all(
        bookData.map(async (book) => {
          const authorResponse = await axios.get(`https://openlibrary.org/search/authors.json?q=${book.author_name[0]}`);
          const author = authorResponse.data.docs[0];
          return {
            ...book,
            author_birth_date: author.birth_date,
            author_top_work: author.top_work,
            ratings_average: book.ratings_average ? book.ratings_average.toFixed(1) : 'Not Found',
            subject: book.subject ? book.subject.slice(0, 10) : [],
          };
        })
      );
      setBooks(booksWithAuthors);
      setPage(1);

    } catch (error) {
      console.error("Error fetching books:", error);
    }

    setLoading(false);
  };

  const updateDisplayedBooks = () => {
    let sortedBooks = [...books];
    if (sortConfig.key) {
      sortedBooks = sortedBooks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    setDisplayedBooks(sortedBooks.slice(startIndex, endIndex));
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mx-auto bg-slate-200 min-h-dvh flex flex-col justify-between">
      <div>
        <div className='flex items-center justify-between pt-4 px-6 bg-slate-600 mb-4 rounded-b-2xl'>
          <h1 className="text-2xl font-bold mb-4 text-gray-200">Book Dashboard</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        <BookTable books={displayedBooks} loading={loading} onSort={handleSort} sortConfig={sortConfig} />
      </div>
      {!loading && <Pagination currentPage={page} totalRecords={books.length} limit={limit} onPageChange={setPage} onLimitChange={setLimit} />}
    </div>
  );
};

export default App;
