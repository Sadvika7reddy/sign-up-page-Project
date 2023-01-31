import classes from './ProfileForm.module.css';
import React,{useRef,useContext} from 'react';
import AuthContext from '../store/Context';

const ProfileForm = () => {
  const passwordChanger=useRef();
  const Authcntx=useContext(AuthContext)
  const SubmitHandler=(event)=>{
    event.preventDefault();
    const changePassword=passwordChanger.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCewUWbgztJYjhsb5UEmf3Ni6T_ehpNmXQ',{
      method:'POST',
      body:JSON.stringify(
        {
        idToken:Authcntx.token,
        password:changePassword,
        returnSecureToken:false
      }
      ),
      headers:{
        'Content-Type':'application/json'
      }
    }).then((res)=>{

    })
  }
  return (
    <form className={classes.form} onSubmit={SubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordChanger}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
