import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Navigation extends React.Component {
  render() {
    return (
      <Navbar variant="dark" className=''>
        <LinkContainer to="./">
          <Navbar.Brand>
            <img src="logo.jpg" width='30' className="d-inline-block align-top" alt=""></img>     
            Broardcom Cloud Portal
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav>
              <LinkContainer to="/catalog">
                  <Nav.Link>Catalog</Nav.Link>      
              </LinkContainer>
              <LinkContainer to="/instances">
                  <Nav.Link>VMs</Nav.Link>      
              </LinkContainer>                            
            </Nav>                    
          </Nav>
          <Nav pullright="true">
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>                              
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>   
      </Navbar>
    )
  }
}

export default Navigation;