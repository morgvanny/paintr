import React from "react";
import Painting from "./Painting";
import Searchbar from "./Searchbar";

class PaintingsList extends React.Component {
  render() {
    let {
      onSearchHandler,
      filterTerm,
      paintings,
      onSelectPainting
    } = this.props;
    let filteredPaintings = paintings.filter(painting =>
      painting.title.includes(filterTerm)
    );
    return (
      <div>
        <Searchbar onChangeHandler={onSearchHandler} value={filterTerm} />
        {filteredPaintings.map(painting => (
          <Painting
            key={painting.id}
            painting={painting}
            onSelectPainting={onSelectPainting}
          />
        ))}
      </div>
    );
  }
}

export default PaintingsList;
