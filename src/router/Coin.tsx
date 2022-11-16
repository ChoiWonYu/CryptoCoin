import { useEffect, useState } from "react";
import { useLocation, Outlet, useParams, useMatch } from "react-router-dom";
import { Axios } from "../lib/Axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
interface RouteParams {
  coinId: string;
}

interface ICoinData {
  description: string;
  development_status: string;
  first_data_at: string;
  hardware_wallet: boolean;
  hash_algorithm: string;
  id: string;
  is_active: boolean;
  is_new: boolean;
  last_data_at: string;
  logo: string;
  message: string;
  name: string;
  open_source: true;
  org_structure: string;
  proof_type: string;
  rank: number;
  started_at: string;
  symbol: string;
  type: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const Coin = () => {
  const { coinId } = useParams() as unknown as RouteParams;

  const { data: infoData, isLoading: infoLoading } = useQuery<ICoinData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { data: priceData, isLoading: priceLoading } = useQuery<IPriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId)
  );
  const chartMatch = useMatch("/:id/chart");
  const priceMatch = useMatch("/:id/price");
  const loading = infoLoading || priceLoading;
  // const [coinData, setCoinData] = useState<ICoinData>();
  // const [coinPrice, setCoinPrice] = useState<IPriceData>();
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const Data = await Axios(`/coins/${id}`);
  //     setCoinData(Data.data);
  //     const Price = await Axios(`/tickers/${id}`);
  //     setCoinPrice(Price.data);
  //     setIsLoading(false);
  //   })();
  // }, []);
  // console.log(chartMatch, 1);
  // console.log(priceMatch, 2);
  return (
    <>
      {infoLoading ? (
        <Header>Loading...</Header>
      ) : (
        <Container>
          <Header>
            <Title>Coin</Title>
          </Header>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId }} />
        </Container>
      )}
    </>
  );
};

export default Coin;
const Title = styled.p`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Container = styled.div`
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tabs = styled.div`
  width: 80%;
  height: 50px;
  border-radius: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: gray;
`;

const Tab = styled.div<{ isActive: boolean }>`
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
    color: inherit;
  }
`;
