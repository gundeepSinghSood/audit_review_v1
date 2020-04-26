import React from "react";
import { Button } from '@material-ui/core';
import { logout } from '../../../utils/auth';

const Header = props => {
  return (
    <ul>
      <li>
        <Button color="primary" onClick={logout}>logout</Button>
      </li>
    </ul>
  )
};

export default Header;