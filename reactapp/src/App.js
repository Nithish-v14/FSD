// App.js
import React from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Student from './Student';



const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Register/>}/>
        <Route exact path='/Login' element={<Login/>}/>
        <Route exact path='/Student' element={<Student/>}/>
   
        
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
