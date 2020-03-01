import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavBar from "../components/NavBar";
import CreateIcon from "@material-ui/icons/Create";
import FormHelperText from "@material-ui/core/FormHelperText";
import "../styles/general.css";

import InputCategories from "../components/InputCategories";

import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Debatimos
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = theme => {
  return {
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    error: {
      color: "red",
      margin: 0
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    picInput: {
      width: "100%",
      padding: "40px 40px",
      border: "silver 1px solid",
      borderRadius: "4px",
      margin: " 0 ",
      display: "flex"
    },
    picError: {
      width: "100%",
      padding: "40px 40px",
      border: "red 1px solid",
      borderRadius: "4px",
      margin: " 0 0 10px",
      display: "flex"
    }
  };
};

class EditTopic extends React.Component {
  state = {
    user: {},
    options: [],
    topic: { user: "", title: "", category: "", categoryLabel: "" },
    topicEdited: { user: "", title: "", category: "", categoryLabel: "" },
    input: {
      category: false,
      title: false,
      picture: false,
      user: false
    }
  };
  //

  //

  componentDidMount() {
    let topic = this.state.topic;
    let topicEdited = this.state.topicEdited;
    let token = localStorage.getItem("token");
    axios
      .get(`${process.env.REACT_APP_API}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        topic.user = res.data._id;
        this.setState({ topic });
        let user = this.state.user;
        user = res.data;
        this.setState({ user });
      });

    axios
      .get(`${process.env.REACT_APP_API}/categories`)
      .then(res => {
        res.data.unshift({
          _id: null,
          label: "Categories"
        });
        this.setState({ options: res.data });
      })

      .then(res => {
        let points = this.state.points;
        points = res.data.total;
        this.setState({ points });
      });

    axios
      .get(`${process.env.REACT_APP_API}/topic/${this.props.match.params.id}`)
      .then(res => {
        topic.title = res.data.title;
        topic.user = res.data.user;
        topic.image = res.data.image;
        topic.category = res.data.category._id;
        topic.categoryLabel = res.data.category.label;
        topicEdited.title = res.data.title;
        topicEdited.user = res.data.user;
        topicEdited.image = res.data.image;
        topicEdited.category = res.data.category._id;
        topicEdited.categoryLabel = res.data.category.label;

        this.setState({ topic, topicEdited });
      });
  }

  handleChange = event => {
    let topicEdited = this.state.topicEdited;
    let option = this.state.options.find(
      option => option.label === event.target.value
    );

    topicEdited.category = option._id;
    topicEdited.categoryLabel = option.label;
    this.setState({ topicEdited });
  };

  changeField = (e, field) => {
    let topicEdited = this.state.topicEdited;

    topicEdited[field] = e.target.value;
    if (topicEdited.title.length <= 70) {
      this.setState({ topicEdited });
    }
  };

  getFile = e => {
    let file = e.target.files[0];
    let topicEdited = this.state.topicEdited;
    topicEdited.image = file;
    this.setState({
      topicEdited: topicEdited
    });
  };

  editTopic = e => {
    e.preventDefault();
    let topicEdited = this.state.topicEdited;
    let topic = this.state.topic;

    if (topicEdited.image !== topic.image) {
      let data = new FormData();

      data.append("image", this.state.topicEdited.image);
      data.append("title", this.state.topicEdited.title);
      data.append("category", this.state.topicEdited.category);

      axios
        .patch(
          `${process.env.REACT_APP_API}/topicImage/${this.props.match.params.id}`,
          data
        )
        .then(res => {
          window.location.reload();
        });
    } else if (
      topicEdited.title !== topic.title ||
      topicEdited.category !== topic.category
    ) {
      axios
        .patch(
          `${process.env.REACT_APP_API}/topic/${this.props.match.params.id}`,
          topicEdited
        )
        .then(res => {
          window.location.reload();
        });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <NavBar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <CreateIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crear Tema
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.submitTopic}
            >
              <InputCategories
                options={this.state.options}
                input={this.state.input}
                handleChange={this.handleChange}
                topic={this.state.topicEdited}
              />
              <TextField
                error={this.state.input.title}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Título"
                name="title"
                autoComplete="title"
                autoFocus
                value={this.state.topicEdited.title}
                onChange={e => this.changeField(e, "title")}
              />{" "}
              {this.state.input.title ? (
                <FormHelperText className={classes.error}>
                  Introduce un título para el tema
                </FormHelperText>
              ) : (
                ""
              )}
              <Typography
                component="div"
                variant="body1"
                style={{ margin: "10px 0 " }}
              >
                Selecciona una fotografía para el tema:
              </Typography>
              <input
                className={
                  this.state.input.category
                    ? classes.picError
                    : classes.picInput
                }
                type="file"
                name="myFile"
                onChange={this.getFile}
              />
              {this.state.input.picture ? (
                <FormHelperText className={classes.error}>
                  Adjunta una imagen relacionada con el tema
                </FormHelperText>
              ) : (
                ""
              )}
              <img
                src={this.state.topic.image}
                alt={this.state.topic.title}
                className="imageEditTopic"
              />{" "}
              {this.state.input.user ? (
                <FormHelperText
                  className={classes.error}
                  style={{ marginTop: "10px" }}
                >
                  Para crear un tema debes acceder a tu cuenta
                </FormHelperText>
              ) : (
                ""
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.editTopic}
              >
                Editar
              </Button>
              <Link href="/" underline="none" color="inherit" variant="h6">
                <Button fullWidth variant="contained" color="inherit">
                  Cancelar
                </Button>
              </Link>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item></Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(EditTopic);
