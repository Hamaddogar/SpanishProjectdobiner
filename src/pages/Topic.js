import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import "../styles/general.css";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import NavBar from "../components/NavBar";
import AppBarPro from "../components/AppBarPro";
import AppBarCon from "../components/AppBarCon";
import YesNoProgressBar from "../components/YesNoProgressBar";
import ProOpinionCard from "../components/ProOpinionCard";
import ConOpinionCard from "../components/ConOpinionCard";
import PostProOpinion from "../components/PostProOpinion";
import PostConOpinion from "../components/PostConOpinion";
import IconsBar from "../components/IconsBar";
import IconsBarSmall from "../components/IconsBarSmall";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

class Topic extends React.Component {
  state = {
    topic: {
      image: "",
      title: "",
      yesVotes: [],
      noVotes: [],
      favorites: [0]
    },

    opinions: [],

    proOpinions: [
      {
        user: { username: "", _id: "" },
        upvoters: []
      }
    ],
    conOpinions: [
      {
        user: { username: "", _id: "" },
        upvoters: []
      }
    ],
    currentProOpinion: {
      topic: "",
      title: "",
      text: "",
      user: "",
      side: "pro",
      upvoters: []
    },
    currentConOpinion: {
      topic: "",
      title: "",
      text: "",
      user: "",
      side: "con",
      upvoters: []
    },
    currentProComment: {
      opinion: "",
      text: "",
      user: ""
    },
    currentConComment: {
      opinion: "",
      text: "",
      user: ""
    },
    pushOpinion: [
      {
        user: { username: "" }
      }
    ],

    user: { _id: "1" },
    test: ["a", "b"]
  };

