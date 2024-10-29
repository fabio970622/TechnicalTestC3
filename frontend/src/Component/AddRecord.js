import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import * as formik from "formik";
import * as yup from "yup";
import axios from "axios";

function AddRecord() {
  const { Formik } = formik;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    height: yup
      .string()
      .matches(/^\d+(\.\d+)?$/, "Height must be a valid number")
      .required("Height is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  const addRecord = async (values) => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:5555/userdata/addrecord`, values);

      setSubmitted(true);
    } catch (error) {
      console.error("Error adding record:", error);
      // Optionally, show an error message to the user
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return ""; // Handle empty input
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSubmit = async (values) => {
    // Capitalize the first letter of the name
    const formattedValues = {
      ...values,
      name: capitalizeFirstLetter(values.name),
    };
    await addRecord(formattedValues);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="shadow-lg p-4"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <Card.Header className="bg-primary text-white text-center">
          <h3>Add New Record</h3>
        </Card.Header>
        <Card.Body>
          {submitted && (
            <Alert
              variant="success"
              onClose={() => setSubmitted(false)}
              dismissible
            >
              Form submitted successfully!
            </Alert>
          )}
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              name: "",
              height: "",
              email: "",
              terms: false,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit} className="pt-2">
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationFormik01">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="John"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik02">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="example@gmail.com"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationFormik03">
                    <Form.Label>Height (cm)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., 160"
                      name="height"
                      value={values.height}
                      onChange={handleChange}
                      isValid={touched.height && !errors.height}
                      isInvalid={!!errors.height}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.height}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    name="terms"
                    label="I agree to the terms and conditions"
                    onChange={handleChange}
                    isInvalid={!!errors.terms}
                    feedback={errors.terms}
                    feedbackType="invalid"
                    id="validationFormik04"
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="w-100"
                >
                  {loading ? "Submitting..." : "Submit Form"}
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddRecord;
