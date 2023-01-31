import { useState,useRef,useContext } from 'react';
import AuthContext from '../store/Context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const Authcntx=useContext(AuthContext);
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  const [isloading,setIsLoading]=useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const SubmitHandler=(event)=>{
    event.preventDefault();
    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;
    setIsLoading(true);
    let url;
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCewUWbgztJYjhsb5UEmf3Ni6T_ehpNmXQ';
    }
    else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCewUWbgztJYjhsb5UEmf3Ni6T_ehpNmXQ'
    }
      fetch(url,{
        method:'POST',
        body:JSON.stringify(
          {
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:true
          }
        ),
        headers :{
          'Content-Type':'application/json'
        }
      }
      ).then(res=>{
        setIsLoading(false);
        if(res.ok){
          return res.json();

        }
        else{
          return res.json().then((data)=>{
            let errorMessage='Authenticated Failed';
            throw new Error(errormessage);
          })
        }
      }).then((data)=>{
        Authcntx.logIn(data.idToken)
      })
      .catch((err)=>{
        alert(err.message)
      })


  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {!isloading&&<button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isloading&&<p>sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
