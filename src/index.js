import React from "react";
import { createRoot } from "react-dom/client";

class App extends React.Component {
  constructor(props) {
    super(props);

    // this is only time we do direct assignment
    this.state = { lat: null, errorMessage: "" };

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        // we called setState!!!!
        this.setState({ lat: position.coords.latitude });
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  // React say we have to define render!!
  render() {
    if (this.state.errorMessage && !this.state.lat) {
        return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat) {
        return <div>latitude: {this.state.lat}</div>
    }
    return <div>Loading!</div>
  }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
