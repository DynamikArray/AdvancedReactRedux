import _ from 'lodash';

import React, { Component } from "react";
import { reduxForm, Field, Form } from "redux-form";
import * as actions from "../../actions";



class Signup extends Component {

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Ooops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  handleFormSubmit(formProps){
    //call action create to signup the user
    this.props.signupUser(formProps);
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;
    return (
      <div>
        <h1 className="page-header"><i className="fa fa-user-plus"></i>Sign Up</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className={email.touched && email.error ? "has-error form-group" : "form-group" }>
            <label>Email:</label>
            <input className="form-control" {...email} />
            {email.touched && email.error && <div className="help-block">{email.error}</div>}
          </fieldset>

          <fieldset className={password.touched && password.error ? "has-error form-group" : "form-group" }>
            <label>Password:</label>
            <input type="password" className="form-control" {...password} />
            {password.touched && password.error && <div className="help-block">{password.error}</div>}
          </fieldset>

          <fieldset className={passwordConfirm.touched && passwordConfirm.error ? "has-error form-group" : "form-group" }>
            <label>Confirm Password:</label>
            <input type="password"  className="form-control" {...passwordConfirm} />
            {passwordConfirm.touched && passwordConfirm.error && <div className="help-block">{passwordConfirm.error}</div>}
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">
            <i className="fa fa-user-plus"></i>Sign Up
          </button>
        </form>
      </div>
    );
  }
}

function validate(formProps){
  const errors = {};
  /*
  _.each(formProps, function(value,prop){
    if(!value){
      errors.prop = 'Please enter a ' + prop;
    }
  });
  */
  if(!formProps.email){
    errors.email = 'Please enter an email';
  }

  if(!formProps.password){
    errors.password = 'Please enter a password';
  }

  if(!formProps.passwordConfirm){
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if(formProps.password != formProps.passwordConfirm){
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state){
  return{errorMessage: state.auth.error};
}

export default reduxForm({
  form: "signup",
  fields: ["email", "password", "passwordConfirm"],
  validate
},mapStateToProps, actions )(Signup);