  componentDidMount() {
    let token = localStorage.getItem("token");
    Promise.all([
      axios.get(
        `${process.env.REACT_APP_API}/topic/${this.props.match.params.id}`
      ),
      axios.get(
        `${process.env.REACT_APP_API}/opinions/topic/${this.props.match.params.id}`
      ),
      localStorage.getItem("token")
        ? axios.get(`${process.env.REACT_APP_API}/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        : ""
    ]).then(([topic, opinions, res]) => {
      let user = this.state.user;
      user = res.data;

      let currentProOpinion = this.state.currentProOpinion;
      let currentConOpinion = this.state.currentConOpinion;
      let currentProComment = this.state.currentProComment;
      let currentConComment = this.state.currentConComment;
      currentProComment.user = res.data;
      currentProOpinion.user = res.data;
      currentConComment.user = res.data;
      currentConOpinion.user = res.data;
      currentProOpinion.topic = this.props.match.params.id;
      currentConOpinion.topic = this.props.match.params.id;
      topic._id = this.props.match.params.id;

      this.setState({
        topic: topic.data,
        opinions: opinions.data,
        proOpinions: opinions.data.filter(opinion => opinion.side === "pro"),
        conOpinions: opinions.data.filter(opinion => opinion.side === "con"),
        user,
        currentProOpinion,
        currentConOpinion,
        currentProComment,
        currentConComment
      });
    });
  }

  writeProOpinion = (e, field) => {
    let currentProOpinion = this.state.currentProOpinion;
    currentProOpinion[field] = e.target.value;
    this.setState({ currentProOpinion });
  };

  deleteProOpinion = id => {
    axios.delete(`${process.env.REACT_APP_API}/opinion/${id}`).then(res => {
      let proOpinions = this.state.proOpinions;
      let opinionFiltered = proOpinions.filter(n => n._id !== id);

      proOpinions = opinionFiltered;

      this.setState({ proOpinions });
    });
  };

  deleteConOpinion = id => {
    axios.delete(`${process.env.REACT_APP_API}/opinion/${id}`).then(res => {
      let conOpinions = this.state.conOpinions;
      let opinionFiltered = conOpinions.filter(n => n._id !== id);
      conOpinions = opinionFiltered;

      this.setState({ conOpinions });
    });
  };

  idClick = id => {
    let currentProComment = this.state.currentProComment;
    currentProComment._id = id.target.value;
    this.setState({ currentProComment });
  };

  idConClick = id => {
    let currentConComment = this.state.currentConComment;
    currentConComment._id = id.target.value;
    this.setState({ currentConComment });
  };

  writeConOpinion = (e, field) => {
    let currentConOpinion = this.state.currentConOpinion;
    currentConOpinion[field] = e.target.value;
    this.setState({ currentConOpinion });
  };

  writeProComment = (e, field) => {
    let currentProComment = this.state.currentProComment;
    currentProComment[field] = e.target.value;
    this.setState({ currentProComment });
  };

  writeConComment = (e, field) => {
    let currentConComment = this.state.currentConComment;
    currentConComment[field] = e.target.value;
    this.setState({ currentConComment });
  };

  getId = opinion => {
    let currentProComment = this.state.currentProComment;

    currentProComment.opinion = opinion;

    this.setState({
      currentProComment
    });
  };

  getConId = e => {
    let currentConComment = this.state.currentConComment;

    currentConComment.opinion = e;

    this.setState({
      currentConComment
    });
  };

  submitConOpinion = e => {
    let conOpinions = this.state.conOpinions;
    let currentConOpinion = this.state.currentConOpinion;
    currentConOpinion.upvoters = [];

    e.preventDefault();

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
          conOpinions.push(res.data);
        })
        .then(res => {
          currentConOpinion.text = "";
          currentConOpinion.title = "";
          this.setState({
            currentConOpinion
          });
        })

        .catch(err => {});
    }
  };

  submitProOpinion = e => {
    let proOpinions = this.state.proOpinions;
    let currentProOpinion = this.state.currentProOpinion;
    currentProOpinion.upvoters = [];

    e.preventDefault();

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
          proOpinions.push(res.data);
          currentProOpinion.title = "";
          currentProOpinion.text = "";
          this.setState({
            currentProOpinion,
            proOpinions
          });
        })

        .catch(err => {});
    } else {
      console.log("good path");
      console.log(currentProOpinion.title);
    }
  };

  voteYes = () => {
    if (localStorage.getItem("token")) {
      let user = this.state.user._id;
      let topic = this.state.topic;
      topic.yesVotes.includes(user)
        ? (topic.yesVotes = topic.yesVotes.filter(n => n !== user))
        : topic.yesVotes.push(user);

      if (topic.noVotes.includes(user)) {
        topic.noVotes = topic.noVotes.filter(n => n !== user);
      }

      axios
        .patch(
          `${process.env.REACT_APP_API}/vote/${this.props.match.params.id}`,
          topic
        )
        .then(res => {
          topic.percentage = Math.round(
            (topic.yesVotes.length /
              (topic.yesVotes.length + topic.noVotes.length)) *
              100
          )
            ? Math.round(
                (topic.yesVotes.length /
                  (topic.yesVotes.length + topic.noVotes.length)) *
                  100
              )
            : 0;

          this.setState({
            topic
          });
        })
        .catch(err => {});
    }
  };

  voteNo = () => {
    if (localStorage.getItem("token")) {
      let user = this.state.user._id;
      let topic = this.state.topic;

      topic.noVotes.includes(user)
        ? (topic.noVotes = topic.noVotes.filter(n => n !== user))
        : topic.noVotes.push(user);

      if (topic.yesVotes.includes(user)) {
        topic.yesVotes = topic.yesVotes.filter(n => n !== user);
      }

      axios
        .patch(
          `${process.env.REACT_APP_API}/vote/${this.props.match.params.id}`,
          topic
        )
        .then(res => {
          topic.percentage = Math.round(
            (topic.yesVotes.length /
              (topic.yesVotes.length + topic.noVotes.length)) *
              100
          )
            ? Math.round(
                (topic.yesVotes.length /
                  (topic.yesVotes.length + topic.noVotes.length)) *
                  100
              )
            : 0;

          this.setState({
            topic
          });
        })
        .catch(err => {});
    }
  };

  upvote = opinionId => {
    if (localStorage.getItem("token")) {
      let user = this.state.user._id;
      let proOpinions = this.state.proOpinions;
      let opinion = proOpinions.find(o => o._id === opinionId);

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

  favorite = () => {
    if (localStorage.getItem("token")) {
      let user = this.state.user._id;
      let topic = this.state.topic;
      topic.favorites.includes(user)
        ? (topic.favorites = topic.favorites.filter(n => n !== user))
        : topic.favorites.push(user);

      axios
        .patch(`${process.env.REACT_APP_API}/vote/${topic._id}`, topic)
        .then(res => {
          this.setState({ topic });
        })

        .catch(err => {});
    }
  };

  conUpvote = opinionId => {
    if (localStorage.getItem("token")) {
      let user = this.state.user._id;
      let conOpinions = this.state.conOpinions;
      let opinion = conOpinions.find(o => o._id === opinionId);

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

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />

        <Container
          xs={"xs"}
          sm={"xl"}
          md={"xl"}
          lg={"xl"}
          maxWidth="xl"
          style={{ margin: "40px auto" }}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item>
              <h1 className="titleMainTopic">{this.state.topic.title}</h1>
            </Grid>
            <Grid item xs className="imageGrid">
              <div className="gridImage">
                <img
                  className="topicImage"
                  src={this.state.topic.image}
                  alt={this.state.topic.title}
                />
                <Hidden xsDown>
                  <IconsBar
                    topic={this.state.topic}
                    style={{ position: "absolute" }}
                  />
                </Hidden>
                <Hidden smUp>
                  <IconsBarSmall
                    topic={this.state.topic}
                    style={{ position: "absolute" }}
                  />
                </Hidden>
                <div className="favoriteIcon">
                  <IconButton
                    aria-label="add to favorites"
                    size="small"
                    onClick={() => this.favorite()}
                  >
                    <FavoriteIcon
                      className={
                        this.state.user
                          ? this.state.topic.favorites.includes(
                              this.state.user._id
                            )
                            ? "favoriteColor"
                            : ""
                          : ""
                      }
                    />
                  </IconButton>
                </div>
              </div>
            </Grid>
            <Typography
              variant="h4"
              component="h4"
              style={{ color: "#388e3c" }}
              justify="center"
            >
              {this.state.topic.percentage}%
            </Typography>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <YesNoProgressBar
                percentage={this.state.topic.percentage}
                voteNo={this.voteNo}
                voteYes={this.voteYes}
                topic={this.state.topic}
                user={this.state.user}
              />
              {console.log("ss", this.state.topic._id)}
            </Grid>

            <Grid
              style={{ marginTop: "30px" }}
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item xs={12} sm={6}>
                <AppBarPro />
                <ProOpinionCard
                  opinion={this.state.proOpinions}
                  upvote={this.upvote}
                  user={this.state.user}
                  deleteOpinion={this.deleteProOpinion}
                  getId={this.getId}
                />
                {this.state.user ? (
                  <PostProOpinion
                    user={this.state.user}
                    topic={this.state.topic._id}
                  />
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <AppBarCon />
                <ConOpinionCard
                  upvote={this.conUpvote}
                  opinion={this.state.conOpinions}
                  getConId={this.getConId}
                  user={this.state.user}
                  deleteOpinion={this.deleteConOpinion}
                  getId={this.getId}
                />
                {this.state.user ? (
                  <PostConOpinion
                    user={this.state.user}
                    topic={this.state.topic._id}
                  />
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            {this.state.opinions.length === 0 && !this.state.user ? (
              <Typography
                style={{ margin: "40px 0" }}
                variant="h5"
                component="h5"
                justify="center"
              >
                Este tema aún no tiene opiniones
              </Typography>
            ) : (
              ""
            )}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default Topic;
