import { Link } from 'react-router-dom';
import React,{useContext} from 'react';

import classes from './MainNavigation.module.css';
import AuthContext from '../store/Context';

const MainNavigation = () => {
  const Authcntx=useContext(AuthContext)
  const userLoggin=Authcntx.isLoggedIn;
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!userLoggin&&(
             <li>
             <Link to='/auth'>Login</Link>
           </li>
          )}
         {userLoggin&&(
          <li>
          <Link to='/profile'>Profile</Link>
        </li>

         )}
          {userLoggin&&(
            <li>
            <button>Logout</button>
          </li>
          )}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
