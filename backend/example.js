/*
const TableData = ({ tableName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/data/${tableName}`)
      .then(response => setData(response.data))
      .catch(error => console.error(`Error obteniendo datos de ${tableName}:`, error));
  }, [tableName]);
}
*/