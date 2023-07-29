import Header from "./Components/Header/Header";
import Visualizer from "./Components/Visualizer/Visualizer";
import { ParamsProvider } from "./Components/Context";

function App() {
  return (
    <ParamsProvider>
      <Header />
      <Visualizer />
    </ParamsProvider>
  );
}

export default App;
