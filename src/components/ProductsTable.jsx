import React from "react";
import styled from "styled-components";
import {mobile} from '../responsive'
const Header = [
  "Nom",
  "N° de série 1",
  "N° de série 2",
  "Prix d'achat",
  "Prix de vente",
];

export const Table = styled.table`
position: relative;
  border: 1px solid #a2ccf6;
  box-sizing: border-box;
  width: 100%;
  margin: 4px 0px 20px 0px;
  background-color: #f9f6f6;
  ${mobile({ overflowX:'scroll'})}
`;

export const HRow = styled.tr`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
  border-bottom: 1px solid #a2ccf6;
 ${mobile({ padding: '4px 0px'})}
`;

export const Row = styled.tr`
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: white;
  }
  padding: 10px 0px;
  border-bottom: 1px solid #a2ccf6;
  ${mobile({ padding: '4px 0px'})}
`;

export const Column = styled.td`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
`;

export const HColumn = styled.td`
  width: 100%;
  text-align: center;
  border-right: 3px solid #a2ccf6;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  padding: 0px 8px;
  ${mobile({ fontSize:'18px'})}
`;

export const Nom = styled.p`
  font-size: 24px;
  line-height: 33px;
  color: #007fc9;
  font-weight: 600;
  ${mobile({ fontSize:'18px'})}
`;

export const Pachat = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
  color: #219dfd;
  text-shadow: 1px 1px 1px grey;
  ${mobile({ fontSize:'18px'})}
`;

const Pvente = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
  color: green;
  text-shadow: 1px 1px 1px skyblue;
  ${mobile({ fontSize:'18px'})}
`;
export const Nserie = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;
  color: #000000;
  ${mobile({ fontSize:'18px'})}
`;

function ProductsTable(props) {
  const products = Array.isArray(props.products) ? props.products : [];

  return (
    <>
      <Table>
        <thead>
          <HRow>
            {Header.map((item) => (
              <HColumn key={item} className="HeaderColumn">
                {item}
              </HColumn>
            ))}
          </HRow>
        </thead>
        <tbody>
          {products.map((Product) => (
            <Row className="Row" key={Product.productId}>
              <Column>
                {" "}
                <Nom> {Product.productName} </Nom>{" "}
              </Column>
              <Column>
                {" "}
                <Nserie>{Product.serieNumber1}</Nserie>{" "}
              </Column>
              <Column>
                {" "}
                <Nserie> {Product.serieNumber2}</Nserie>{" "}
              </Column>
              <Column>
                {" "}
                <Pachat> {Product.buyPrice} </Pachat>{" "}
              </Column>
              <Column>
                {" "}
                <Pvente> {Product.sellPrice} </Pvente>{" "}
              </Column>
            </Row>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ProductsTable;
