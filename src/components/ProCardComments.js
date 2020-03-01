import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import PostComment from "./PostComment";
import Comments from "./Comments";

const styles = theme => {
  return {
    card: {
      width: "100%"
    },

    left: {
      marginLeft: "auto"
    }
  };
};

class ProCardComments extends React.Component {
  state = {
    comments: [],
    currentProComment: {
      opinion: "",
      text: ""
    }
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_API}/comments?opinion=${this.props.opinion._id}`
      )
      .then(res => {
        let comments = this.state.comments;
        comments = res.data;
        this.setState({ comments });
        console.log("comments", comments);
      });
  }

  upvoteComment = index => {
    if (localStorage.getItem("token")) {
      let user = this.props.user._id;
      let comment = this.state.comments[index];

      if (!comment.upvoters.includes(user)) {
        comment.upvoters.push(user);
      }
    }
  };

  deleteProComment = id => {
    axios.delete(`${process.env.REACT_APP_API}/comment/${id}`).then(res => {
      let comments = this.state.comments;
      let commentFiltered = comments.filter(n => n._id !== id);
      comments = commentFiltered;
      this.setState({ comments });
    });
  };

  submitProComment = e => {
    e.preventDefault();
    let currentProComment = this.state.currentProComment;
    let comments = this.state.comments;

    if (
      currentProComment.opinion &&
      currentProComment.user &&
      currentProComment.text
    ) {
      axios
        .post(`${process.env.REACT_APP_API}/comment`, currentProComment)
        .then(res => {
          comments.push(res.data);

          currentProComment.text = "";
          this.setState({
            currentProComment,
            comments
          });
        });
    }
  };

  render() {
    const { opinion, user } = this.props;

    return (
      <>
        <Comments
          comments={this.state.comments}
          user={user}
          opinion={opinion}
          deleteProComment={this.deleteProComment}
        />

        {this.props.user ? (
          <PostComment
            opinion={opinion}
            user={user}
            comments={this.state.comments}
          />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default withStyles(styles)(ProCardComments);
