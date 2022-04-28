import { BrowserRouter, Switch, Route } from 'react-router-dom';

import classes from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Info from './pages/Info';
import MobilePlay from './pages/MobilePlay';
import PrivacyPolicy from './pages/PrivacyPolicy';



function App() {
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
