import "./styles/main.scss";
import React, { Component } from "react";
import { Park, AppData } from "./types";

import Header from "./components/Header/Header";
import Tagline from "./components/Tagline/Tagline";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Section from "./components/Section/Section";
import SearchBar from "./components/SearchBar/SearchBar";
import ResultsList from "./components/ResultsList/ResultsList";
import Detail from "./components/Detail/Detail";
import VisitedList from "./components/VisitedList/VisitedList";

import firebaseInit from "./firebase/firebase";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { setData, updateData } from "./actions";

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: {
      parks: {
        setData: (payload: AppData) => dispatch(setData(payload)),
        updateData: (payload: string) => dispatch(updateData(payload))
      }
    }
  };
};

interface Props {
  actions: {
    parks: {
      setData(payload: AppData): any;
      updateData(payload: string): any;
    };
  };
  store: {
    parks: AppData;
  };
}

interface State {
  firebaseData: Park[];
  results: Park[];
  selectedPark: Park | null;
}

export class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      firebaseData: [],
      results: [],
      selectedPark: null
    };
  }

  componentDidMount() {
    firebaseInit().once("value", snap =>
      this.setState({ firebaseData: snap.val() }, this.mapData)
    );
  }

  render() {
    const {
      store: { parks }
    } = this.props;

    return (
      <>
        <Section sectionClass="intro" sectionId="intro">
          <Header />
          <Tagline />
          <ProgressBar appData={parks} />
        </Section>
        <Section sectionClass="search" sectionId="search">
          <SearchBar
            handleFormSubmit={this.handleFormSubmit}
            handleInputClear={this.handleInputClear}
          />
        </Section>
        <Section sectionClass="result" sectionId="result">
          <ResultsList
            results={this.state.results}
            handleParkSelect={this.handleParkSelect}
            handleFavorite={this.handleFavorite}
          />
        </Section>
        {this.state.selectedPark && (
          <Section sectionClass="detail" sectionId="detail">
            <Detail
              selectedPark={parks[this.state.selectedPark.id]}
              handleFavorite={this.handleFavorite}
            />
          </Section>
        )}
        <Section sectionClass="visited" sectionId="visited">
          <VisitedList
            appData={parks}
            handleParkSelect={this.handleParkSelect}
            handleFavorite={this.handleFavorite}
          />
        </Section>
      </>
    );
  }

  mapData() {
    const { firebaseData } = this.state;
    const mappedData: AppData = {};
    firebaseData.forEach(park => {
      mappedData[park.id] = park;
    });

    this.props.actions.parks.setData(mappedData);
  }

  handleInputClear = () => {
    this.setState({ results: [] });
  };

  handleFormSubmit = (term: string) => {
    const searchTerm = term.toLowerCase();
    const searchResults = Object.values(this.props.store.parks).filter(item => {
      return (
        item.fullName.toLowerCase().includes(searchTerm) ||
        item.fullStates.toLowerCase().includes(searchTerm)
      );
    });
    this.setState({ results: searchResults });
  };

  handleParkSelect = (id: string) => {
    this.setState({ selectedPark: this.props.store.parks[id] });
  };

  handleFavorite = (id: string) => {
    this.props.actions.parks.updateData(id);

    const updatedSearchResults = Object.values(this.state.results).map(park => {
      if (park.id === id) {
        return { ...park, isFavorite: !park.isFavorite };
      }
      return park;
    });

    this.setState({ results: updatedSearchResults });
  };
}

const mapStateToProps = (state: any) => {
  return {
    store: state
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
