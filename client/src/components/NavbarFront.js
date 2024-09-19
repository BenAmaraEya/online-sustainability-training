import { faBell, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../images/logo.png"
function NavbarComponent() {
  return (
    <>
      <Navbar style={{ backgroundColor: 'transparent' }}>
        <Container>
        <Navbar.Brand href="/registration">
          <img
            src={logo} // The logo image
            alt="Logo"
            width="70" // Adjust width as necessary
            height="auto"
          />
        </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/" style={{ color: 'white' }}>
            Accueil
            </Nav.Link>
            <Nav.Link href="/nosformations" style={{ color: 'white' }}>
            Nos Formations
            </Nav.Link>
            {/* <Nav.Link href="/notification" style={{ color: 'white' }}>
            Service
            </Nav.Link>
            <Nav.Link href="/notification" style={{ color: 'white' }}>
            Tarifs
            </Nav.Link>
            <Nav.Link href="/notification" style={{ color: 'white' }}>
            Blog
            </Nav.Link> */}
            
            
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;