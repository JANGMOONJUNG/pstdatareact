import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  // menu 구분용
  const [active, setActive] = useState(0);

  const getContent = () => {
    switch (active) {
      case 0:
        return <Home />;
      case 1:
        return <div>status</div>;
      case 2:
        return <div>검출관리</div>;
      case 3:
        return <div>trend분석</div>;
      case 4:
        return <div>TG DGG관리</div>;
      case 5:
        return <div>lot trend 검색</div>;
    }
  };

  return (
    <div className="App">
      <Header active={active} setActive={setActive} />
      {getContent()}
      <Footer />
    </div>
  );
}

export default App;
