import Header from "./Components/Header/Header";
import Visualizer from "./Components/Visualizer/Visualizer";
import Controller from "./Components/Controller/Controller";
import { ParamsProvider } from "./Components/Context";
import { useEffect } from "react";

function App() {
  // Circumvent problem with keyboard changing
  // the viewport size on mobile
  useEffect(() => {
    var w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    var h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    document.querySelector("html, body").style = `
      width: ${w}px;
      height: ${h}px;
    `;
  }, []);

  return (
    <ParamsProvider>
      <Header />
      <Visualizer />
      <Controller />
    </ParamsProvider>
  );
}

export default App;
