import React from "react";
import "../App.css";
import NavBar from "../components/NavBar";
import DesktopGrid from "../components/DesktopGrid";
import PhoneGrid from "../components/PhoneGrid";
import Hidden from "@material-ui/core/Hidden";
import "../styles/general.css";
import axios from "axios";

class Favorites extends React.Component {
  state = {
    topics: [],
    user: {}
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    Promise.all([
      axios.get(`${process.env.REACT_APP_API}/topic`),
      localStorage.getItem("token")
        ? axios.get(`${process.env.REACT_APP_API}/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        : ""
    ]).then(([topic, profile]) => {
      let topics = this.state.topics;
      let user = this.state.profile;
      user = profile.data;
      topics = topic.data;
      if (user) {
        topics = topics.filter(n => n.favorites.includes(user._id));
      }

      this.setState({ topics, user });
    });
  }

  favorite = index => {
    if (localStorage.getItem("token")) {
      let user = this.state.user._id;
      let topic = this.state.topics[index];
      topic.favorites.includes(user)
        ? (topic.favorites = topic.favorites.filter(n => n !== user))
        : topic.favorites.push(user);

      axios
        .patch(`${process.env.REACT_APP_API}/vote/${topic._id}`, topic)
        .then(res => {
          this.setState({ topic });
        });
    }
  };

  render() {
    return (
      <>
        <NavBar />
        <div className="wrap">
          <Hidden smUp>
            <PhoneGrid
              topics={this.state.topics}
              favorite={this.favorite}
              user={this.state.user}
            />
          </Hidden>
          <Hidden xsDown>
            <DesktopGrid
              topics={this.state.topics}
              favorite={this.favorite}
              user={this.state.user}
            />
          </Hidden>
        </div>
      </>
    );
  }
}

export default Favorites;
