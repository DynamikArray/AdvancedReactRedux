import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Header extends Component {

  renderLinks(){
    if(this.props.authenticated){
      //show signout link
      return <li className="nav-item" >
          <Link className="nav-link" to="/signout">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </li>
    }else{
      //sign or signup
      return[
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin"><i className="fa fa-sign-in"></i>Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup"><i className="fa fa-user-plus"></i>Sign Up</Link>
        </li>
      ]
    }//end else
  }//end renderLinks

  render(){
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <Link to="/" className="navbar-brand">Redux Auth</Link>

        <ul className="nav navbar-nav navbar-right m-r-sm">
          {this.renderLinks()}
        </ul>

      </nav>
    )
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header);
