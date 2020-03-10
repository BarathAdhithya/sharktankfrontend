import React, { Component } from "react";
import "./App.css";
import DatatablePage from "./DatatablePage";
import Dropdown from "./Dropdown";
import DisplayTable from "./DisplayTable";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: "http://localhost:3000",
      companies: [],
      onloadGetApi: {
        seasonlist: "/seasonlist",
        genderlist: "/genderlist",
        episodelist: "/episodelist",
        investorlist: "/investorlist"
      },
      genders: [],
      seasons: [],
      episodes: [],
      investors: [],
      genderParam: "",
      seasonParam: "",
      episodeParam: "",
      investorParam: "",
      dealParam: "",
      deal: [{ value: "yes" }, { value: "no" }],
      episodeNo: "",
      showEpisodeComponent: false,
      displayTable: false
    };
    this.sendReq = this.sendReq.bind(this);
    this.seasonReqApi = this.seasonReqApi.bind(this);
    this.genderReqApi = this.genderReqApi.bind(this);
    this.episodeReqApi = this.episodeReqApi.bind(this);
    this.handleClickInvestor = this.handleClickInvestor.bind(this);
    this.handleClickDeal = this.handleClickDeal.bind(this);
  }

  componentDidMount() {
    this.seasonReqApi();
    this.genderReqApi();
    this.investorReqApi();
  }

  genderReqApi() {
    let url = this.state.host + "/genderlist";
    console.log("gender url :", url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ genders: data });
        console.log(this.state.genders);
      })
      .catch(console.log);
  }

  seasonReqApi() {
    let url = this.state.host + "/seasonlist";
    console.log("season url :", url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ seasons: data });
        console.log(this.state.seasons);
      })
      .catch(console.log);
  }

  investorReqApi() {
    let url = this.state.host + "/investorlist";
    console.log("investor url :", url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ investors: data });
        console.log(this.state.seasons);
      })
      .catch(console.log);
  }

  episodeReqApi(seasonNo) {
    let url = this.state.host + "/episodelist?seasonNo=" + seasonNo;
    console.log("episode url :", url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ episodes: data });
        console.log(this.state.episodes);
      })
      .catch(console.log);
  }

  sendReq() {
    let url =
      this.state.host +
      "/mainsearch?seasonNo=" +
      this.state.seasonParam +
      "&episodeNo=" +
      this.state.episodeParam +
      "&gender=" +
      this.state.genderParam +
      "&deal=" +
      this.state.dealParam +
      "&investor=" +
      this.state.investorParam;

    console.log("url :", url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ companies: data });
      })
      .catch(console.log);
    this.setState({ displayTable: true });
  }

  handleClickGender = genderName => {
    let genderObj = {};
    if (genderName === "") {
      genderObj = { id: "" };
    } else {
      genderObj = this.state.genders.find(gender => {
        if (gender.value === genderName) {
          return gender;
        }
        return "";
      });
    }

    console.log("genderParam", genderObj.id);
    this.setState({ genderParam: genderObj.id });
  };
  handleClickSeason = seasonNo => {
    console.log("seasonNo", seasonNo);
    this.setState({ showEpisodeComponent: true });
    if (seasonNo) {
      this.episodeReqApi(seasonNo);
    }
    this.setState({ seasonParam: seasonNo });
  };
  handleClickEpisode = episodeNo => {
    console.log("episodeNo", episodeNo);
    this.setState({ episodeParam: episodeNo });
  };
  handleClickInvestor = investorNo => {
    let investor = {};
    if (investorNo === "") {
      investor = { id: "" };
    } else {
      investor = this.state.investors.find(investor => {
        if (investor.value === investorNo) {
          return investor;
        }
        return "";
      });
    }
    console.log("investorId", investor.id);
    this.setState({ investorParam: investor.id });
  };
  handleClickDeal = deal => {
    console.log("Deal", deal);
    this.setState({ dealParam: deal });
  };

  handleClickCompany = () =>{

  }
  
  render() {
    return (
      <div className="container main-container">
        <div class="title">
          <h1>SHARKTANK</h1>
          <h3>Search Module</h3>
        </div>
        <div className="search-block">
          <div className="col-sm-12 removePadding">
            <div class="row search-row">
              {/* <div class="col-xs-3">
              <label for="ex1">Season</label>
              <input
                class="form-control"
                type="text"
                value={this.state.seasonNo}
                onChange={this.updateSeasonNo}
                key={a}
              />
            </div> */}

              <div class="col-sm-2">
                {/* <label for="ex3">Season</label> */}
                <Dropdown
                  clickHandler={this.handleClickSeason}
                  dropDownObj={this.state.seasons}
                  dropdowntitle="Season"
                  onClick={this.showOrHideEpisode}
                />
              </div>
              <div class="col-sm-2">
                {/* <label for="ex3">Episode</label> */}
                <Dropdown
                  clickHandler={this.handleClickEpisode}
                  dropDownObj={this.state.episodes}
                  dropdowntitle="Episode"
                  className="disabledbutton"
                  disabled={this.state.showEpisodeComponent}
                />
              </div>
              <div class="col-sm-2">
                {/* <label for="ex3">Gender</label> */}
                <Dropdown
                  clickHandler={this.handleClickGender}
                  dropDownObj={this.state.genders}
                  dropdowntitle="Gender"
                />
              </div>
              <div class="col-sm-2">
                {/* <label for="ex3">Deal</label> */}
                <Dropdown
                  clickHandler={this.handleClickDeal}
                  dropDownObj={this.state.deal}
                  dropdowntitle="Deal"
                />
              </div>
              <div class="col-sm-2">
                {/* <label for="ex3">Investor</label> */}
                <Dropdown
                  clickHandler={this.handleClickInvestor}
                  dropDownObj={this.state.investors}
                  dropdowntitle="Investor"
                />
              </div>
              <div class="col-sm-2">
                <button
                  className="btn btn-primary btn-submit dropdown"
                  onClick={this.sendReq}
                >
                  Submit
                </button>
              </div>
            </div>

            {/* <DatatablePage companies={this.state.companies}></DatatablePage> */}
            {this.state.displayTable && (
              <DisplayTable
                companies={this.state.companies}
                clickHandler={this.handleClickCompany}
              ></DisplayTable>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
