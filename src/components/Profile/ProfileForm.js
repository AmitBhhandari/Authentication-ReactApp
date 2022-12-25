import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../Store/auth-context";
import classes from "./ProfileForm.module.css";


const ProfileForm = () => {
  const history=useHistory();
  const newPswdInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPswd = newPswdInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDWHwhZR4c7ubXaQLCG9oMpHbrJdCvJsVY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPswd,
          returnSecureToken: false,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(res=>{
      history.replace('/')
    })
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPswdInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
