import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPostRequest } from '../redux/actions/postActions';

function BlogDialog({ show, handleClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [validationError, setValidationError] = useState('');

  const dispatch = useDispatch();

  // Lấy accessToken từ Redux store
  const accessToken = useSelector((state) => state.auth.token);
  
  // Lấy trạng thái từ Redux store
  const post = useSelector((state) => state.post.post); // Thông tin post
  const error = useSelector((state) => state.post.error); // Lỗi nếu có
  const loading = useSelector((state) => state.post.loading); // Trạng thái loading

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      setValidationError('Title and content are required.');
      return;
    }

    const blogData = {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      accessToken,
    };

    // Dispatch action tạo post
    dispatch(createPostRequest(blogData));
    setValidationError(''); // Reset thông báo lỗi
  };

  // Kiểm tra khi có post thành công hoặc lỗi
  useEffect(() => {
    if (post) {
      setAlertMessage('Post created successfully!');
      setAlertType('success');
      setShowAlert(true);

      // Reset form sau khi post thành công
      setTitle('');
      setContent('');
      setTags('');
    }

    if (error) {
      setAlertMessage(`Failed to create post: ${error}`);
      setAlertType('danger');
      setShowAlert(true);
    }
  }, [post, error]);

  // Tự động ẩn thông báo sau 3 giây
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Post a New Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Thông báo */}
        {showAlert && (
          <Alert variant={alertType} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        )}
        
        {/* Thông báo lỗi nếu có */}
        {validationError && (
          <Alert variant="danger" onClose={() => setValidationError('')} dismissible>
            {validationError}
          </Alert>
        )}

        {/* Form nhập liệu */}
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formContent" className="mt-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter blog content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTags" className="mt-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BlogDialog;
