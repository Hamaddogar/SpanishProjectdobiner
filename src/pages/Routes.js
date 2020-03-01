import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./Signup";
import Homepage from "./Homepage";
import PostTopic from "./PostTopic";
import Topic from "./Topic";
import Favorites from "./Favorites";
import Categories from "./Categories";
import Category from "./Category";
import ForgotPassword from "./ForgotPassword";
import NewPassword from "./NewPassword";
import EditTopic from "./EditTopic";
import Contact from "./Contact";
import reset from '../pages/reset'

import Perfil from "./Perfil";

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/registrar" component={Signup} />
          <Route path="/editar-tema/:id" component={EditTopic} />
          <Route path="/favoritos" component={Favorites} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/reset/:token" component={reset} />
          {/* <Route path="/newPassword" component={NewPassword} /> */}
          <Route path="/favoritos" component={Favorites} />
          <Route path="/contact" component={Contact} />
          <Route path="/perfil" component={Perfil} />
          <Route path="/crear" component={PostTopic} />
          <Route path="/tema/:id" component={Topic} />
          <Route path="/categoria/:id" component={Category} />
          <Route path="/categorias" component={Categories} />
          <Route path="/" component={Homepage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
