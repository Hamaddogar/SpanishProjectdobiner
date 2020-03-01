import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../styles/circle.css";
class CircleSkeleton extends React.Component {
  state = {
    color: "rgba(39, 174, 96,1.0)",
    textColor: "rgba(39, 174, 96,1.0)"
  };

  render() {
    return (
      <div className="circle">
        <CircularProgressbar
          value="0"
          text={`0%`}
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.25,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "butt",
            // Text size
            textSize: "16px",
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',()
            // Colors
            pathColor: `${this.state.color}, ${this.props.topic.percentage /
              100})`,
            textColor: `${this.state.textColor}`,
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7"
          })}
        />
        {console.log("ssssssssssss", this.props.topic)}
      </div>
    );
  }
}
export default CircleSkeleton;
