import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { product_data, TargetManageData } from "../dummyData";
import { colorPalette } from "../color";
import DataTable from "./DataTable";
import { FiSearch } from "react-icons/fi";
import { IoMdDownload } from "react-icons/io";
import { TbMailFilled } from "react-icons/tb";
import { RiFileExcel2Fill } from "react-icons/ri";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
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

const TargetManagement = () => {
  const [selectedProductCategory, setSelectedProductCategory] = useState("CP");
  const [selectedCore, setSelectedCore] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selJudgment, setSelJudgment] = useState("");

  const [filteredData, setFilteredData] = useState(TargetManageData);

  useEffect(() => {
    console.log(TargetManageData[0]["DATA 판정"].toString());
    console.log(selJudgment);

    const filtered = TargetManageData.filter(
      (item) =>
        (selectedCore ? item.제품1 === selectedCore : true) &&
        (selectedSub ? item.제품2 === selectedSub : true) &&
        (selectedModule ? item.Module === selectedModule : true) &&
        (selJudgment ? item["DATA 판정"].toString() === selJudgment : true)
    );
    setFilteredData(filtered);
  }, [selectedCore, selectedSub, selectedModule, selJudgment]);

  const uniqueModules = Array.from(
    new Set(TargetManageData.map((item) => item.Module))
  );

  return (
    <Container>
      <Header>
        <FilterContainer>
          <label>테크:</label>
          <Select
            value={selectedProductCategory}
            onChange={(e) => {
              setSelectedProductCategory(e.target.value);
              setSelectedCore("");
              setSelectedSub("");
            }}
          >
            {Object.keys(product_data).map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </Select>
          <label>코어:</label>
          <Select
            value={selectedCore}
            onChange={(e) => setSelectedCore(e.target.value)}
          >
            <option value="">전체</option>
            {product_data[selectedProductCategory].options.map((core) => (
              <option key={core} value={core}>
                {core}
              </option>
            ))}
          </Select>
          <label>파생:</label>
          <Select
            value={selectedSub}
            onChange={(e) => setSelectedSub(e.target.value)}
          >
            <option value="">전체</option>
            {product_data[selectedProductCategory].options.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </Select>
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
        <ButtonGroup>
          <IconButton>
            <IoMdDownload style={{ fontSize: "20px", fontWeight: "700" }} />
          </IconButton>
          <IconButton>
            <RiFileExcel2Fill style={{ fontSize: "20px", fontWeight: "700" }} />
          </IconButton>
          <IconButton>
            <TbMailFilled style={{ fontSize: "20px", fontWeight: "700" }} />
          </IconButton>
        </ButtonGroup>
      </Header>
      <Content>
        <DataTable data={filteredData} key={filteredData.length} />
      </Content>
    </Container>
  );
};

export default TargetManagement;
