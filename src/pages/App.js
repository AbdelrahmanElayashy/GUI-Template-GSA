import { Routes, Route } from 'react-router-dom'
import { NewAppTemplate } from './NewAppTemplate'
import { EditAppTemplate } from './EditAppTemplate'
import { Home } from './Home'


function App() {

  return (
    <>
      <Routes>
        <Route path='*' element={<Home />} />
        <Route path='/createTemplate' element={<NewAppTemplate />} />
        <Route path='/editTemplate' element={<EditAppTemplate />} />
      </Routes>
    </>

  );
}

export default App;
