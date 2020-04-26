import React from "react";
import Link from 'next/link';
import { Button } from '@material-ui/core';

const Dashboard = props => {
  return(
    <div>
      <h1>Dashboard</h1>
      <Link href='/addproject' as='addproject'>
        <Button color="primary">Add new Project</Button>
      </Link>
    </div>
  )
};


export default Dashboard;