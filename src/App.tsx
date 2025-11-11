import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Subs } from '..';

function App() {
  const [count, setCount] = useState(0)
  const [inputCustomCountValue, setInputCustomCountValue] = useState('');

  const handleClickCustomCount = () => {
    if (inputCustomCountValue === '') {
      setCount(count => count + 1);
    } else {
      setCount(Number(inputCustomCountValue));
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Subs
        address={'0x687Dc893A438CFdBE30c9CCf73cA5e695E38D791'}
        appId="22"
        chain={'bsct'}
        defaultPayment="Premium"
        choice={{
          payment: 'Premium',
          token: '0x337610d27c682e347c9cd60bd4b3b107c9d34ddd',
        }}
        // dataOnSubs={handleResponseSubscribed}
        apiKey={'9gn3ssv5lzvl3h4w2ocff630nzwqmr'}
        mode={'testnet'}
      />

      <Subs address={"0x687Dc893A438CFdBE30c9CCf73cA5e695E38D791"} appId="4" chain={"bsc"}
        // choice={{
        //   payment: "Plan Mensuel",
        //   token: "0x8e468E7Cbf7E7E056A7591C796F2dd4C5C255591",
        // }}
        width={300} apiKey={'cw5qrrqushne2vht7yb4o9vk1uf0a7'} mode={'mainnet'} />
    </>
  )
}

export default App
