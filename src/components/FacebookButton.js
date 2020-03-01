import React from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

export default class FacebookButton extends React.Component {
  state = {
    user: {
      isLoggedIn: false,
      avatar: "",
      email: "",
      username: "",
      password: ""
    },
    currentUsersEmail: [],
    currentUsersUsername: []
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API}/users`)
      .then(res => {
        this.setState({
          currentUsersEmail: res.data.map(user => user.email),
          currentUsersUsername: res.data.map(user => user.username)
        });
      })
      .catch(err => {});
  }

  responseFacebook = response => {
    let user = this.state.user;
    user.name = response.name;
    user.email = response.email;
    user.password = response.userID;

    this.setState({
      user,
      email: response.email,
      picture: response.picture.data.url
    });
  };

  render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = null;
    } else {
      fbContent = (
        <FacebookLogin
          appId="3241097339298047"
          autoLoad={true}
          fields="name, email, picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }

    return <div>{fbContent}</div>;
  }
}
