import React, { Suspense, lazy } from "react";
import { Router, Switch, Route, withRouter, Redirect } from "react-router-dom";

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
import PricesPage from "./components/pages/PricesPage";
import ShopPage from "./components/pages/ShopPage";
import LessonPage from "./components/pages/LessonPage";
import ScrollToTop from "./components/ScrollToTop ";
import StarBackground from "./components/backgrounds/StarBackground";
import LoadingScreen from "./components/LoadingScreen";
import Checkout from "./components/pages/CheckoutPage";
import OrderReceived from "./components/pages/OrderReceived";
import Home from "./components/Home";

import Nav from "./components/Nav";
import Footer from "./components/Fotter";
// const Home = lazy(() => import("./components/Home"));

const App = () => {
  return (
    <Router history={history}>
      <ScrollToTop>
        <div>
          <Layout />
          <StarBackground />
          {/* <Header /> */}
          <Nav />
          {/* <WaveBackground /> */}
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
              <Route
                exact
                path="/course/:slug"
                component={withRouter(CoursePage)}
              />
              <Route exact path={["/course", "/lesson"]}>
                <Redirect to="/home" />
              </Route>
              <Route
                exact
                path="/lesson/:slug"
                component={withRouter(LessonPage)}
              />
              <Route
                exact
                path="/instructurs"
                component={withRouter(InstructursPage)}
              />
              <Route exact path="/prices" component={withRouter(PricesPage)} />
              <Route exact path="/shop" component={withRouter(ShopPage)} />
              <Route
                exact
                path="/checkout/:id"
                component={withRouter(Checkout)}
              />
              <Route
                exact
                path="/order-received/:id"
                component={withRouter(OrderReceived)}
              />
            </Switch>
          </Suspense>
        </div>
      </ScrollToTop>
    </Router>
  );
};

export default App;
