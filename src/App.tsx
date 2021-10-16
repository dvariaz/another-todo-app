import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    (async () => {
      // const API_URL: string = process.env.REACT_APP_API_URL;
      // const response = await fetch(API_URL);
      // const data = await response.json();
      // console.log(data);
    })();
  }, []);

  return (
    <div className="App">
      <h1>Another Todo App</h1>
    </div>
  );
};

export default App;
