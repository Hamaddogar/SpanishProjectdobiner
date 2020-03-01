import React from "react";

class Test extends React.Component {
  render() {
    return (
      <button onClick={this.props.upvoteComment(this.props.index)}>
        click
      </button>
    );
  }
}
export default Test;
