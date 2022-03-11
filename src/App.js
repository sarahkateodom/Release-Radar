import logo from './logo.svg';
import './App.css';
import Spotify from './components/Spotify';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Spotify></Spotify>
      </header>
    </div>
  );
}

export default App;
