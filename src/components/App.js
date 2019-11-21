import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../App.css";
import NavBar from "./NavBar";
import PaintingsList from "./PaintingsList";
import PaintingDetails from "./PaintingDetails";
import About from "./About";
import NotFound from "./NotFound";

class App extends Component {
  state = {
    paintingsList: [],
    searchTerm: "",
    selectedPainting: null
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
        <Route exact path="/about" component={About} />
        <Route
          path="/paintings/:id"
          render={props => {
            return (
              <PaintingDetails
                painting={this.state.paintingsList.find(
                  p => p.id === props.match.params.id
                )}
              />
            );
          }}
        />

        <Route
          path="/"
          render={() => (
            <PaintingsList
              onSearchHandler={this.onSearchHandler}
              filterTerm={this.state.searchTerm}
              paintings={this.state.paintingsList}
              onSelectPainting={this.onSelectPainting}
            />
          )}
        />
      </div>
    );
  }
}
/*
<PaintingDetails painting={this.state.selectedPainting} />;
<PaintingsList
          onSearchHandler={this.onSearchHandler}
          filterTerm={this.state.searchTerm}
          paintings={this.state.paintingsList}
          onSelectPainting={this.onSelectPainting}
        />
*/
export default App;
