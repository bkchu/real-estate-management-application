import React from 'react';
import {Link} from 'react-router-dom';

const Dashboard = props => (
  <div>
    <p>This is the Dashboard component.</p>
    {props.children}
  </div>
);
export default Dashboard;