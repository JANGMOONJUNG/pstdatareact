import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { inspectionData, product_data } from "../dummyData";
import { colorPalette } from "../color";
import { FiSearch } from "react-icons/fi";
import { IoMdDownload } from "react-icons/io";
import { TbMailFilled } from "react-icons/tb";
import { RiFileExcel2Fill } from "react-icons/ri";
import ChartComponent5 from "./ChartComponent5";

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
  padding-bottom: 20px;
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

const ChartContainer = styled.div`
  height: 600px;

  background: #eeeeee;
  box-sizing: border-box;
  padding-top: 32px;
  border-radius: 16px;

  padding-left: 30px;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colorPalette.deepBlue};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${colorPalette.lightGray};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${colorPalette.darkBlue};
  }
`;

function getWeekNumber(date) {
  // 주어진 날짜의 연도의 1월 1일 설정
  const startOfYear = new Date(date.getFullYear(), 0, 1);

  // 밀리초 단위로 날짜 차이 계산
  const diffInMilliseconds = date - startOfYear;

  // 밀리초를 일 단위로 변환
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  // 1월 1일부터의 주 수 계산
  const weekNumber = Math.ceil((diffInDays + 1) / 7);

  return weekNumber;
}

const TrendGather = () => {
  const [selectedProductCategory, setSelectedProductCategory] = useState("CP");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      const filtered = inspectionData
        .filter(
          (item) =>
            item.제품명 === selectedProduct &&
            (selectedModule ? item.Module === selectedModule : true)
        )
        .filter(
          (item) =>
            item.제품명 === selectedProduct &&
            (selectedArea ? item.AREA_ID === selectedArea : true)
        );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [selectedProduct, selectedWeek, selectedModule, selectedArea]);

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");
    setModalData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], [field]: value },
    }));
  };

  const handleSave = () => {
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.제품명 === modalData.제품명 ? modalData : item
      )
    );
    closeModal();
  };
  const uniqueModule = Array.from(
    new Set(inspectionData.map((item) => item.Module))
  );

  const uniqueArea = Array.from(
    new Set(inspectionData.map((item) => item.AREA_ID))
  );

  return (
    <Container>
      <Header>
        <FilterContainer>
          <label>주차:</label>
          <div style={{ fontWeight: "700" }}>{`WW${String(
            getWeekNumber(new Date())
          ).padStart(2, "0")}`}</div>
          <label>테크:</label>
          <Select
            value={
              selectedProductCategory
                ? selectedProductCategory
                : Object.keys(product_data)[0]
            }
            onChange={(e) => {
              setSelectedProductCategory(e.target.value);
              setSelectedProduct(null);
              setSelectedWeek(""); // Reset week filter when changing category
            }}
          >
            {Object.keys(product_data).map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </Select>
          <label>제품:</label>
          <Select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">전체</option>
            {product_data[selectedProductCategory].options.map((week) => (
              <option key={week} value={week}>
                {week}
              </option>
            ))}
          </Select>
          <label>공정:</label>
          <Select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            <option value="">전체</option>
            {uniqueArea.map((week) => (
              <option key={week} value={week}>
                {week}
              </option>
            ))}
          </Select>
          <label>모듈:</label>
          <Select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <option value="">전체</option>
            {uniqueModule.map((week) => (
              <option key={week} value={week}>
                {week}
              </option>
            ))}
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
      <ChartContainer
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "1600px",
          gap: "8px",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => (
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "16px 4px",
              marginBottom: "20px",
            }}
          >
            <ChartComponent5 />
          </div>
        ))}
      </ChartContainer>
    </Container>
  );
};

export default TrendGather;
