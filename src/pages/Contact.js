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

class Contact extends React.Component {
  state = {
    user: {},

    report: { motivo: "", texto: "" },
    input: {
      motivo: false,
      texto: false
    }
  };
  //

  changeField = (e, field) => {
    let report = this.state.report;
    report[field] = e.target.value;
    this.setState({ report });
  };

  submitTopic = e => {
    e.preventDefault();
    let report = this.state.report;

    if (report.motivo && report.texto) {
    } else {
      let input = this.state.input;
      report.motivo ? (input.motivo = false) : (input.motivo = true);
      report.texto ? (input.texto = false) : (input.texto = true);

      this.setState({ input });
    }
  };

  render() {
    const { classes } = this.props;
    const { input } = this.state;

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
              Contáctanos{" "}
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.submitTopic}
            >
              <Typography
                component="div"
                variant="body1"
                style={{ margin: "10px 0 " }}
              ></Typography>
              <TextField
                error={input.motivo}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Motivo"
                label="Motivo"
                name="title"
                autoComplete="title"
                autoFocus
                onChange={e => this.changeField(e, "motivo")}
              />
              {input.motivo ? (
                <FormHelperText className={classes.error}>
                  Introduce el motivo de tu report
                </FormHelperText>
              ) : (
                ""
              )}

              <TextField
                error={input.texto}
                variant="outlined"
                margin="normal"
                multiline="true"
                required
                fullWidth
                id="Comentario"
                label="Comentario"
                name="comentario"
                autoFocus
                rows={3}
                onChange={e => this.changeField(e, "texto")}
              />
              {input.texto ? (
                <FormHelperText className={classes.error}>
                  Especifica el motivo del report
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
              >
                Enviar
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

export default withStyles(styles)(Contact);
