import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: string;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const Coins = () => {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  console.log(data, isLoading);
  const navigate = useNavigate();
  const handleClick = (id: string, name: string) => {
    navigate(`./${id}`, { state: { name } });
  };

  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const getCoinData = async () => {
  //   const res = await Axios("/coins");
  //   return res.data.slice(0, 100);
  // };
  // useEffect(() => {
  //   (async () => {
  //     const coinData = await getCoinData();
  //     setCoins(coinData);
  //   })();
  // }, []);
  return (
    <>
      {isLoading ? (
        <Title>Loading..</Title>
      ) : (
        <Container>
          <Header>
            <Title>Coin</Title>
          </Header>
          <CoinsList>
            {data?.slice(0, 100)?.map((coin) => (
              <Coin
                key={coin.id}
                onClick={() => handleClick(coin.id, coin.name)}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name}
                &rarr;
              </Coin>
            ))}
          </CoinsList>
        </Container>
      )}
    </>
  );
};

export default Coins;

const Title = styled.p`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Container = styled.div`
  padding: 0px 10px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Coin = styled.li`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  color: ${(props) => props.theme.bgColor};
  width: 30%;
  margin-bottom: 10px;
  height: 30px;
  padding-left: 10px;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
`;
