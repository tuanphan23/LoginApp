import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

export default function RequestOTP() {
  const [userProfile, setUserProfile] = useState({
    phoneNumber: "",
    code: "",
  });
  const [loading, setLoading] = useState(false);
  const [OTPsended, setOTPSended] = useState(false);
  const [codeValid, setCodeValid] = useState(false);
  const [message, setMessage] = useState("");

  function loginAuth(res) {
    return fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    });
  }

  function handleChange(e) {
    const name = e.target.getAttribute("name");
    setUserProfile({
      ...userProfile,
      [name]: e.target.value,
    });
  }

  function handleRequestAccessCode(e) {
    e.preventDefault();
    try {
      setLoading(true);
      loginAuth(userProfile)
        .then((res) => res.json())
        .then((data) => {
          setOTPSended(data.success);
          setMessage(data.message);
          setLoading(false);
        });
    } catch {
      setMessage("Failed to send access code");
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      loginAuth(userProfile)
        .then((res) => res.json())
        .then((data) => {
          setCodeValid(data.success);
          setMessage(data.message);
          setLoading(false);
        });
    } catch {
      setMessage("Failed to login");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {!codeValid && (
            <Form onSubmit={!OTPsended ? handleRequestAccessCode : handleLogin}>
              <Form.Group id="phone">
                <Form.Label>Enter your phone number</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  value={userProfile.phoneNumber}
                  name="phoneNumber"
                  required
                />
              </Form.Group>
              <Form.Group id="code">
                <Form.Label>Enter your access code</Form.Label>
                <Form.Control
                  disabled={!OTPsended}
                  type="text"
                  onChange={handleChange}
                  value={userProfile.code}
                  name="code"
                  required
                />
              </Form.Group>
              {OTPsended ? (
                <Button disabled={loading} className="w-100" type="submit">
                  Login
                </Button>
              ) : (
                <Button disabled={loading} className="w-100" type="submit">
                  Request access code
                </Button>
              )}
            </Form>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
