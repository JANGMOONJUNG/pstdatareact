import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { inspectionData, product_data } from "../dummyData";
import { colorPalette } from "../color";
import { FaCheck } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoMdDownload } from "react-icons/io";
import { TbMailFilled } from "react-icons/tb";
import { RiFileExcel2Fill } from "react-icons/ri";
import InspectionModal from "./InspectionModal";

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

const ListWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const ListHeader = styled.div`
  background-color: ${colorPalette.lightGray};
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  border-radius: 12px;
  align-items: center;
  height: 44px;
`;

const ListContainer = styled.div`
  height: 480px;
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

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  height: 44px;
  align-items: center;
  margin-bottom: 6px;
  border-radius: 12px;
  font-size: 14px;
  background-color: #f9f9f9;
`;

const ItemField0 = styled.div`
  flex: 0.8;
  max-width: 200px;
  overflow: hidden;
`;

const ItemField2 = styled.div`
  flex: 0.4;
  max-width: 200px;
  overflow: hidden;
`;

const ItemField = styled.div`
  flex: 1;
  max-width: 200px;
  overflow: hidden;
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

const InspectionManage = () => {
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
            (selectedWeek ? item.주차 === selectedWeek : true)
        )
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
        item.주차 === modalData.주차 && item.제품명 === modalData.제품명
          ? modalData
          : item
      )
    );
    closeModal();
  };

  const uniqueWeeks = Array.from(
    new Set(inspectionData.map((item) => item.주차))
  );

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
          <label>주차:</label>
          <Select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
          >
            <option value="">전체</option>
            {uniqueWeeks.map((week) => (
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
      {selectedProduct && filteredData.length > 0 && (
        <ListWrapper>
          <ListHeader>
            <ItemField0>주차</ItemField0>
            <ItemField0>제품명</ItemField0>
            <ItemField>GRADE</ItemField>
            <ItemField>STEP</ItemField>
            <ItemField>STEP_DESC</ItemField>
            <ItemField>DCOL_ITEM_CD</ItemField>
            <ItemField>Module</ItemField>
            <ItemField>AREA_ID</ItemField>
            <ItemField>검출횟수</ItemField>
            <ItemField2>IM</ItemField2>
            <ItemField2>PI</ItemField2>
            <ItemField2>공정</ItemField2>
          </ListHeader>
          <ListContainer>
            {filteredData.map((item, index) => (
              <ListItem
                key={index}
                index={index}
                onClick={() => openModal(item)}
              >
                <ItemField0>{item.주차}</ItemField0>
                <ItemField0>{item.제품명}</ItemField0>
                <ItemField>{item.GRADE}</ItemField>
                <ItemField>{item.STEP}</ItemField>
                <ItemField>{item.STEP_DESC}</ItemField>
                <ItemField>{item.DCOL_ITEM_CD}</ItemField>
                <ItemField>{item.Module}</ItemField>
                <ItemField>{item.AREA_ID}</ItemField>
                <ItemField>{item.검출횟수}</ItemField>
                <ItemField2>
                  <FaCheck style={{ fontSize: "14px", color: "green" }} />
                </ItemField2>
                <ItemField2>
                  <FaCheck style={{ fontSize: "14px", color: "green" }} />
                </ItemField2>
                <ItemField2>
                  <FaCheck style={{ fontSize: "14px", color: "green" }} />
                </ItemField2>
              </ListItem>
            ))}
          </ListContainer>
        </ListWrapper>
      )}

      {isModalOpen && (
        <InspectionModal
          modalData={modalData}
          closeModal={closeModal}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
        />
      )}
    </Container>
  );
};

export default InspectionManage;
