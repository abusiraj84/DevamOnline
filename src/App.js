import React, { Suspense, lazy } from "react";
import { Router, Switch, Route, withRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";

import Profile from "./components/Profile";

import { history } from "./helpers/history";
import Layout from "./components/layout/layout";
import WaveBackground from "./components/backgrounds/WaveBackground";

import CoursesPage from "./components/pages/CoursesPage";
import CoursePage from "./components/pages/CoursePage";
import InstructursPage from "./components/pages/InstructursPage";
import InstructurPage from "./components/pages/InstructurPage";
import PricesPage from "./components/pages/PricesPage";
import ShopPage from "./components/pages/ShopPage";
import LessonPage from "./components/pages/LessonPage";
import ScrollToTop from "./components/ScrollToTop ";
import StarBackground from "./components/backgrounds/StarBackground";
import LoadingScreen from "./components/LoadingScreen";
import ThankyouPage from "./components/pages/ThankyouPage";
import Nav from "./components/Nav";
const Home = lazy(() => import("./components/Home"));

const App = () => {
  return (
    <Router history={history}>
      <ScrollToTop>
        <div>
          <Layout />
          <StarBackground />
          {/* <Header /> */}
          <Nav />
          <WaveBackground />
          <Suspense fallback={<LoadingScreen />}>
            <Switch>
              <Route exact path={["/", "/home"]} component={withRouter(Home)} />
              <Route exact path="/login" component={withRouter(Login)} />
              <Route exact path="/register" component={withRouter(Register)} />
              <Route exact path="/profile" component={withRouter(Profile)} />

              <Route
                exact
                path="/courses"
                component={withRouter(CoursesPage)}
              />
              <Route exact path="/course" component={withRouter(CoursePage)} />
              <Route
                exact
                path="/course/:id"
                component={withRouter(CoursePage)}
              />
              <Route
                exact
                path="/lesson/:id"
                component={withRouter(LessonPage)}
              />

              <Route
                exact
                path="/instructurs"
                component={withRouter(InstructursPage)}
              />
              <Route
                exact
                path="/instructur"
                component={withRouter(InstructurPage)}
              />
              <Route exact path="/prices" component={withRouter(PricesPage)} />
              <Route exact path="/shop" component={withRouter(ShopPage)} />
              <Route
                exact
                path="/thankyou"
                component={withRouter(ThankyouPage)}
              />
            </Switch>
          </Suspense>
        </div>{" "}
      </ScrollToTop>
    </Router>
  );
};

export default App;
