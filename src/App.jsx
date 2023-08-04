import Header from "./Components/Header/Header";
import Visualizer from "./Components/Visualizer/Visualizer";
import Controller from "./Components/Controller/Controller";
import { ParamsProvider } from "./Components/Context";

function App() {
  return (
    <ParamsProvider>
      <Header />
      <Visualizer />
      <Controller />
    </ParamsProvider>
  );
}

export default App;
