import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import { red } from "@material-ui/core/colors";
import TextComment from "./TextComment";
import Comments from "./Comments";
import Button from "@material-ui/core/Button";
import axios from "axios";

const styles = theme => {
  return {
    card: {
      width: "100%"
    },

    left: {
      marginBottom: "20px",
      marginLeft: "auto"
    },

    avatar: {
      backgroundColor: red[500]
    }
  };
};

class PostComment extends React.Component {
  state = {
    currentProComment: {
      opinion: "",
      text: ""
    },
    newComments: []
  };

  writeProComment = (e, field) => {
    let currentProComment = this.state.currentProComment;
    currentProComment[field] = e.target.value;
    currentProComment.opinion = this.props.opinion._id;
    currentProComment.user = this.props.user._id;
    this.setState({ currentProComment });
  };

  deleteProComment = id => {
    axios.delete(`${process.env.REACT_APP_API}/comment/${id}`).then(res => {
      let newComments = this.state.newComments;
      let commentFiltered = newComments.filter(n => n._id !== id);
      newComments = commentFiltered;
      this.setState({ newComments });
    });
  };

  submitProComment = e => {
    e.preventDefault();
    let currentProComment = this.state.currentProComment;

    let newComments = this.state.newComments;

    if (
      currentProComment.opinion &&
      currentProComment.user &&
      currentProComment.text
    ) {
      axios
        .post(`${process.env.REACT_APP_API}/comment`, currentProComment)
        .then(res => {
          newComments.push(res.data);

          currentProComment.text = "";
          this.setState({
            currentProComment,
            newComments
          });
        })
        .catch(err => {});
    }
  };
  render() {
    const { classes, opinion, user } = this.props;
    return (
      <>
        <Comments
          comments={this.state.newComments}
          user={user}
          opinion={opinion}
          deleteProComment={this.deleteProComment}
        />

        <Card className={classes.card}>
          <CardContent style={{ paddingBottom: 0 }}>
            <TextComment
              opinion={opinion}
              currentProComment={this.state.currentProComment}
              writeProComment={this.writeProComment}
            />
          </CardContent>
          <CardActions style={{ padding: "0 20px" }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              className={(classes.button, classes.left)}
              onClick={this.submitProComment}
            >
              Enviar
            </Button>
          </CardActions>
        </Card>
      </>
    );
  }
}

export default withStyles(styles)(PostComment);
