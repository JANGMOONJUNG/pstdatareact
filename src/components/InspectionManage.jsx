import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { inspectionData, product_data } from "../dummyData";
import { colorPalette } from "../color";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const CategoryButton = styled.button`
  background-color: ${(props) => (props.isActive ? "#222831" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#222831")};
  border: 1px solid #222831;
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
`;

const ProductButton = styled.button`
  background-color: ${(props) =>
    props.isActive ? colorPalette.deepBlue : "#fff"};
  color: ${(props) => (props.isActive ? "#fff" : colorPalette.deepBlue)};
  border: 1px solid ${colorPalette.deepBlue};
  border-radius: 12px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
`;

const TableContainer = styled.div`
  width: 100%;
  height: 480px; /* Adjust height as needed */
  overflow-y: auto;
  margin-top: 20px;
  border: 1px solid ${colorPalette.deepBlue};
  border-radius: 12px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: ${colorPalette.lightGray};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${colorPalette.lightGray};
  }
  cursor: pointer;
`;

const TableCell = styled.td`
  border: 1px solid ${colorPalette.deepBlue};
  padding: 8px;
  text-align: left;

  max-width: 200px;
  overflow: hidden;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  background: ${colorPalette.deepBlue};
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  float: right;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid ${colorPalette.deepBlue};
  border-radius: 8px;
`;

const SaveButton = styled.button`
  background: ${colorPalette.deepBlue};
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
`;

const Field = styled.div`
  display: flex;

  height: 36px;
`;

const FieldLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;

  width: 160px;
  display: flex;
  height: 100%;
  align-items: center;
`;

const TwoColumnField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InspectionManage = () => {
  const [selectedProductCategory, setSelectedProductCategory] = useState("CP");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      const filtered = inspectionData.filter(
        (item) => item.제품명 === selectedProduct
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [selectedProduct]);

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

  return (
    <Container>
      <Header>
        <Title>검출 관리</Title>
      </Header>
      <ProductList>
        {Object.keys(product_data).map((category) => (
          <CategoryButton
            key={category}
            isActive={selectedProductCategory === category}
            onClick={() => {
              setSelectedProductCategory(category);
              setSelectedProduct(null);
            }}
          >
            {category}
          </CategoryButton>
        ))}
      </ProductList>
      <ProductList>
        {product_data[selectedProductCategory].options.map((product) => (
          <ProductButton
            key={product}
            isActive={selectedProduct === product}
            onClick={() => setSelectedProduct(product)}
            title={product_data[selectedProductCategory].data[product].detail}
          >
            {product}
          </ProductButton>
        ))}
      </ProductList>
      {selectedProduct && filteredData.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <tr>
                <TableCell>주차</TableCell>
                <TableCell>제품명</TableCell>
                <TableCell>GRADE</TableCell>
                <TableCell>STEP</TableCell>
                <TableCell>STEP_DESC</TableCell>
                <TableCell>DCOL_ITEM_CD</TableCell>
                <TableCell>Module</TableCell>
                <TableCell>AREA_ID</TableCell>
                <TableCell>검출횟수</TableCell>
                <TableCell>IM</TableCell>
                <TableCell>PI</TableCell>
                <TableCell>공정</TableCell>
              </tr>
            </TableHead>
            <tbody>
              {filteredData.map((item, index) => (
                <TableRow key={index} onClick={() => openModal(item)}>
                  <TableCell>{item.주차}</TableCell>
                  <TableCell>{item.제품명}</TableCell>
                  <TableCell>{item.GRADE}</TableCell>
                  <TableCell>{item.STEP}</TableCell>
                  <TableCell>{item.STEP_DESC}</TableCell>
                  <TableCell>{item.DCOL_ITEM_CD}</TableCell>
                  <TableCell>{item.Module}</TableCell>
                  <TableCell>{item.AREA_ID}</TableCell>
                  <TableCell>{item.검출횟수}</TableCell>
                  <TableCell>{item.IM.comment}</TableCell>
                  <TableCell>{item.PI.comment}</TableCell>
                  <TableCell>{item.공정.comment}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      )}
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>Close</CloseButton>
            <h3>검출 정보</h3>
            <Field>
              <FieldLabel>주차</FieldLabel> {modalData.주차}
            </Field>
            <Field>
              <FieldLabel>제품명</FieldLabel> {modalData.제품명}
            </Field>
            <Field>
              <FieldLabel>GRADE</FieldLabel> {modalData.GRADE}
            </Field>
            <Field>
              <FieldLabel>STEP</FieldLabel> {modalData.STEP}
            </Field>
            <Field>
              <FieldLabel>STEP_DESC</FieldLabel> {modalData.STEP_DESC}
            </Field>
            <Field>
              <FieldLabel>DCOL_ITEM_CD</FieldLabel> {modalData.DCOL_ITEM_CD}
            </Field>
            <Field>
              <FieldLabel>Module</FieldLabel> {modalData.Module}
            </Field>
            <Field>
              <FieldLabel>AREA_ID</FieldLabel> {modalData.AREA_ID}
            </Field>
            <Field>
              <FieldLabel>검출횟수</FieldLabel> {modalData.검출횟수}
            </Field>
            <TwoColumnField>
              <Field>
                <FieldLabel>IM 담당자</FieldLabel>
                <Input
                  name="IM.num"
                  value={modalData.IM.num}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <FieldLabel>IM Comment</FieldLabel>
                <Input
                  name="IM.comment"
                  value={modalData.IM.comment}
                  onChange={handleInputChange}
                />
              </Field>
            </TwoColumnField>
            <TwoColumnField>
              <Field>
                <FieldLabel>PI 담당자</FieldLabel>
                <Input
                  name="PI.num"
                  value={modalData.PI.num}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <FieldLabel>PI Comment</FieldLabel>
                <Input
                  name="PI.comment"
                  value={modalData.PI.comment}
                  onChange={handleInputChange}
                />
              </Field>
            </TwoColumnField>
            <TwoColumnField>
              <Field>
                <FieldLabel>공정 담당자</FieldLabel>
                <Input
                  name="공정.num"
                  value={modalData.공정.num}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <FieldLabel>공정 Comment</FieldLabel>
                <Input
                  name="공정.comment"
                  value={modalData.공정.comment}
                  onChange={handleInputChange}
                />
              </Field>
            </TwoColumnField>
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default InspectionManage;
