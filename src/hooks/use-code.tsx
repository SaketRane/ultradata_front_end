import { baseURL } from '@/api/api';
import axios from 'axios';
import { useState } from 'react';

const useCode = () => {
  const [value, setValue] = useState(null);
  const [values, setValues] = useState(null);
  const filters = JSON.parse(localStorage.getItem('filters') || '');

  const parseCode = (dataCode) => {
    const code = filters?.insurer?.code;
    const year = filters?.year;
    const last2SymYear = year.toString().substring(2);
    const query = last2SymYear + code + dataCode;

    return query;
  };

  const handleGetCode = (dataCode) => async () => {
    const countryCode = filters?.insurer?.countryCode;
    const code = filters?.insurer?.code;
    const year = filters?.year;
    const last2SymYear = year.toString().substring(2);
    const query = last2SymYear + code + dataCode;

    await axios.post(baseURL + '/data', { code: query }).then((response) => {
      const data = response.data;
      setValue(data?.value);
    });
  };

  const handleBatchCode = async (arrayCodes) => {
    const batch = [];

    await arrayCodes.forEach((codeItem) => {
      const code = filters?.insurer?.code;
      const year = filters?.year;
      const last2SymYear = year.toString().substring(2);
      const query = last2SymYear + code + codeItem;

      batch.push(query);
    });

    await axios
      .post(baseURL + '/data/batch', {
        codeList: [...batch],
      })
      .then((response) => {
        const data = response.data;
        setValues(data?.values);
      });
  };

  return { value, handleGetCode, parseCode, handleBatchCode, filters, values };
};

export default useCode;
