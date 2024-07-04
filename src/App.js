import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Ticker from "./components/Ticker";
import Status from "./components/Status";
import TgDgg from "./components/TgDgg";

function App() {
  // menu 구분용
  const [active, setActive] = useState(0);

  const getContent = () => {
    switch (active) {
      case 0:
        return <Home />;
      case 1:
        return <Status />;
      case 2:
        return <div>trend분석</div>;
      case 3:
        return <TgDgg />;
      case 4:
        return <div>lot trend 검색</div>;
      default:
        return <></>;
    }
  };

  return (
    <div className="App">
      <Header active={active} setActive={setActive} />
      <Ticker />
      {getContent()}
      <Footer />
    </div>
  );
}

export default App;
