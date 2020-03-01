import Skeleton from "react-loading-skeleton";
import React from "react";

class Blogpost extends React.Component {
  render() {
    return (
      <div style={{ fontSize: 20, lineHeight: 2 }}>
        <h1>{this.props.title || <Skeleton />}</h1>
        {this.props.body || <Skeleton count={10} />}
      </div>
    );
  }
}

export default Blogpost;
