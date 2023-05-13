import React from "react";
import ChartistGraph from "react-chartist";
import airData from './airDatajson.json';


import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";


const keys = ["Recycled Parts Carbon Footprint (kg CO2e)", "Water Usage - Recycled Parts (liters)", "Landfill Waste - Recycled Parts (kg)", "Remanufacturing Potential (%)"]

const avgValues = keys.reduce((acc, key) => {
  const sum = airData.reduce((total, obj) => total + obj[key], 0)
  const avg = sum / airData.length || 0
  return { ...acc, [key]: avg.toFixed(2) }
}, {})

const rey=avgValues["Recycled Parts Carbon Footprint (kg CO2e)"]
const water=avgValues["Water Usage - Recycled Parts (liters)"]
const land=avgValues["Landfill Waste - Recycled Parts (kg)"]
const remnu=avgValues["Remanufacturing Potential (%)"]

console.log(avgValues);

//filter
const filteredData = airData.filter((item) => item.Manufacturer === localStorage.getItem('companyname'));
const labels = [...new Set(filteredData.map((item) => item['Part Name']))];
console.log("testing" + filteredData)

const series = [
  filteredData.slice(0, 5).map((item) => item['Water Usage - Recycled Parts (liters)']),
  filteredData.slice(0, 5).map((item) => item['Landfill Waste - Recycled Parts (kg)']),
  filteredData.slice(0, 5).map((item) => item['Recycled Parts Carbon Footprint (kg CO2e)']),
];
//filter
const filteredData1 = airData.filter((item) => item.Manufacturer === localStorage.getItem('companyname'));
console.log("filterData1: " + filteredData1);
const totalParts = filteredData1.length;


const usedParts = filteredData1.filter((item) => item.Condition === 'Used').length;


const newParts = filteredData1.filter((item) => item.Condition === 'New').length;


const usedPartsPercentage = Math.round((usedParts / totalParts) * 100);
const newPartsPercentage = Math.round((newParts / totalParts) * 100);
const labels_pie = [`${usedPartsPercentage}% Used Parts`, `${newPartsPercentage}% New Parts`];
const series_pie = [usedPartsPercentage, newPartsPercentage];


function Dashboard() {

 
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                  
                      <p className="card-category">Recycled Parts Carbon Footprint (kg CO2e)</p>
                      <Card.Title as="h4">{rey}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                 
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Water Usage - Recycled Parts (liters)</p>
                      <Card.Title as="h4">{water}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                 
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-square-pin text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Landfill Waste - Recycled Parts (kg)</p>
                      <Card.Title as="h4">{land}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fa fa-area-chart"></i>
                  
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-spaceship text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Remanufacturing Potential %</p>
                      <Card.Title as="h4"></Card.Title>
                      <Card.Title as="h4">{remnu}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Environment Impact Matrix</Card.Title>
                <p className="card-category">By Parts Name</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                   data={{
                    labels: labels,
                    series: series,
                  }}

                    
                    type="Bar"
                    options={{
                      low: 0,
                      high: 1000,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>Water Usage
                   <i className="fas fa-circle text-danger"></i> Landfill Waste
                   <i className="fas fa-circle text-warning"></i>Energy Consumption
                 
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Conditional Percentage</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: labels_pie,
                      series: series_pie,
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Used <i className="fas fa-circle text-danger"></i>
                  New
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
         
         
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;