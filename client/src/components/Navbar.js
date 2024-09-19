import { faBell, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../images/logo.png"
function NavbarC() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
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
            <Nav.Link href="/messages">
            <FontAwesomeIcon icon={faMessage} />
            </Nav.Link>
            <Nav.Link href="/notification">
            <FontAwesomeIcon icon={faBell}/>
            </Nav.Link>
            <NavDropdown title="nom prénom">
            <NavDropdown.Item href="/">
                Home
              </NavDropdown.Item>
              <NavDropdown.Item href="/">
                profil
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">
                logout
              </NavDropdown.Item>

            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarC;