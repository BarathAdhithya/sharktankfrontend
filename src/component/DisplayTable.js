import React from "react";
import PropTypes from "prop-types";

// import "./Display.css";

export default class DisplayTable extends React.Component {
  static propTypes = {
    value: PropTypes.string,
  };

  render() {
    return (
      <div className="component-display">
        {this.props.companies.map(company => (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{company.company_id}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {company.company_name}
                </h6>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
