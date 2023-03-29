import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
const Footer = () => {
  return (
    <Navbar
      fixed="bottom"
      expand="lg"
      light
      style={{ backgroundColor: "#27699e" }}
    >
      <Container>
        <Nav className="mx-auto" style={{ fontSize: "1.3rem", gap: "2rem" }}>
          <Navbar.Brand style={{ color: "white" }}>
            &copy;{new Date().getFullYear()} Copyright: EasyTracker
          </Navbar.Brand>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;
