import React, { useEffect, useCallback, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogsRequest } from '../redux/actions/getBlogActions'; 
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import axios from 'axios';

const HomePage = () => {
  const dispatch = useDispatch();
  const { posts = [], page, totalPages, error } = useSelector((state) => state.getBlog) || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]); 

  const loadBlogs = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchBlogsRequest(newPage));
    }
  }, [dispatch, totalPages]);

  useEffect(() => {
    loadBlogs(page);
  }, [loadBlogs, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      loadBlogs(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      loadBlogs(page - 1);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() !== '') {
      try {
        const response = await axios.get(`https://interview-home-work-backend.onrender.com/posts/search?title=${searchTerm}`);
        // Cập nhật searchResults với dữ liệu từ API
        setSearchResults(response.data.data || []); // Cập nhật với mảng rỗng nếu không có bài viết
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]); // Nếu không có từ khóa tìm kiếm, đặt kết quả tìm kiếm thành mảng rỗng
    }
  };

  useEffect(() => {
    handleSearch(); 
  }, [searchTerm]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div style={{ margin: '20px' }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
  
      {error && <div>Error: {typeof error === 'object' ? error.message || JSON.stringify(error) : error}</div>}
      {(searchResults.length > 0 ? searchResults : filteredPosts).map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
  
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
