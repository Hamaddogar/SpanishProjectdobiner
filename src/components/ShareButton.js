import React, { Component } from "react";
import { FacebookProvider, ShareButton } from "react-facebook";

export default class Example extends Component {
  render() {
    return (
      <FacebookProvider appId="3241097339298047">
        <ShareButton href="http://debatimos.herokuapp.com/">Share</ShareButton>
        <p>jojojojojoj</p>
      </FacebookProvider>
    );
  }
}
