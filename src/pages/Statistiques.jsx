import React,{ useState ,useContext ,useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import { Container, Header, Right } from "./Stock";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import { Title } from "../components/Topbar/Topbar";
import CircularProgressBar from "../components/CircularProgressBar";
import LinearProgressBar from "../components/LinearProgressBar";
import { Link } from "react-router-dom";
import { SearchContext } from "../SearchContext";
import { useSearchContext } from "../SearchContext";
import {mobile} from '../responsive'

const ProgressBarsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 16px;
  cursor: pointer;
  ${mobile({ flexDirection:'column',gap:'16px'})}
`;

const SoldProducts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 18px;
  margin-top: 24px;
  ${mobile({ flexDirection:'column'})}
`;
const Showmore = styled.button`
  border: none;
  background-color: white;
  text-decoration: none;
  font-weight: 400;
  font-size: 36px;
  color: #007fc9;
  &:hover {
    transform: scale(1.005);
    font-weight: 450;
    transition: 0.3s ease;
    text-decoration: underline;
  }
  cursor: pointer;
  ${mobile({ fontSize:'24px'})}
`;
const Historique = styled.div`
  font-weight: 600;
  font-size: 36px;
  line-height: 42px;
  color: #208fd0;
  align-self: flex-start;
  margin-top: 12px;
  margin-left: 18px;
  &:hover {
    transform: scale(1.005);
    font-weight: 650;
    transition: 0.3s ease;
    text-decoration: underline;
  }
  cursor: pointer;
  ${mobile({fontSize:'24px',lineHeight:'32px'})}
`;

const LinearProgressBars = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Lines = [
  {
    id: 1,
    title: "Iphone 13 pro max",
    percentage: "14",
  },
  {
    id: 2,
    title: "Iphone 14 ",
    percentage: "8",
  },
  {
    id: 3,
    title: "Iphone 14 ",
    percentage: "33",
  },
  {
    id: 4,
    title: "Iphone 3 ",
    percentage: "1",
  },

  {
    id: 5,
    title: "Iphone 14 ",
    percentage: "45",
  },
  {
    id: 6,
    title: "Iphone 14 ",
    percentage: "22",
  },
  {
    id: 6,
    title: "Iphone 7 ",
    percentage: "4",
  },
].sort((a, b) => b.percentage - a.percentage);

function Statistiques() {
  const [showMore, setShowMore] = useState(false);
  const renderedItems = showMore ? Lines : Lines.slice(0, 3);
  const { sellsNumber } = useContext(SearchContext);
  const [AllTransactions, setAllTransactions] = useState([]);
  const {  updateSellsNumber } = useSearchContext();

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/transaction/getAlltransactions"
        );
        console.log(res);
        setAllTransactions(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllTransactions();
  }, []);

  const ProgressCircles = [
    {
      id: 1,
      textcolor: "007FC9",
      value: sellsNumber,
      text: "Achats",
    },
    {
      id: 2,
      textcolor: "FF7F11",
      value: 100-sellsNumber,
      text: "Echanges",
    },
    {
      id: 3,
      textcolor: "70EE9C",
      value: 30,
      text: "Profit",
    },
  ];

  useEffect(() => {
    const totalTransactions = AllTransactions.length;
    const venteTransactions = AllTransactions.filter(
      (transaction) => transaction.transactionType === 'Achat'
    ).length;
    const sellPercentage = (venteTransactions / totalTransactions) * 100;

    updateSellsNumber(sellPercentage);
    
  }, [AllTransactions ,updateSellsNumber ]);


  return (
    <>
      <Container>
        <Sidebar defaultPage="Statistiques" />
        <Right>
          <Header>
            <Topbar title="Statistiques" />
          </Header>


          <ProgressBarsContainer>
            {ProgressCircles.map((item) => (
              <CircularProgressBar
                key={item.id}
                textcolor={item.textcolor}
                value={item.value}
                text={item.text}
              />
            ))}
          </ProgressBarsContainer>

          <SoldProducts>
            <Title style={{ alignSelf: "flex-start" }}>
              {" "}
              Les produits les plus vendus
            </Title>
            <Showmore onClick={() => setShowMore(!showMore)}>
              {showMore ? "Voir moins" : "Voir plus"}
            </Showmore>
          </SoldProducts>
          <LinearProgressBars>
            {renderedItems.map((item) => (
              <LinearProgressBar
                key={item.id}
                title={item.title}
                percentage={item.percentage}
              />
            ))}

            {showMore && (
              <Showmore
                onClick={() => setShowMore(false)}
                style={{ alignSelf: "flex-end", marginRight: "16px" }}
              >
                Voir moins
              </Showmore>
            )}
          </LinearProgressBars>
          <Link
            exact="true"
            to="/Historique"
            style={{ textDecoration: "none", alignSelf: "baseline" }}
          >
            <Historique>
              Voir l'historique des achats et des échanges
            </Historique>
          </Link>
        </Right>
      </Container>
    </>
  );
}

export default Statistiques;
