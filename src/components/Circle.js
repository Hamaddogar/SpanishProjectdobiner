import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../styles/circle.css";
class Circle extends React.Component {
  state = {
    color: "rgba(39, 174, 96,1.0)",
    textColor: "rgba(39, 174, 96,1.0)"
  };

  componentDidMount() {
    if (this.props.topic.side === "Con") {
      this.setState({
        color: "rgba(192, 57, 43,1.0)",
        textColor: "rgba(192, 57, 43,1.0)"
      });
    } else if (this.props.topic.side === "Tie") {
      this.setState({
        color: "rgba(255,165,0,0.7)",
        textColor: "rgba(255,165,0,0.7)"
      });
    } else if (this.props.topic.side === "") {
      this.setState({
        color: "rgba(39, 174, 96,1.0)",
        textColor: "rgba(39, 174, 96,1.0)"
      });
    }
  }

  render() {
    return (
      <div className="circle">
        <CircularProgressbar
          value={this.props.topic.percentage}
          text={`${
            this.props.topic.side === "Tie" ? "" : this.props.topic.side
          } ${this.props.topic.percentage}%`}
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
      </div>
    );
  }
}
export default Circle;
