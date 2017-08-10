import React, { Component } from "react";
import { reduxForm, Field, Form } from "redux-form";
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({email, password}){
    //need to do something to login the user
    this.props.signinUser({email, password});
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Ooops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields:{email, password}} = this.props;

    return (
      <div>
        <h1 className="page-header"><i className="fa fa-sign-in"></i>Sign In</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Email:</label>
            <input {...email} className="form-control" />
          </fieldset>

          <fieldset className="form-group">
            <label>Password:</label>
            <input {...password}
              type="password"
              className="form-control" />
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">
            <i className="fa fa-sign-in"></i>Sign In
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{errorMessage: state.auth.error};
}


export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions )(Signin);
