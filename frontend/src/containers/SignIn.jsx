import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../redux/actions/authActions'; // Import action loginRequest
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/SignIn.scss';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error); // Lấy lỗi từ Redux state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Lấy trạng thái xác thực từ Redux state
  const accessToken = useSelector((state) => state.auth.token); // Lấy access token từ Redux state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest({
      username: formData.username,
      password: formData.password,
    }));
  };

  // Kiểm tra isAuthenticated để điều hướng đến HomePage
  useEffect(() => {
    if (isAuthenticated) {
      if (formData.rememberMe) {
        // Nếu "Remember Me" được chọn, lưu accessToken vào localStorage
        localStorage.setItem('accessToken', accessToken);
      }
      navigate('/home');
    }
  }, [isAuthenticated, navigate, accessToken, formData.rememberMe]);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px' }} className="p-4 shadow">
        <h2 className="text-center">Sign In</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formRememberMe" className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              label="Remember Me"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>} {/* Hiển thị lỗi nếu có */}

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Sign In
          </Button>
        </Form>
        <div className="text-center mt-3">
          <p>
            Don't have an account?{' '}
            <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default SignIn;
