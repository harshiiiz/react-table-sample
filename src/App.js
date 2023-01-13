
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'

import BasicTable from './components/BasicTable';
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
    <ChakraProvider>
       <  BasicTable  COLUMNS={COLUMNS} MOCK_DATA={MOCK_DATA} renderRowSubComponent={renderRowSubComponent}/> 
        
       </ChakraProvider>
  );
}

export default App;
