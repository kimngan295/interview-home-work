import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupRequest,resetSignupMessage } from '../redux/actions/signupActions'; // Import action signupRequest
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/SignUp.scss';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    dob: '',
  });

  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Lấy state từ signupReducer
  const signupMessage = useSelector((state) => state.signup.signupMessage);
  const signupError = useSelector((state) => state.signup.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra mật khẩu
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Dispatch signupRequest action
    dispatch(signupRequest(formData));
  };

  // Hiển thị thông báo sau khi đăng ký thành công
  useEffect(() => {
    if (signupMessage) {
      alert(signupMessage); // Có thể thay bằng thông báo phù hợp hơn
      navigate('/signin'); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    }
  }, [signupMessage, navigate]);
  useEffect(() => {
    if (signupMessage) {
      alert(signupMessage); // Hiển thị thông báo
      navigate('/signin');  // Điều hướng sang trang đăng nhập
      dispatch(resetSignupMessage()); // Reset lại thông báo
    }
  }, [signupMessage, navigate, dispatch]);
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px' }} className="p-4 shadow">
        <h2 className="text-center">Sign Up</h2>
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

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>} {/* Hiển thị thông báo lỗi */}
          {signupError && <p className="text-danger">{signupError}</p>} {/* Hiển thị thông báo lỗi đăng ký */}

          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDob">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Sign Up
          </Button>
        </Form>
        <div className="text-center mt-3">
          <p>
            You have an account?{' '}
            <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default SignUp;
