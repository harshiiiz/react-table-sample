
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import WidgetPage from './components/WidgetPage';



function App() {
  
  
    
  return (
    <ChakraProvider>
       
       <WidgetPage title={'Table Widget'}/>
        
       </ChakraProvider>
  );
}

export default App;
