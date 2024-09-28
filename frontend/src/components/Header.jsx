// components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import avatar from '../images/user2.png';
import { logout } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import BlogDialog from './BlogDialog';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { fetchUserDetailsRequest } from '../redux/actions/getInfActions';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.token);
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;
  const user_id = decodedToken ? decodedToken.userID : null;
  const [showBlogDialog, setShowBlogDialog] = useState(false);
  const userName = localStorage.getItem('userName');
  useEffect(() => {
    if (user_id) {
      dispatch(fetchUserDetailsRequest(user_id)); // Gọi action với user_id
    }
  }, [dispatch, user_id]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  const handleShowBlogDialog = () => setShowBlogDialog(true);
  const handleCloseBlogDialog = () => setShowBlogDialog(false);

  return (
    <div className="p-2" style={{ paddingTop: '8px', paddingBottom: '0' }}>
      <Navbar className="border border-dark p-0" style={{ height: '50px', borderWidth: '12px' }}>
        <Container fluid className="p-0 h-100">
          <Navbar.Brand className="b border-dark h-100 d-flex align-items-center px-3 m-0 nav-brand" style={{ width: '200px', borderRightWidth: '8px' }}>
            Logo
          </Navbar.Brand>

          <Nav className="h-100 position-absolute start-50 translate-middle-x">
            <Nav className="h-100 d-flex align-items-center px-3 border-start border-end border-dark nav-link" style={{ backgroundColor: '#dee2e6', borderLeftWidth: '2px', borderRightWidth: '2px' }}>
              Blogs
              <div className="position-absolute" style={{
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '12px solid transparent',
                borderRight: '12px solid transparent',
                borderTop: '12px solid #dee2e6',
                filter: 'drop-shadow(0 2px 0 rgba(0,0,0,1))'
              }}></div>
            </Nav>
          </Nav>

          <div className="ms-auto h-100 d-flex align-items-center border-dark px-3 user-name" style={{ borderLeftWidth: '8px' }}>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic" className="p-0 h-100 d-flex align-items-center" bsPrefix="custom-toggle">
                <img alt="User Avatar" src={avatar} style={{ height: '5vh', borderLeft: '2px solid black', borderRight: '2px solid black', margin: '0 5px' }} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShowBlogDialog}>Post Blog</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {userName ? userName : 'Loading...'} 
          </div>
        </Container>
      </Navbar>

      <BlogDialog
        show={showBlogDialog}
        handleClose={handleCloseBlogDialog}
        handlePost={(blogData) => {
          handleCloseBlogDialog();
        }}
      />
    </div>
  );
};

export default Header;
