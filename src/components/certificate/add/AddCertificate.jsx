import "./AddCertificate.css";
import React from "react";
import Navbar from "../../other/Navbar";
import web3 from "../../web3";
import puc from "../../puc";
import { Footer } from "../../other/Footer/Footer";
import data from "../data";
const GAS_LIMIT = 3000000;
export class AddCertificate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      name: "",
      vehicleNO: "",
      CO: "",
      NOX: "",
      HC: "",
      issueDate: "",
      isValid: false,
      web3: null,
      account: "",
      receipt: null,
      isReceiptGenerated: false,
      isLoading: false,
    };
    this.loadBlockchain = this.loadBlockchain.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRead = this.handleRead.bind(this);
  }

  componentDidMount() {
    this.loadBlockchain();
  }

  handleChange(event) {
    let change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
    console.log(change);
  }

  async loadBlockchain() {
    const givenProvider = await web3.givenProvider;
    console.log("web3  ::::", web3);

    if (givenProvider !== null) {
      this.setState({
        isConnected: true,
      });
    }

    if (this.state.isConnected) {
      const accounts = await web3.eth.getAccounts();

      if (accounts === undefined) {
        this.setState({
          isFailed: true,
        });
      }
      console.log("metamask account :-", accounts[0]);
      //await web3.eth.accounts.wallet.add(accounts[0]);

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
  async handleRead(event) {
    event.preventDefault();

    let i = Math.floor(Math.random() * 3);

    this.setState({
      CO: data[i].CO,
      NOX: data[i].NOX,
      HC: data[i].HC,
    });

    if (this.state.CO < 3 && this.state.NOX < 800 && this.state.HC < 1200) {
      this.setState({
        isValid: true,
      });
    } else {
      this.setState({
        isValid: false,
      });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({
      isLoading: true,
    });

    const contract = this.state.contract;

    // if (parseInt(this.state.CO) < 2.3 && parseInt(this.state.NOX) < 800) {
    //   this.setState({
    //     isValid: true,
    //   });
    // }

    const addCertificateParams = {
      userName: this.state.name,
      vehicleNO: this.state.vehicleNO,
      CO: parseInt(this.state.CO),
      NOX: parseInt(this.state.NOX),
      HC: parseInt(this.state.HC),
      issueDate: new Date().toLocaleDateString(),
      isValid: this.state.isValid,
      accountAddress: this.state.account,
    };

    this.setState({
      message: "⚠️Wait for the transaction to complete❕",
    });

    console.log("add cert params :-", addCertificateParams);
    const txReceipt = await contract.methods
      .addCertificate(
        addCertificateParams.userName,
        addCertificateParams.vehicleNO,
        addCertificateParams.accountAddress,
        addCertificateParams.CO,
        addCertificateParams.NOX,
        addCertificateParams.HC,
        addCertificateParams.issueDate,
        addCertificateParams.isValid
      )
      .send({
        from: this.state.account,
        gas: GAS_LIMIT,
      });

    console.log("tx receipt :-", JSON.stringify(txReceipt));

    const receiptData = {
      transactionHash: txReceipt.transactionHash,
      blockHash: txReceipt.blockHash,
      blockNumber: txReceipt.blockNumber,
      from: txReceipt.from,
      to: txReceipt.to,
      gasUsed: txReceipt.gasUsed,
      cumulativeGasUsed: txReceipt.cumulativeGasUsed,
    };

    this.setState({
      isReceiptGenerated: true,
      receipt: receiptData,
    });

    this.setState({
      isLoading: false,
    });

    this.setState({
      name: "",
      vehicleNO: "",
      CO: "",
      NOX: "",
      HC: "",
      issueDate: "",
    });

    this.setState({
      message: "✅ Transaction is successful❕",
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div>
          <p>{this.state.message}</p>
        </div>
        <div className="form-box">
          <form>
            <table>
              <tbody>
                <tr>
                  <td colSpan="2">
                    <h2>Fill out the Form!</h2>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <b>Name:</b>
                    </label>
                  </td>
                  <td>
                    <br />
                    <input
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <b>Vehicle Number:</b>
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="vehicleNO"
                      value={this.state.vehicleNO}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <b>Carbon dioxide:</b>
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="CO"
                      value={this.state.CO}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <b>Nitrogen dioxide:</b>
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="NOX"
                      value={this.state.NOX}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <b>Hydro carbon:</b>
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="HC"
                      value={this.state.HC}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                {/* <tr>
                  <td>
                    <label>
                      <b>Valid or Not:</b>
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="isValid"
                      value={this.state.isValid}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr> */}
                <tr>
                  <td>
                    <br />
                    <button type="submit" onClick={this.handleRead}>
                      Read
                    </button>
                  </td>
                  <td>
                    <br />
                    <button type="submit" onClick={this.handleSubmit}>
                      Submit
                    </button>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <br />
        <Footer />
      </div>
    );
  }
}

export default AddCertificate;
