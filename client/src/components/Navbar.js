import { faBell, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Axios for API calls
import logo from "../images/logo.png";

function NavbarC() {
  const [user, setUser] = useState({ nom: '', prenom: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('id'); // Get the user ID from localStorage

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/user/${userId}`);
        const { nom, prenom } = response.data; // Assuming your API returns `nom` and `prenom`
        setUser({ nom, prenom });
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, []);

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
              <FontAwesomeIcon icon={faBell} />
            </Nav.Link>
            <NavDropdown title={`${user.nom} ${user.prenom}`}>
              <NavDropdown.Item href="/">
                Home
              </NavDropdown.Item>
              <NavDropdown.Item href="/profil">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Navbar>
    </>
  );
}

export default NavbarC;
