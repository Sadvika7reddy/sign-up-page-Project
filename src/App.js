import { Switch, Route } from 'react-router-dom';
import { useRef,useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './components/store/Context';

function App() {
  const Authcntx=useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!Authcntx.isLoggedIn&&(<Route path='/auth'>
          <AuthPage />
        </Route>)}
        {Authcntx.isLoggedIn&&(<Route path='/profile'>
          <UserProfile />
        </Route>)}
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
        
      </Switch>
    </Layout>
  );
}

export default App;
