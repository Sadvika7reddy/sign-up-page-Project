import { useState,useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
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
    if(isLogin){

    }
    else{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCewUWbgztJYjhsb5UEmf3Ni6T_ehpNmXQ',{
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

        }
        else{
          return res.json().then((dara)=>{
            let errorMessage='Authenticated Failed';
            alert(errorMessage);
          })
        }
      })
    }

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
