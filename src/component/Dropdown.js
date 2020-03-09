import React from "react";
// import PropTypes from "prop-types";
import "./GenderDropdown.css";

export default class Dropdown extends React.Component {
  //   static propTypes = {
  //     gender: PropTypes.array,
  //   };

  constructor() {
    super();

    this.state = {
      displayMenu: false
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  handleClick = e => {
    let name = e.currentTarget.dataset.div_dropdown_id;
    let head = e.currentTarget.dataset.div_dropdownheader_id;
    document.getElementById(head).innerHTML = name;
    if (name === "select") {
      this.props.clickHandler("");
    } else {
      this.props.clickHandler(name);
    }
  };

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }

  render() {
    let show = this.props.disabled;
    let select = "select";
    let episodeComponent;
    if (show === false) {
      episodeComponent = (
        <div
          className="btn btn-primary dropdown-toggle custom disabled"
          onClick={this.showDropdownMenu}
          id={this.props.dropdowntitle}
        >
          {this.props.dropdowntitle}
        </div>
      );
    } else {
      episodeComponent = (
        <div
          className="btn btn-primary dropdown-toggle custom"
          onClick={this.showDropdownMenu}
          id={this.props.dropdowntitle}
        >
          {this.props.dropdowntitle}
        </div>
      );
    }
    return (
      <div>
        <div className="dropdown">
          {episodeComponent}
          {this.state.displayMenu ? (
            <ul>
              <li
                onClick={this.handleClick}
                key={select}
                data-div_dropdown_id={select}
                data-div_dropdownheader_id={this.props.dropdowntitle}
              >
                -- select --
              </li>
              {this.props.dropDownObj.map(obj => (
                <li
                  onClick={this.handleClick}
                  key={obj.value}
                  data-div_dropdown_id={obj.value}
                  data-div_dropdownheader_id={this.props.dropdowntitle}
                >
                  {obj.value}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}
