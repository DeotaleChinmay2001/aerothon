<h1 align="center">
  AIRBUS AEROTHON 5.0 🛫
  <br>
  <img src="https://cdn-icons-png.flaticon.com/512/7893/7893979.png" alt="airplane pic" width="300">
  <br>
</h1>

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
- [Technologies Used](#technologies-used)
- [About The Application](#about-the-application)
- [Usage](#usage)
- [Contributors](#contributors)

## Problem Statement

Aircraft Sustainability Platform:
Develop a platform or solution that connects aircraft manufacturers, airlines, and recycling facilities to facilitate the repurposing and recycling of end-of-life aircraft components.


## Proposed Solution
We have developed a platform which uses Reactjs for Frontend and Django for backend.
-	Aircraft Manufacturers
-	Airline
-	Recycling facilities.
<br>
We have also developed a dashboard which shows Recycled parts Carbon Footprint, Water Usage- Recycled Parts, Landfill Waste- Recycled Parts and Remanufacturing Potential %

On login the Airlines, and Manufacturers can see a table with all of their Part Name, Material, Remanufacturing Potential and have an option to send that Part for Recycle.

## Technologies used
- Frontend: React
- Backend: Django
- Database: Sqlite

### About The Application

 Summary of each API endpoint:

1. LoginAPIView:
- Accepts a POST request with company role, company name, and password as input
- Queries the UserDetails model to check if the given credentials are valid
- If the credentials are valid, generates a JWT token and returns it in the response

3. RecyclerDataView:
- Accepts a GET request with a valid JWT token in the headers
- Verifies the token and checks if the user is a Recycler
- If the user is a Recycler, returns the serialized data of AircraftPartData objects that have status 'Recycling'
- Accepts a POST request with a valid JWT token in the headers and part_id, and status_type in the request body
- Verifies the token and checks if the user is a Recycler
- If the user is a Recycler, updates the status of the AircraftPartData object with the given part_id to the given status_type and returns the serialized data of AircraftPartData objects that have status 'Recycling'

4. PartDataView:
- Accepts a POST request with a valid JWT token in the headers and part_id and status_type in the request body
- Verifies the token and checks if the user is either an Airline or a Manufacturer
- If the user is a Manufacturer, returns the serialized data of AircraftPartData objects that have status 'InUse' and belong to the same manufacturer as the user
- If the user is an Airline, returns the serialized data of AircraftPartData objects that have status 'InUse'
- Updates the status of the AircraftPartData object with the given part_id to the given status_type and returns the serialized data of AircraftPartData objects that have status 'InUse'


## Usage

Install project dependencies: 
- Open a terminal window and navigate to the project directory. Run the command "npm install" to install the necessary Node.js packages, and "pip install -r requirements.txt" to install the necessary Python packages.

- Set up the Django backend: Navigate to the "backend" directory in your project and run the command "python manage.py migrate" to create the necessary database tables. Then, run the command "python manage.py runserver" to start the Django development server.

- Set up the React frontend: Navigate to the "frontend" directory in your project and run the command "npm start" to start the React development server.

- Access the project in a web browser: Open a web browser and go to the URL "http://localhost:3000" to view the React frontend. You can interact with the frontend to make requests to the Django backend.

## Contributors

Team Aero-Alpha
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Vikaass-08"><img src="https://avatars.githubusercontent.com/u/59832889?v=4" width="100px;" alt="Vikas"/><br /><sub><b>Vikas Pathak</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mrudulamore"><img src="https://avatars.githubusercontent.com/u/133312331?v=4" width="100px;" alt="Mrudula"/><br /><sub><b>Mrudula More</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/DeotaleChinmay2001"><img src="https://avatars.githubusercontent.com/u/95205222?v=4" width="100px;" alt="Chinmay"/><br /><sub><b>Chinmay Deotale</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/aktamoli0910"><img src="https://avatars.githubusercontent.com/u/78742814?v=4" width="100px;" alt="Abhishek"/><br /><sub><b>Abhishek Kumar Tamoli</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>
