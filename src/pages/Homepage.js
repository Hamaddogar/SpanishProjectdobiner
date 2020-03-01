import React from "react";
import "../App.css";
import NavBar from "../components/NavBar";
//import DesktopCarousel from "../components/DesktopCarousel";
import DesktopGrid from "../components/DesktopGrid";
//import PhoneCarousel from "../components/PhoneCarousel";
import PhoneGrid from "../components/PhoneGrid";
import Footer from "../components/Footer";

import Hidden from "@material-ui/core/Hidden";
import "../styles/general.css";

import axios from "axios";

class Homepage extends React.Component {
  state = {
    topics: [],
    user: {},
    loading: true,
    imageStatus: "loading"
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
      let loading = this.state.loading;
      user = profile.data;
      topics = topic.data;
      loading = false;

      this.setState({ topics, user, loading });
    });
  }

  deleteTopic = id => {
    axios.delete(`${process.env.REACT_APP_API}/topic/${id}`).then(res => {
      let topics = this.state.topics;

      let a = topics.filter(n => n._id !== id);

      topics = a;
      this.setState({ topics });
    });
  };

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded" });
  }

  handleImageErrored() {
    this.setState({ imageStatus: "failed to load" });
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
        <div id="fb-root"></div>

        <NavBar />

        <div className="wrap">
          <Hidden smUp>
            <PhoneGrid
              topics={this.state.topics}
              favorite={this.favorite}
              user={this.state.user}
              deleteTopic={this.deleteTopic}
              loading={this.state.loading}
            />
          </Hidden>
          <Hidden xsDown>
            <DesktopGrid
              topics={this.state.topics}
              favorite={this.favorite}
              user={this.state.user}
              deleteTopic={this.deleteTopic}
              loading={this.state.loading}
            />
          </Hidden>
        </div>
        <Footer />
      </>
    );
  }
}

export default Homepage;
