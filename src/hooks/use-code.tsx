import axios from 'axios';
import  { useState } from 'react'

const useCode = () => {
 const [value, setValue] = useState(null);
 const filters = JSON.parse(localStorage.getItem('filters') || '');

  const handleGetCode = (dataCode) => async () => {

    const countryCode = filters?.insurer?.countryCode;
    const code = filters?.insurer?.code;
    const year = filters?.year;
    const last2SymYear = year.toString().substring(2);
    const query = countryCode + last2SymYear + code + dataCode;

    await axios.post('http://194.163.164.118:8094/api/data', {code: query}).then((response) => {
      const data = response.data;
      setValue(data?.value)
    })
  }

  return {value, handleGetCode, filters}
}

export default useCode;