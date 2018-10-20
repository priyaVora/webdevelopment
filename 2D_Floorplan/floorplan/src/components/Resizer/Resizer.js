// Resizer Component

import React from 'react';
import ReactDOM from 'react';
import PropTypes from 'prop-types';

class Resizer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
  }
  componentWillUnmount(){
    window.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
  }
  onMouseDown(e) {
    console.log("Resizer.onMouseDown");

    this.props.updateStateResizing( this.props.id, true);
  }
  onMouseMove(e) {
    console.log("Resizer.onMouseMove");
    if( this.props.isResizing ){
      this.props.funcResizing( this.props.id, e.clientX, e.clientY);
    }
  }
  onMouseUp(e) {
    console.log("Resizer.onMouseUp");
    if( this.props.isResizing ){
      this.props.updateStateResizing( this.props.id, false);
    }
  }
  render() {
    const style = {
      width:  this.props.resizerWidth,
      height: this.props.resizerHeight,
    };
    return (
      <div className="resizer"
            style={style}
            onMouseDown={this.onMouseDown.bind(this)}
        ></div>
    );
  }
};

export default Resizer;
