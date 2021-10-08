import { useSelector } from 'react-redux';
import './App.css';
import Blogs from './components/Blogs';
import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import { selectSignedIn } from './redux/features/userSlice';

function App() {

  const isSignedIn = useSelector(selectSignedIn)


  return (
    <div className="App">
      <Navbar />
      <HomePage />
      {isSignedIn && <Blogs />}
    </div>
  );
}

export default App;
