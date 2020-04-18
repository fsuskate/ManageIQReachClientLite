import React from "react";
import "./Loading.css";
import Clock from "./Clock";

class Loading extends React.Component {
  render() {
    return (
      <div className="Loading">
        <div className="lander">
          <div class="Loading">
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </div>
          <Clock />
        </div>
      </div>
    )
  }
}

export default Loading