import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { product_data, TargetManageData } from "../dummyData";
import { colorPalette } from "../color";
import DataTable from "./DataTable";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

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
  justify-content: space-between;
  align-items: center;
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

const TargetManagement = () => {
  const [selectedProductCategory, setSelectedProductCategory] = useState("LC");
  const [selectedCore, setSelectedCore] = useState("6EJ");
  const [selectedSub, setSelectedSub] = useState("6EK");
  const [selectedModule, setSelectedModule] = useState("");
  const [selJudgment, setSelJudgment] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = TargetManageData.filter(
      (item) =>
        (selectedModule ? item.Module === selectedModule : true) &&
        (selJudgment ? item["DATA 판정"].toString() === selJudgment : true)
    );

    setFilteredData(filtered);
  }, [selectedCore, selectedSub, selectedModule, selJudgment]);

  return (
    <Container>
      <Header>
        <FilterContainer>
          <h3 style={{ margin: "0px" }}>Target match list</h3>
          <label>모듈:</label>
          <Select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <option value="">전체</option>
            {Array.from(
              new Set(TargetManageData.map((item) => item.Module))
            ).map((module) => (
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
      </Header>
      <Content>
        <DataTable data={filteredData} key={filteredData.length} />
      </Content>
    </Container>
  );
};

export default TargetManagement;
