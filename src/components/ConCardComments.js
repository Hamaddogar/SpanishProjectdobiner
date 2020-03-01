import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import PostConComment from "./PostConComment";
import ConComments from "./ConComments";

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

class ConCardComments extends React.Component {
  state = {
    comments: [],
    currentConComment: {
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

  deleteConComment = id => {
    axios.delete(`${process.env.REACT_APP_API}/comment/${id}`).then(res => {
      let comments = this.state.comments;
      let commentFiltered = comments.filter(n => n._id !== id);
      comments = commentFiltered;
      this.setState({ comments });
    });
  };

  submitConComment = e => {
    e.preventDefault();
    let currentConComment = this.state.currentConComment;
    let comments = this.state.comments;

    if (
      currentConComment.opinion &&
      currentConComment.user &&
      currentConComment.text
    ) {
      axios
        .post(`${process.env.REACT_APP_API}/comment`, currentConComment)
        .then(res => {
          comments.push(res.data);

          currentConComment.text = "";
          this.setState({
            currentConComment,
            comments
          });
        });
    }
  };

  render() {
    const { opinion, user } = this.props;

    return (
      <>
        <ConComments
          comments={this.state.comments}
          user={user}
          opinion={opinion}
          deleteConComment={this.deleteConComment}
        />
        {this.props.user ? (
          <PostConComment
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

export default withStyles(styles)(ConCardComments);
