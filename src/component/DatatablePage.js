import React from "react";
import { MDBDataTable } from "mdbreact";

export default class DatatablePage extends React.Component {
  constructor() {
    super();
  }
  render() {
    let data = {
      columns: [
        {
          label: "Company Id",
          field: "company_id",
          sort: "asc",
          width: 150
        },
        {
          label: "company Name",
          field: "company_name",
          sort: "asc",
          width: 270
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
          width: 100
        },
        {
          label: "Episode No",
          field: "episode_id",
          sort: "asc",
          width: 200
        },
        {
          label: "Season No",
          field: "season_id",
          sort: "asc",
          width: 100
        }
      ],
      rows: this.props.companies
    };
    console.log("data data:", data);
    return (
    <div>
    <MDBDataTable striped bordered small data={this.data} />
    </div>)
  }
}
