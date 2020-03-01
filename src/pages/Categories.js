import React from "react";
import "../App.css";
import NavBar from "../components/NavBar";
import DesktopGridCategories from "../components/DesktopGridCategories";
import PhoneGridCategories from "../components/PhoneGridCategories";
import Hidden from "@material-ui/core/Hidden";
import "../styles/general.css";
import axios from "axios";

class Categories extends React.Component {
  state = {
    categories: []
  };
  componentDidMount() {
    let categories = this.state.categories;
    axios.get(`${process.env.REACT_APP_API}/categories`).then(res => {
      categories = res.data;
      this.setState({ categories });
    });
  }

  render() {
    return (
      <>
        <NavBar />

        <div className="wrap">
          <Hidden smUp>
            <PhoneGridCategories categories={this.state.categories} />
          </Hidden>
          <Hidden xsDown>
            <DesktopGridCategories categories={this.state.categories} />
          </Hidden>
        </div>
      </>
    );
  }
}

export default Categories;
