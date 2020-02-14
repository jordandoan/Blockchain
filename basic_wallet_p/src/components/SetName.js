import React, { useState } from 'react';

const SetName = ({ setId }) => {
  const [fields, setFields] = useState({name: ""})
  const handleChange = (e) => {
    e.preventDefault()
    setFields({name: e.target.value})
  }
  return (
    <div>
      <input type="text" name="name" value={fields.name} placeholder="Choose a name." onChange={handleChange}></input>
      <button onClick={() => setId(fields.name)}>Set Name</button>
    </div>
  )
}

export default SetName;