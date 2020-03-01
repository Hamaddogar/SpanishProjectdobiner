import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import ButtonAccess from "./ButtonAccess";
import ButtonUser from "./ButtonUser";
import Drawer from "./Drawer";
import Link from "@material-ui/core/Link";

const styles = theme => {
  return {
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  };
};

class NavBar extends React.Component {
  state = {
    user: {},
    unmatched: false
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      axios
        .get(`${process.env.REACT_APP_API}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          let user = this.state.user;
          user = res.data;

          this.setState({
            user
          });
        });
    }
  }

  changeAccessField = (e, field) => {
    let user = this.state.user;
    user[field] = e.target.value;
    this.setState({ user });
  };

  submitAccess = e => {
    e.preventDefault();
    let user = this.state.user;
    if (user.username && user.password) {
      axios.post(`${process.env.REACT_APP_API}/login`, user).then(res => {
        localStorage.setItem("token", res.data.token);
        window.location.reload();
      });
    } else {
      let unmatched = this.state.unmatched;
      unmatched = true;
      this.setState({
        unmatched
      });
    }
  };

  logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Drawer />

            <Link
              href="/"
              color="inherit"
              variant="h6"
              className={classes.title}
            >
              Debatimos
            </Link>
            {localStorage.getItem("token") ? (
              <ButtonUser logOut={this.logOut} user={this.state.user} />
            ) : (
              <ButtonAccess
                changeAccessField={this.changeAccessField}
                submitAccess={this.submitAccess}
                unmatched={this.state.unmatched}
              />
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
