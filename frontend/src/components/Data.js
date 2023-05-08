import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get('/files/data');
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-3">
      <h1>Data</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {data.map((file) => (
            file.lines.map((line) => (
          <tr key={file.file}>
            <td>{file.file}</td>
            <td>{line.text}</td>
            <td>{line.number}</td>
            <td>{line.hex}</td>
          </tr>
          ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data;
