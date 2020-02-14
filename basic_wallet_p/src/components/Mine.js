import React, { useState, useEffect } from 'react';
import { sha256 } from 'js-sha256'
import axios from 'axios';

const Mine = () => {
  const [isMining, toggleMine] = useState(false)
  const [data, setData] = useState(false)


  useEffect(() => {
    axios.get('http://localhost:5000/last_block')
      .then(res => {
        setData(res.data)
      })
  }, [])

  console.log(data)
  useEffect(() => {
    let block = JSON.stringify(data.last_block);
    let proof = 0;
    const validProof = (s, proof) => {
      let guess = sha256(`${s}${proof}`);
      return guess.substring(0,6) === "000000"
    }

    while (isMining && !validProof(block, proof)) {
      proof += 1
    }

    console.log(proof);
  }, [isMining])
  return (
    <div>
      <button onClick={() => toggleMine(!isMining)}>{isMining ? "Stop" : "Start"} Mining</button>
    </div>
  )
}

export default Mine