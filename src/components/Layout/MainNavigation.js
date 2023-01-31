import { Link,useHistory } from 'react-router-dom';
import React,{useContext} from 'react';

import classes from './MainNavigation.module.css';
import AuthContext from '../store/Context';

const MainNavigation = () => {
  let history=useHistory();
  const Authcntx=useContext(AuthContext)
  const userLoggin=Authcntx.isLoggedIn;
  const logoutHandler=()=>{
    Authcntx.logOut();
    history.replace('/')

  }
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
            <button onClick={logoutHandler}>Logout</button>
          </li>
          )}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
