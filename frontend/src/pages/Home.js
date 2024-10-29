import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    navigate("/addrecord");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <div className="text-center p-5 shadow-sm bg-light rounded">
            <h1 className="display-4">Welcome to Our Website!</h1>
            <p className="lead">
              We're excited to have you here. Explore and enjoy your experience!
            </p>
            <hr className="my-4" />
            <p>
              Click the button below to get started and learn more about what we
              offer.
            </p>
            <Button
              onClick={(e) => onSubmit(e)}
              type="submit"
              variant="primary"
              size="lg"
            >
              Get Started
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
