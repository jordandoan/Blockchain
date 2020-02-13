import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chain = () => {
  const [data, setData] = useState()
  useEffect(() => {
    axios.get('http://localhost:5000/chain')
      .then(res => {
        setData(res.data)
      })
  }, [])
  console.log(data)
  return (
    <div>
      { data && data.chain.map(block => (<div>
        {block.previous_hash}
      </div>))
    }
    </div>
  )
}

export default Chain;