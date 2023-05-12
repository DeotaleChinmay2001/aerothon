import { useState, useEffect } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // import Bootstrap CSS
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'; // import Bootstrap components

const Login = () => {
  const [selectedSector, setSelectedSector] = useState('');
  const [availableCompanies, setAvailableCompanies] = useState([]);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const companySectors = [    {      name: 'Manufacturer',      companies: ['Company A', 'Company B', 'Company C']
    },
    {
      name: 'Airlines',
      companies: ['Company D', 'Company E', 'Company F']
    },
    {
      name: 'Aircraft',
      companies: ['Company G', 'Company H', 'Company I']
    }
  ];

  useEffect(() => {
    // Set the initial available companies to all the companies
    setAvailableCompanies(companySectors.flatMap(sector => sector.companies));
  }, []);

  const handleSectorSelection = (event) => {
    const selectedSector = event.target.value;
    const selectedCompanies = companySectors.find(
      (sector) => sector.name === selectedSector
    ).companies;

    setSelectedSector(selectedSector);
    setAvailableCompanies(selectedCompanies);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedSector || !password) {
      setErrorMessage('Please select a sector and enter a password.');
      return;
    }

    setIsLoading(true);
    // Call your API here to authenticate the user
    setTimeout(() => {
      setIsLoading(false);
      setErrorMessage('Incorrect password. Please try again.'); // Replace with actual authentication logic
    }, 2000);
  };

  return (
    <Container fluid className="login-container">
  <Row className="justify-content-left align-items-center vh-100">
    <Col md={4}  className="login-form float-md-right">
      <h1 className="text-center mb-4">Login to Sustainability</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSector">
          <Form.Label>Company Sector:</Form.Label>
          <Form.Control as="select" onChange={handleSectorSelection}>
            <option value="">Select Company Sector</option>
            {companySectors.map((sector, index) => (
              <option key={index} value={sector.name}>
                {sector.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCompany">
          <Form.Label>Company:</Form.Label>
          <Form.Control as="select" value={selectedSector ? '' : 'disabled'} disabled={!selectedSector}>
            {availableCompanies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={handlePasswordChange} />
        </Form.Group>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Button variant="primary" type="submit" disabled={!selectedSector || !password || isLoading} block>
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </Form>
    </Col>
  </Row>
</Container>
  )
}


export default Login;