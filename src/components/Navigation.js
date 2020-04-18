import React from 'react';
import "./Navigation.css";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from 'react-bootstrap';

class Navigation extends React.Component {
  render() {
    return (
      <Navbar variant="dark" className=''>
        <LinkContainer to="./login">
          <Navbar.Brand>
            <img src="logo.jpg" width='30' className="d-inline-block align-top" alt=""></img>     
            Broadcom Cloud Portal
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav>
              <LinkContainer to="/service">
                  <Nav.Link>MY SERVICES</Nav.Link>      
              </LinkContainer>                            
              <LinkContainer to="/catalog">
                  <Nav.Link>CATALOG</Nav.Link>      
              </LinkContainer>              
            </Nav>                    
          </Nav>
          <Nav floatRight="true">
            <LinkContainer to="/login">
              <Nav.Link>LOGIN</Nav.Link>                              
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>   
      </Navbar>
    )
  }
}

export default Navigation;