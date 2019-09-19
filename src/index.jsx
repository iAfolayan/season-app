import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './components/SeasonDisplay';
import Loader from './components/Loader';

class App extends Component {
  state = { lat: null, errorMessage: '' };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    )
  }

  renderContent() {
    const { lat, errorMessage } = this.state;
    if (errorMessage && !lat) {
      return <div>Error: {errorMessage}</div>
    }

    if (!errorMessage && lat) {
      return <SeasonDisplay lat={lat} />
    }

    return <Loader message="Please accept location request" />
  }

  render() {
    return <div className="border red">{this.renderContent()}</div>
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
