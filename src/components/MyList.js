import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import List from "@material-ui/core/List";
import CreateIcon from "@material-ui/icons/Create";
import CategoryIcon from "@material-ui/icons/Category";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import InfoIcon from "@material-ui/icons/Info";
import FaceIcon from "@material-ui/icons/Face";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ReportIcon from "@material-ui/icons/Report";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import Link from "@material-ui/core/Link";

class MyList extends React.Component {
  render() {
    let sections = ["Ranking"];
    let icons = [<EmojiEventsIcon />];
    let textSub = [
      "Sobre nosotros",
      "Blog",
      "Reglas",
      "Reportar",
      "Contáctanos"
    ];
    let iconsSub = [
      <FaceIcon />,
      <InfoIcon />,
      <LibraryBooksIcon />,
      <ReportIcon />,
      <ContactMailIcon />
    ];

    return (
      <>
        <List>
          <Link underline="none" color="inherit" href="/crear">
            <ListItem button key={"Crear tema"}>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary={"Crear tema"} />
            </ListItem>
          </Link>
          <Link underline="none" color="inherit" href="/favoritos">
            <ListItem button key={"Favoritos"}>
              <ListItemIcon>
                <FavoriteBorderIcon />
              </ListItemIcon>
              <ListItemText primary={"Favoritos"} />
            </ListItem>
          </Link>
          <Link underline="none" color="inherit" href="/categorias">
            <ListItem button key={"Categorías"}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={"Categorías"} />
            </ListItem>
          </Link>

          {sections.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{icons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {textSub.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{iconsSub[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </>
    );
  }
}

export default MyList;
