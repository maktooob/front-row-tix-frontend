import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import EventDetailsPage from './pages/EventDetailsPage';
import EventListPage from './pages/EventListPage';
import EventEditPage from './pages/EventEditPage';


function App() {
  return (
    <div className="App">
      <Navbar />

    <Routes>
      <Route path='/events' element={<EventListPage/>}/>
      <Route path='/events/:id' element={<EventDetailsPage/>}/>
      <Route path='/events/edit/:id' element={<EventEditPage />}/>
    </Routes>


    </div>
  );
}

export default App;
