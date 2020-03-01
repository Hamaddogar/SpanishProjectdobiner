import React from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { red } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import ConOpinionCard from "./ConOpinionCard";
import "../styles/general.css";

const styles = theme => {
  return {
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 200
      },
      container: {
        display: "flex",
        flexWrap: "wrap"
      },

      input: {
        margin: theme.spacing(1)
      },
      card: {
        width: "100%",
        backgroundColor: "#e8f5e9"
      },

      left: {
        marginBottom: "20px",
        marginLeft: "auto"
      },

      avatar: {
        backgroundColor: red[500]
      }
    }
  };
};

class PostConOpinion extends React.Component {
  state = {
    currentConOpinion: {
      title: "",
      text: "",
      user: "",
      side: "con",
      upvoters: [],
      topic: ""
    },
    newConOpinion: []
  };
  upvote = opinionId => {
    if (localStorage.getItem("token")) {
      let user = this.props.user._id;
      let newConOpinion = this.state.newConOpinion;
      let opinion = newConOpinion.find(o => o._id === opinionId);

      opinion.upvoters.includes(user)
        ? (opinion.upvoters = opinion.upvoters.filter(n => n !== user))
        : opinion.upvoters.push(user);

      axios
        .patch(`${process.env.REACT_APP_API}/opinion/${opinionId}`, opinion)

        .then(res => {
          this.setState({
            opinion
          });
        });
    }
  };

  deleteConOpinion = id => {
    axios.delete(`${process.env.REACT_APP_API}/opinion/${id}`).then(res => {
      let newConOpinion = this.state.newConOpinion;
      console.log("cvvvvvvvvvvvvvvvv", newConOpinion);
      let opinionFiltered = newConOpinion.filter(n => n._id !== id);
      console.log("opinionFiltered", opinionFiltered);
      newConOpinion = opinionFiltered;
      console.log("newProOpinion", newConOpinion);
      this.setState({ newConOpinion });
    });
  };

  getId = opinion => {
    let newConOpinion = this.state.newConOpinion;

    newConOpinion.opinion = opinion;

    this.setState({
      newConOpinion
    });
  };
  writeConOpinion = (e, field) => {
    let currentConOpinion = this.state.currentConOpinion;
    currentConOpinion[field] = e.target.value;
    currentConOpinion.user = this.props.user._id;
    currentConOpinion.topic = this.props.topic;
    this.setState({ currentConOpinion });
  };

  submitConOpinion = e => {
    e.preventDefault();

    let currentConOpinion = this.state.currentConOpinion;
    let newConOpinion = this.state.newConOpinion;

    if (
      currentConOpinion.topic &&
      currentConOpinion.user &&
      currentConOpinion.title &&
      currentConOpinion.side &&
      currentConOpinion.text
    ) {
      axios
        .post(`${process.env.REACT_APP_API}/opinion`, currentConOpinion)
        .then(res => {
          newConOpinion.push(res.data);
          currentConOpinion.title = "";
          currentConOpinion.text = "";
          this.setState({
            currentConOpinion,
            newConOpinion
          });
        });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <ConOpinionCard
          opinion={this.state.newConOpinion}
          user={this.props.user}
          deleteOpinion={this.deleteConOpinion}
          upvote={this.upvote}
          getId={this.getId}
        />

        <Card style={{ width: "100%", backgroundColor: "#ffebee" }}>
          <CardContent style={{ paddingBottom: 0 }}>
            <div className={classes.container}>
              <Input
                value={this.state.currentConOpinion.title}
                placeholder="Título"
                className={classes.input}
                variant="filled"
                inputProps={{
                  "aria-label": "description"
                }}
                onChange={e => this.writeConOpinion(e, "title")}
              />
            </div>
            <div className={classes.container}>
              <TextField
                id="TextProOpinion"
                multiline
                rows="4"
                variant="outlined"
                onChange={e => this.writeConOpinion(e, "text")}
                value={this.state.currentConOpinion.text}
                style={{
                  width: "100%",
                  margin: " 20px auto",
                  background: "white",
                  borderRadius: "3px"
                }}
                placeholder="Deja tu opinión"
              />
            </div>
          </CardContent>
          <CardActions style={{ padding: "0 20px" }}>
            <Button
              onClick={this.submitConOpinion}
              variant="outlined"
              color="primary"
              size="small"
              style={{ marginBottom: "20px", marginLeft: "auto" }}
            >
              Enviar
            </Button>
          </CardActions>
        </Card>
      </>
    );
  }
}

export default withStyles(styles)(PostConOpinion);
