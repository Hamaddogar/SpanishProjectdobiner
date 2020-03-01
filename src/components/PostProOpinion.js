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
import ProOpinionCard from "./ProOpinionCard";
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

class PostProOpinion extends React.Component {
  state = {
    currentProOpinion: {
      title: "",
      text: "",
      user: "",
      side: "pro",
      upvoters: [],
      topic: ""
    },
    newProOpinion: []
  };
  upvote = opinionId => {
    if (localStorage.getItem("token")) {
      let user = this.props.user._id;
      let newProOpinion = this.state.newProOpinion;
      let opinion = newProOpinion.find(o => o._id === opinionId);

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

  deleteProOpinion = id => {
    axios.delete(`${process.env.REACT_APP_API}/opinion/${id}`).then(res => {
      let newProOpinion = this.state.newProOpinion;
      console.log("cvvvvvvvvvvvvvvvv", newProOpinion);
      let opinionFiltered = newProOpinion.filter(n => n._id !== id);
      console.log("opinionFiltered", opinionFiltered);
      newProOpinion = opinionFiltered;
      console.log("newProOpinion", newProOpinion);
      this.setState({ newProOpinion });
    });
  };

  getId = opinion => {
    let newProOpinion = this.state.newProOpinion;

    newProOpinion.opinion = opinion;

    this.setState({
      newProOpinion
    });
  };
  writeProOpinion = (e, field) => {
    let currentProOpinion = this.state.currentProOpinion;
    currentProOpinion[field] = e.target.value;
    currentProOpinion.user = this.props.user._id;
    currentProOpinion.topic = this.props.topic;
    this.setState({ currentProOpinion });
    console.log(currentProOpinion);
  };

  submitProOpinion = e => {
    e.preventDefault();

    let currentProOpinion = this.state.currentProOpinion;
    let newProOpinion = this.state.newProOpinion;

    if (
      currentProOpinion.topic &&
      currentProOpinion.user &&
      currentProOpinion.title &&
      currentProOpinion.side &&
      currentProOpinion.text
    ) {
      axios
        .post(`${process.env.REACT_APP_API}/opinion`, currentProOpinion)
        .then(res => {
          newProOpinion.push(res.data);
          currentProOpinion.title = "";
          currentProOpinion.text = "";
          this.setState({
            currentProOpinion,
            newProOpinion
          });
          console.log("newProOpinion", newProOpinion);
        });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <ProOpinionCard
          opinion={this.state.newProOpinion}
          user={this.props.user}
          deleteOpinion={this.deleteProOpinion}
          upvote={this.upvote}
          getId={this.getId}
        />

        <Card style={{ width: "100%", backgroundColor: "#e8f5e9" }}>
          <CardContent style={{ paddingBottom: 0 }}>
            <div className={classes.container}>
              <Input
                value={this.state.currentProOpinion.title}
                placeholder="Título"
                className={classes.input}
                variant="filled"
                inputProps={{
                  "aria-label": "description"
                }}
                onChange={e => this.writeProOpinion(e, "title")}
              />
            </div>
            <div className={classes.container}>
              <TextField
                id="TextProOpinion"
                multiline
                rows="4"
                variant="outlined"
                onChange={e => this.writeProOpinion(e, "text")}
                value={this.state.currentProOpinion.text}
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
              onClick={this.submitProOpinion}
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

export default withStyles(styles)(PostProOpinion);
