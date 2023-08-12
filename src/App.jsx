import { ParamsProvider } from "./Components/Context";
import Controller from "./Components/Controller/Controller";
import Header from "./Components/Header/Header";
import Visualizer from "./Components/Visualizer/Visualizer";

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
