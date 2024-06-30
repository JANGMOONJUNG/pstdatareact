// src/components/Ticker.js
import React, { useEffect, useState } from "react";
import "../css/Ticker.css";

const Ticker = () => {
  const [cp, setCp] = useState(0);
  const [lc, setLc] = useState(0);
  const [sp, setSp] = useState(0);

  useEffect(() => {
    // 서버에서 데이터를 가져와서
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setCp(json.length);
        setLc(json.length);
        setSp(json.length);
      });
  }, []);

  return (
    <div className="ticker">
      <div>
        금주의 PTS 검출 - CP {cp}건, LC {lc}건, SP {sp}건
      </div>
    </div>
  );
};

export default Ticker;
