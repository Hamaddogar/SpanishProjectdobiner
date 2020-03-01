import React from "react";

import "../styles/general.css";

import Grid from "@material-ui/core/Grid";
import ProgressBar from "../components/ProgressBar";
import ButtonYes from "../components/ButtonYes";
import ButtonNo from "../components/ButtonNo";
import Hidden from "@material-ui/core/Hidden";

class YesNoProgressBar extends React.Component {
  render() {
    return (
      <>
        <Grid
          container
          spacing={1}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs>
            <Hidden xsDown>
              <div style={{ float: "right" }}>
                <ButtonYes
                  voteYes={this.props.voteYes}
                  topic={this.props.topic}
                  user={this.props.user}
                />
              </div>
            </Hidden>
          </Grid>
          <Grid item xs={12} sm={8}>
            <ProgressBar percentage={this.props.topic.percentage} />
          </Grid>
          <Grid item xs>
            <Hidden xsDown>
              <div>
                <ButtonNo
                  voteNo={this.props.voteNo}
                  topic={this.props.topic}
                  user={this.props.user}
                />
              </div>
            </Hidden>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs>
            <Hidden smUp>
              <div style={{ float: "right" }}>
                <ButtonYes
                  voteYes={this.props.voteYes}
                  topic={this.props.topic}
                  user={this.props.user}
                />
              </div>
            </Hidden>
          </Grid>
          <Grid item xs>
            <Hidden smUp>
              <div>
                <ButtonNo
                  voteNo={this.props.voteNo}
                  topic={this.props.topic}
                  user={this.props.user}
                />
              </div>
            </Hidden>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default YesNoProgressBar;
