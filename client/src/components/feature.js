import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../actions';

class Feature extends Component{
  componentWillMount() {
    this.props.fetchMessage();
  }

  render(){
    return(
      <div>
        <h1 className="page-header">Feature</h1>
        <div>{this.props.message}</div>
      </div>

    )
  }
}

function mapStateToProps(state){
  return {message: state.auth.message};
}

export default connect(mapStateToProps,actions) (Feature);
