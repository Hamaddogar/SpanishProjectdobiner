import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import { red } from "@material-ui/core/colors";
import TextConComment from "./TextConComment";
import ConComments from "./ConComments";
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

class PostConComment extends React.Component {
  state = {
    currentConComment: {
      opinion: "",
      text: ""
    },
    newConComments: []
  };

  writeConComment = (e, field) => {
    let currentConComment = this.state.currentConComment;
    currentConComment[field] = e.target.value;
    currentConComment.opinion = this.props.opinion._id;
    currentConComment.user = this.props.user._id;
    this.setState({ currentConComment });
  };

  deleteConComment = id => {
    axios.delete(`${process.env.REACT_APP_API}/comment/${id}`).then(res => {
      let newConComments = this.state.newConComments;
      let commentFiltered = newConComments.filter(n => n._id !== id);
      newConComments = commentFiltered;
      this.setState({ newConComments });
    });
  };

  submitConComment = e => {
    e.preventDefault();
    let currentConComment = this.state.currentConComment;

    let newConComments = this.state.newConComments;

    if (
      currentConComment.opinion &&
      currentConComment.user &&
      currentConComment.text
    ) {
      axios
        .post(`${process.env.REACT_APP_API}/comment`, currentConComment)
        .then(res => {
          newConComments.push(res.data);

          currentConComment.text = "";
          this.setState({
            currentConComment,
            newConComments
          });
          console.log("newConComments", newConComments);
        })
        .catch(err => {});
    }
  };
  render() {
    const { classes, opinion, user } = this.props;
    return (
      <>
        <ConComments
          comments={this.state.newConComments}
          user={user}
          opinion={opinion}
          deleteConComment={this.deleteConComment}
        />

        <Card className={classes.card}>
          <CardContent style={{ paddingBottom: 0 }}>
            <TextConComment
              opinion={opinion}
              currentConComment={this.state.currentConComment}
              writeConComment={this.writeConComment}
            />
          </CardContent>
          <CardActions style={{ padding: "0 20px" }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              className={(classes.button, classes.left)}
              onClick={this.submitConComment}
            >
              Enviar
            </Button>
          </CardActions>
        </Card>
      </>
    );
  }
}

export default withStyles(styles)(PostConComment);
