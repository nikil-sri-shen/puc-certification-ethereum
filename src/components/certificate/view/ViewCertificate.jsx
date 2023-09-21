import "./ViewCertificate.css";
import React from "react";
import { Navbar } from "../../other/Navbar";
import web3 from "../../web3";
import puc from "../../puc";

export class ViewCertificate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      certificateId: "",
      web3: null,
      contract: null,
      account: null,
      name: "",
      vehicleNO: "",
      CO: "",
      NOX: "",
      HC: "",
      issueDate: "",
      isValid: false,
      isFetched: false,
      isConnected: false,
    };

    this.loadBlockchain = this.loadBlockchain.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadBlockchain();
  }

  async loadBlockchain() {
    console.log("web3 provider ::::", await web3.givenProvider);
    const givenProvider = await web3.givenProvider;

    if (givenProvider !== null) {
      this.setState({
        isConnected: true,
      });
    }

    if (this.state.isConnected) {
      const accounts = await web3.eth.getAccounts();
      console.log("accounts :-", accounts);

      // const networkId = await web3.eth.net.getId();
      // const deployedNetwork = CertificateContract.networks[networkId];
      // const instance = new web3.eth.Contract(
      //     CertificateContract.abi,
      //     deployedNetwork && deployedNetwork.address,
      // );

      this.setState({
        web3,
        account: accounts[0],
        contract: puc,
      });
    }
  }

  handleChange(event) {
    this.setState({
      vehicleNO: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const getCertificateParams = {
      account: this.state.account,
      id: this.state.vehicleNO,
    };

    const contract = this.state.contract;

    const certificateDetailsResponse = await contract.methods
      .getCertificate(getCertificateParams.account, getCertificateParams.id)
      .call();

    if (certificateDetailsResponse !== undefined) {
      this.setState({
        isFetched: true,
      });
    }
    this.setCertificateDetails(certificateDetailsResponse);
  }

  setCertificateDetails(certificateDetails) {
    // const date = new Date(Number(certificateDetails[5])).toDateString();

    this.setState({
      name: certificateDetails[0],
      vehicleNO: certificateDetails[1],
      CO: certificateDetails[2],
      NOX: certificateDetails[3],
      HC: certificateDetails[4],
      issueDate: certificateDetails[5],
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <form className="form-box">
          <label>
            <h2>Get certificate</h2>
          </label>
          <br />
          <br />
          <label>
            <b>Enter the vehicle number:</b>
          </label>
          <br />
          <input
            type="text"
            name="certificateId"
            value={this.state.vehicleNO}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <button type="submit" onClick={this.handleSubmit}>
            Get Certificate
          </button>
        </form>
        <br />
        <div>
          {this.state.isFetched ? (
            <div className="form-box-table">
              <h2>Certificate Details</h2>
              <div>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <b>Owner Name:</b>
                      </td>
                      <td>{this.state.name}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Vehicle number:</b>
                      </td>
                      <td>{this.state.vehicleNO}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Carbon dioxide:</b>
                      </td>
                      <td>{this.state.CO}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Nitrogen dioxide:</b>
                      </td>
                      <td>{this.state.NOX}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Hydrocarbon:</b>
                      </td>
                      <td>{this.state.HC}</td>
                    </tr>
                    <tr>
                      <td>
                        <b>Issue Date:</b>
                      </td>
                      <td>{this.state.issueDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ViewCertificate;
