import React, { useState, useEffect } from 'react'

const State = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [coins, setCoins] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>("");
  const [amount, setAmount] = useState<any>("");
  const [totalCoin, setTotalCoin] = useState<any>();

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, [])

  // 선택된 코인 value (금액) 확인
  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  }
  // select값이 변경되지 않음에도 render하는 것 방지 [미흡함]
  useEffect(() => {
    if (selected === "") {
      return;
    }
    console.log(selected);
  }, [selected]);

  // 입력한 금액 확인
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setAmount(event.target.value);
  // input값이 변경되지 않음에도 render하는 것 방지 [미흡함]
  useEffect(() => {
    if (amount === "") {
      return;
    }
    console.log(amount);
  }, [amount]);

  // 코인과 금액을 나눠서 값 계산
  const calculateHandler = (event: React.MouseEvent) => {
    setTotalCoin((selected / amount).toFixed(3));
  }

  return (
    <div>
      구매할 금액 입력: <input type="number" onChange={changeHandler} placeholder="0" value={amount} />
      <button onClick={calculateHandler}>확인</button>
      <hr />
      <p>구입 가능한 코인 수: {totalCoin ? <span>{totalCoin}</span> : <span>0</span>} 개</p>
      <hr />
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {/* 
      {loading ? <strong>Loading...</strong> : null}
      <ul>
        {coins.map((coin) =>
          <li>{coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD</li>
        )}
      </ul> */}

      {loading ? <strong>Loading...</strong> : (
        <select onChange={selectHandler} defaultValue="default">
          <option value="default">select coin!!!</option>
          {coins.map((coin) =>
            <option key={coin.id} value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          )}
        </select>
      )}
    </div>
  )
}

export default State;