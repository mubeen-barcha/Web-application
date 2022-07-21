import React from "react";
import { createRoot } from "react-dom/client";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
import './App.css'

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return (
        <>
          <div>Error: {this.state.errorMessage}</div>
        </>
      );
    }

    if (!this.state.errorMessage && this.state.lat) {
      return (
        <>
          <SeasonDisplay lat={this.state.lat} />
        </>
      );
    }
    return (
      <>
        <Spinner message="please accept location request" />
      </>
    );
  }

  // React says we have to define render!!
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
