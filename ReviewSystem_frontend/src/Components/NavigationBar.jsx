import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { connect, useDispatch } from "react-redux";
import { logoutUser } from "../redux/users/userActions";

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a,
  .navbar-nav,
  .navbar-light .nav-link {
    color: #9fffcb;
    &:hover {
      color: white;
    }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9fffcb;
    &:hover {
      color: white;
    }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

// const NavigationBar = (props) => (
//   <Styles>
//     <Navbar expand="lg">
//       <Navbar.Brand href="/home">Review System</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />

//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="ml-auto">
//           <Nav.Item>
//             <Nav.Link href="/login">Login</Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link href="/register">Register</Nav.Link>
//           </Nav.Item>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   </Styles>
// );

function NavigationBar(props) {
  const dispatch = useDispatch();
  let navbar;
  if (!props.isAuthenticated) {
    navbar = (
      <Nav className="ml-auto">
        <Nav.Item>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  } else {
    navbar = (
      <Nav className="ml-auto">
        <Nav.Item>
          <Nav.Link href="/addreview">Create</Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link href="/addreview">Edit</Nav.Link>
        </Nav.Item> */}

        <Nav.Item>
          <Nav.Link
            onClick={() => {
              dispatch(logoutUser());
            }}
            href="/home"
          >
            Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }

  return (
    <Styles>
      <Navbar expand="lg">
        <Navbar.Brand href="/">Review System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">{navbar}</Navbar.Collapse>
      </Navbar>
    </Styles>
  );
}

const mapStatetoProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStatetoProps)(NavigationBar);
