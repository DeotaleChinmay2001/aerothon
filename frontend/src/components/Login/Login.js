import { useState, useEffect } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // import Bootstrap CSS
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'; // import Bootstrap components
import axios from "axios"
import { Redirect } from "react-router-dom";
var sha256 = require('js-sha256');

const Login = () => {
  const [selectedSector, setSelectedSector] = useState('Manufacturer');
  const [availableCompanies, setAvailableCompanies] = useState([]);
  const [selectedSectorCompany, setSelectedSectorCompany] = useState('Airbus');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [navigate, setNavigate] = useState(false)

  const companySectors = [    
    { name: 'Manufacturer', 
      companies: ['Airbus', 'Boeing', 'Bombardier', 'Cessna', 'Embraer', 'Gulfstream']
    },
    {
      name: 'Airline',
      companies: ['Airline']
    },
    {
      name: 'Recycler',
      companies: ['Recycler']
    }
  ];

  useEffect(() => {
    setAvailableCompanies(companySectors.flatMap(sector => sector.companies));
  }, []);

  const handleSelectedSectorCompany = (event) => {
    setSelectedSectorCompany(event.target.value);
  }

  const handleSectorSelection = (event) => {
    const currSelected = event.target.value;
    const currSelectedCompanies = companySectors.find(
      (sector) => sector.name === currSelected
    ).companies;

    setSelectedSector(currSelected);
    setSelectedSectorCompany(currSelectedCompanies[0])
    setAvailableCompanies(currSelectedCompanies);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    if (!password) {
      setErrorMessage('Please enter a password.');
      return;
    }
    let strigifyData = JSON.stringify({
      companyrole: selectedSector,
      companyname: selectedSectorCompany,
      password: sha256(password).toString()
    });
    console.log(strigifyData)
    setIsLoading(true);
    axios({
      url: "http://127.0.0.1:8000/api/login/",
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      data: strigifyData,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("companyrole", selectedSector);
        localStorage.setItem("companyname", selectedSectorCompany);
        setNavigate(true);
       })
      .catch((err) => { 
        setErrorMessage('Incorrect password. Please try again.');
      });

    setIsLoading(false);
  };



  return (
    <Container fluid className="login-container">
     {localStorage.getItem('token') || navigate ?  ( <Redirect to="/admin/dashboard"></Redirect> ) : (
        <Row className="justify-content-left align-items-center vh-100">
          <Col md={4}  className="login-form float-md-right">

            <h1 className="text-center mb-4">Login to Sustainability</h1>

            <Form onSubmit={handleSubmit}>

              <Form.Group controlId="formSector">
                <Form.Label>Company Sector:</Form.Label>
                <Form.Control as="select" value={selectedSector} onChange={handleSectorSelection}>
                  {companySectors.map((sector, index) => (
                    <option key={index} value={sector.name}>
                      {sector.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>


              <Form.Group controlId="formCompany">
                <Form.Label>Company:</Form.Label>
                <Form.Control as="select" value={selectedSectorCompany} onChange={handleSelectedSectorCompany}>
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

              <Button type="submit" disabled={!password || isLoading}>
                {isLoading ? 'Loading...' : 'Submit'}
              </Button>

            </Form>
          </Col>
        </Row>
      )}
    </Container>
  )
}


export default Login;