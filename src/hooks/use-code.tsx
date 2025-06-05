import axios from 'axios';
import  { useState } from 'react'

const useCode = () => {
 const [value, setValue] = useState(null);

  const handleGetCode = (dataCode) => async () => {
    await axios.post('http://194.163.164.118:8094/api/data', {code: dataCode}).then((response) => {
      const data = response.data;
      setValue(data?.value)
    })
  }

  return {value, handleGetCode}
}

export default useCode;