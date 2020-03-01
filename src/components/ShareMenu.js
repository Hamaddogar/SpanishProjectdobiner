import React from "react";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
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
import "../styles/card.css";

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        size="small"
        style={{ margin: "5px 0 " }}
        onClick={handleClick}
      >
        <ShareIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div style={{ display: "flex" }}>
          <FacebookShareButton
            url={`http://debatimos.herokuapp.com/tema/${props.topic._id}/`}
            quote={`${props.topic.title}   Comparte tu opinión y descubre lo que la comunidad piensa sobre el tema en Debatimos.com`}
            style={{ margin: "0 2px" }}
            className="iconLogo"
            media={props.topic.image}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>

          <TwitterShareButton
            url={`http://debatimos.herokuapp.com/tema/${props.topic._id}/`}
            title={`${props.topic.title} Comparte tu opinión y descubre lo que la comunidad piensa sobre el tema`}
            via={"debatimos.com"}
            style={{ margin: "0 2px" }}
            className="iconLogo"
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton
            title={`${props.topic.title} - Debatimos.com`}
            media={props.topic.image}
            separator={
              "Comparte tu opinión y descubre lo que la comunidad piensa sobre el tema "
            }
            url={`http://debatimos.herokuapp.com/tema/${props.topic._id}/`}
            style={{ margin: "0 2px" }}
            className="iconLogo"
          >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <TelegramShareButton
            url={`http://debatimos.herokuapp.com/tema/${props.topic._id}/`}
            style={{ margin: "0 2px" }}
            className="iconLogo"
            title={`${props.topic.title} Comparte tu opinión y descubre lo que la comunidad piensa sobre el tema `}
          >
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
        </div>{" "}
      </Menu>
    </div>
  );
}
