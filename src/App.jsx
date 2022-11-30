import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { push } from "redux-first-history";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { Route, Routes, Navigate, Link, useLocation } from "react-router-dom";
import * as Reach from "@reach/router";
import * as Wouter from "wouter";
import { store, history, reachHistory, wouterUseLocation } from "./store";
import * as ReactLocation from "@tanstack/react-location";

const LocationLog = ({ location, title }) => (
  <h4>
    {title}
    {" -> "}
    {JSON.stringify(location)}
  </h4>
);

const StoreLocationLog = connect((state) => ({
  location: state.router.location
}))(LocationLog);

const Home = ({ location }) => (
  <div>
    <p>HomePage Content !!</p>
    {location && (
      <LocationLog location={location} title="route.props.location" />
    )}
  </div>
);

const Dashboard = ({ location }) => (
  <div>
    <p>DashBoard Content !!</p>
    {location && (
      <LocationLog location={location} title="route.props.location" />
    )}
  </div>
);

const Buttons = ({ pushUrl }) => (
  <div>
    <button onClick={() => pushUrl("/")}>
      dispatch(push("/")) from everywhere
    </button>
    <button onClick={() => pushUrl("/dashboard")}>
      dispatch(push("/dashboard")) from everywhere
    </button>
  </div>
);

const StoreButtons = connect(
  () => ({}),
  (dispatch) => ({
    pushUrl: (url) => dispatch(push(url))
  })
)(Buttons);

const Dashboard6 = () => {
  const location = useLocation();
  return <Dashboard location={location} />;
};

const Home6 = () => {
  const location = useLocation();
  return <Home location={location} />;
};

// Set up a ReactLocation instance
const Tanlocation = new ReactLocation.ReactLocation({ history });

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <h1>redux-first-history</h1>
          <h2>Use whatever you like. History will just work as it should.</h2>
          <div className="app">
            <h2>Hi i'm a redux App</h2>
            <StoreButtons />
            <StoreLocationLog title="state.router.location" />
            <h2>open Console to see a redux-saga LOCATION_CHANGE logger!</h2>
            <div className="reactRouter">
              <h2>i'm a react-router-6 subApp</h2>
              <Router history={history}>
                <React.Fragment>
                  <Link to="/">ReactRouter Link to Home</Link>
                  <Link to="dashboard">ReactRouter Link to Dashboard</Link>
                  <Link to="notExistRoute">
                    ReactRouter Link to notExistRoute and will be redirected to
                    Home
                  </Link>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard6 />} />
                    <Route path="/" element={<Home6 />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </React.Fragment>
              </Router>
            </div>
            <div className="reachRouter">
              <h2>i'm a @reach/router subApp</h2>
              <Reach.LocationProvider history={reachHistory}>
                <React.Fragment>
                  <Reach.Link to="/">Reach.Link to Home</Reach.Link>
                  <Reach.Link to="dashboard">
                    Reach.Link to Dashboard
                  </Reach.Link>
                  <Reach.Link to="notExistRoute">
                    Reach.Link to notExistRoute and will be redirected to Home
                  </Reach.Link>
                  <Reach.Router>
                    <Home path="/" />
                    <Dashboard path="dashboard" />
                  </Reach.Router>
                </React.Fragment>
              </Reach.LocationProvider>
            </div>
            <div className="wouterRouter">
              <h2>i'm a wouter subApp</h2>
              <Wouter.Router hook={wouterUseLocation}>
                <React.Fragment>
                  <Wouter.Link to="/">Wouter.Link to Home</Wouter.Link>
                  <Wouter.Link to="dashboard">
                    Wouter.Link to Dashboard
                  </Wouter.Link>
                  <Wouter.Link to="notExistRoute">
                    Wouter.Link to notExistRoute and will be redirected to Home
                  </Wouter.Link>
                  <Wouter.Switch>
                    <Home path="/" />
                    <Dashboard path="/dashboard" />
                  </Wouter.Switch>
                </React.Fragment>
              </Wouter.Router>
            </div>
            <div className="wouterRouter">
              <h2>i'm a react-location subApp</h2>
              <ReactLocation.Router
                location={Tanlocation}
                routes={[
                  { path: "/", element: <Home /> },
                  { path: "/dashboard", element: <Dashboard /> }
                ]}
              >
                <React.Fragment>
                  <ReactLocation.Link to="/">
                    ReactLocation.Link to Home
                  </ReactLocation.Link>
                  <ReactLocation.Link to="dashboard">
                    ReactLocation.Link to Dashboard
                  </ReactLocation.Link>
                  <ReactLocation.Link to="notExistRoute">
                    ReactLocation.Link to notExistRoute and will be redirected
                    to Home
                  </ReactLocation.Link>
                  <ReactLocation.Outlet />{" "}
                  {/* Start rendering router matches */}
                </React.Fragment>
              </ReactLocation.Router>
            </div>
          </div>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
