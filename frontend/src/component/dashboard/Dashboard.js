import React from 'react';
import Example from './Example';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
            <Sidebar/>
          <h3>Line Chart</h3>
          <Example />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;