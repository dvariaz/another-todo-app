import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";
import DashboardPage from "@pages/DashboardPage";

// Types
export type TDashboardParams = {
  id: string;
};

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/dashboard/:id" component={DashboardPage} />
          <Route path="/dashboards" component={HomePage} />
          <Route>
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
