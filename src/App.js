
import './App.css';

import Table from './components/BasicTable';
import { COLUMNS } from "../src/components/columns";
import MOCK_DATA from "../src/components/MOCK_DATA.json";

function App() {
  
  const renderRowSubComponent = ({ row }) => (
    <span
      style={{
        fontSize: "10px",
      }}
    >
      <h2>{JSON.stringify(row.original.email)}</h2>
    </span>
  );
  
    
  return (
    <div className="App">
       <Table  COLUMNS={COLUMNS} MOCK_DATA={MOCK_DATA} renderRowSubComponent={renderRowSubComponent}/> 
        
    </div>
  );
}

export default App;
