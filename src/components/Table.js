import React from "react";
import "../styles.css";

class Table extends React.Component {
  state = {
    title: {
      name: "Name",
      surname: "Surname",
      specialAttack: "Special Attack",
      level: "Level",
      type: "Type"
    },
    user: [
      {
        name: "Nil",
        surname: "Armengol",
        specialAttack: "forgiveness",
        level: 89,
        type: "Fire"
      },
      {
        name: "Luis",
        surname: "Romero",
        specialAttack: "betrayal",
        level: 23,
        type: "Plant"
      },

      {
        name: "Palmerino",
        surname: "Llobet",
        specialAttack: "peeing in pants",
        level: 10,
        type: "Water"
      }
    ],
    newOrder: [{ name: "", surname: "", specialAttack: "", level: 0, type: "" }]
  };

  componentDidMount() {
    this.setState({
      newOrder: this.state.user
    });
  }

  sortingUp = () => {
    let user = this.state.user;

    user.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });

    this.setState({ user: user });
  };

  sortingDown = () => {
    let user = this.state.user;

    user.sort((a, b) => {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });

    this.setState({ user: user });
  };

  render() {
    return (
      <>
        <table>
          <tr>
            <th>
              {this.state.title.name} <span onClick={this.sortingUp}>A-Z</span>
              <span onClick={this.sortingDown}>Z-A</span>
            </th>
            <th>{this.state.title.surname}</th>
            <th>{this.state.title.specialAttack}</th>
            <th>{this.state.title.level}</th>
            <th>{this.state.title.type}</th>
          </tr>
          {this.state.user.map(user => (
            <tr>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.specialAttack}</td>
              <td>{user.level}</td>
              <td>{user.type}</td>
            </tr>
          ))}
        </table>
      </>
    );
  }
}

export default Table;
