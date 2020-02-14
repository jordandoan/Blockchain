import React, { useState, useEffect } from 'react';

import Mine from './components/Mine';
import SetName from './components/SetName';
import Chain from './components/Chain';
import './App.css';
import axios from 'axios';
function App() {
  const [id, setId] = useState("")
  const [data, setData] = useState()
  const [userInfo, setInfo] = useState({ balance: 0, sent: [], received: []})
  
  useEffect(() => {
    axios.get('http://localhost:5000/chain')
      .then(res => {
        setData(res.data)
      })
  }, [])

  useEffect(() => {
    let balance = 0
    let sent = []
    let received = []
    if (data && id) {
      data.chain.forEach(block => {
        block.transactions.forEach(transaction => {
          const { amount, recipient, sender } = transaction;
          if (recipient == id) {
            balance += amount;
            received.push(transaction);
          } else if (sender == id) {
            balance -= amount;
            sent.push(transaction);
          }
        })
      })
      setInfo({balance, sent, received});
    }
  }, [data, id])

  return (
    <div className="App">
      {!id && <SetName setId={setId} />}
      { data && id && 
        <>
          Welcome {id}!
          <p>Balance: {userInfo.balance}</p>
          <div>
            Received Payments:
            {userInfo.received.map(transaction =>
              (<div>
                <p>Received: {transaction.amount}</p>
                <p>Sent by: {transaction.sender == 0 ? "Mined" : transaction.sender}</p>
              </div>)
            )}
          </div>
          <div>
            Sent Payments:
            {userInfo.sent.map(transaction =>
              (<div>
                <p>Coins sent: {transaction.amount}</p>
                <p>Sent to: {transaction.recipient}</p>
              </div>)
            )}
          </div>
          {/* <Mine/> */}
          <Chain />
        </>
      }
    </div>
  );
}

export default App;
