import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import HomePage from "@pages/HomePage";
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
          <Route path="/dashboard/:id" component={DashboardPage} />
          <Route path="/" component={HomePage} />
          <Route>
            <h1>Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
