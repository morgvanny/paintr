import React, { Component } from "react";
import "../App.css";
import NavBar from "./NavBar";
import PaintingsList from "./PaintingsList";
import PaintingDetails from "./PaintingDetails";
import About from "./About";
import NotFound from "./NotFound";

class App extends Component {
  state = {
    paintingsList: [],
    searchTerm: ""
  };

  componentDidMount() {
    fetch(`http://localhost:3000/paintings`)
      .then(response => response.json())
      .then(paintingsArray => {
        this.setState({
          paintingsList: paintingsArray
        });
      });
  }

  onSearchHandler = event => {
    this.setState({ searchTerm: event.target.value });
  };

  onSelectPainting = selectedPainting => {
    this.setState({
      selectedPainting: selectedPainting
    });
  };

  render() {
    return (
      <div className="App">
        <NavBar
          title="Paintr"
          icon="paint brush"
          color="blue"
          subtitle="List of Paintings"
        />
        <About />
        <PaintingDetails painting={this.state.selectedPainting} />
        <PaintingsList
          onSearchHandler={this.onSearchHandler}
          filterTerm={this.state.searchTerm}
          paintings={this.state.paintingsList}
          onSelectPainting={this.onSelectPainting}
        />
      </div>
    );
  }
}

export default App;
