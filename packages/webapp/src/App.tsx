import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { useAppDispatch } from './hooks';
import { setActiveBackground } from './state/slices/noun';

import classes from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Info from './pages/Info';
import MobilePlay from './pages/MobilePlay';
import PrivacyPolicy from './pages/PrivacyPolicy';



function App() {
  const dispatch = useAppDispatch();
  const background = new URLSearchParams(useLocation().search).get("background");
  if (background != null) {
    dispatch(setActiveBackground(background === "cool"));
  }

  return (
    <div className={classes.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Info} />
          <Route exact path="/mobile-play" component={MobilePlay} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
