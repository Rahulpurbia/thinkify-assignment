import "./App.css";
import CreativeDashboard from "./containers/CreativeDashboard";
import CreativeProvider from "./context/CreativeProvider";

function App() {
  return (
    <CreativeProvider>
      <div className="App">
        <CreativeDashboard />
      </div>
    </CreativeProvider>
  );
}

export default App;
