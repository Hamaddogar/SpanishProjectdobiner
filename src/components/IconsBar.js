import React from "react";

import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon
} from "react-share";

class IconsBar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="iconBar">
          <FacebookShareButton
            url={`http://debatimos.herokuapp.com/tema/${this.props.topic._id}/`}
            quote={`${this.props.topic.title}   Comparte tu opinión y descubre lo que la comunidad piensa sobre el tema en Debatimos.com`}
            style={{ margin: "0 2px" }}
            className="iconLogo"
            media={this.props.topic.image}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>

          <TwitterShareButton
            url={`http://debatimos.herokuapp.com/tema/${this.props.topic._id}/`}
            title={`${this.props.topic.title} Comparte tu opinión y descubre lo que la comunidad piensa sobre el tema`}
            via={"debatimos.com"}
            style={{ margin: "0 2px" }}
            className="iconLogo"
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton
            title={`${this.props.topic.title} - Debatimos.com`}
            media={this.props.topic.image}
            separator={
              "Comparte tu opinión y descubre lo que la comunidad piensa sobre el tema: "
            }
            url={`http://debatimos.herokuapp.com/tema/${this.props.topic._id}/`}
            style={{ margin: "0 2px" }}
            className="iconLogo"
          >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <TelegramShareButton
            url={`http://debatimos.herokuapp.com/tema/${this.props.topic._id}/`}
            style={{ margin: "0 2px" }}
            className="iconLogo"
            title={`${this.props.topic.title} Comparte tu opinión y descubre lo que la comunidad piensa sobre el tema `}
          >
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
        </div>
      </React.Fragment>
    );
  }
}

export default IconsBar;
