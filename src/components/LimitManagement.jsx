import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LimitManageData, product_data } from "../dummyData";
import { colorPalette } from "../color";
import DataTable2 from "./DataTable2";

import { FiSearch } from "react-icons/fi";
import { IoMdDownload } from "react-icons/io";
import { TbMailFilled } from "react-icons/tb";
import { RiFileExcel2Fill } from "react-icons/ri";

import html2canvas from "html2canvas";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 1200px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid ${colorPalette.deepBlue};
  border-radius: 8px;
  background: #fff;
  color: ${colorPalette.deepBlue};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;
`;

const IconButton = styled.button`
  background-color: #fff;
  color: #222831;
  border: 1px solid #222831;
  border-radius: 12px;
  cursor: pointer;
  width: 36px;
  height: 36px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 280px;
  height: 40px;
  background-color: #f1f1f1;
  border-radius: 22px;
  padding: 0 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:focus-within {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: 14px;
  color: #333;
  padding: 0 10px;

  &::placeholder {
    color: #888;
  }
`;

const LimitManagement = () => {
  const [selectedProductCategory, setSelectedProductCategory] = useState("LC");
  const [selectedCore, setSelectedCore] = useState("6EJ");
  const [selectedSub, setSelectedSub] = useState("6EK");
  const [selectedModule, setSelectedModule] = useState("");
  const [selJudgment, setSelJudgment] = useState("");

  const [filteredData, setFilteredData] = useState(LimitManageData);

  useEffect(() => {
    const filtered = LimitManageData.filter((item) => {
      return (
        (selectedCore ? item.제품1 === selectedCore : true) &&
        (selectedSub ? item.제품2 === selectedSub : true) &&
        (selectedModule ? item.Module === selectedModule : true) &&
        (selJudgment ? item["DATA 판정"].toString() === selJudgment : true)
      );
    });
    setFilteredData(filtered);
  }, [selectedCore, selectedSub, selectedModule, selJudgment]);

  const uniqueModules = [
    ...new Set(LimitManageData.map((item) => item.Module)),
  ];

  const ref = useRef();

  const handleDownloadImage = () => {
    html2canvas(ref.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "capture.png";
      link.click();
    });
  };

  return (
    <Container>
      <Header>
        <FilterContainer>
          <h3 style={{ margin: "0px" }}>Limit match list</h3>
          <label>모듈:</label>
          <Select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <option value="">전체</option>
            {uniqueModules.map((module) => (
              <option key={module} value={module}>
                {module}
              </option>
            ))}
          </Select>
          <label>판정:</label>
          <Select
            value={selJudgment}
            onChange={(e) => setSelJudgment(e.target.value)}
          >
            <option value="">전체</option>
            <option value="true">true</option>
            <option value="false">false</option>
          </Select>
          <label>검색:</label>
          <SearchBarContainer>
            <SearchInput
              type="text"
              placeholder={"검색어를 입력하세요."}
              value={""}
            />
            <FiSearch style={{ fontSize: "20px" }} />
          </SearchBarContainer>
        </FilterContainer>
        <div style={{ marginTop: "10px", fontSize: "14px", color: "#b0b0b0" }}>
          아래의 리스트는 위의 Target match 그래프에는 영향을 주지 않습니다.
        </div>
      </Header>
      <Content ref={ref}>
        {selectedCore && selectedSub && (
          <DataTable2
            data={filteredData}
            key={selectedModule + filteredData.length}
          />
        )}
      </Content>
    </Container>
  );
};

export default LimitManagement;
