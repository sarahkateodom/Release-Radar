import logo from './logo.svg';
import './App.css';
import ImplicitGrant from './components/ImplicityGrant';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ImplicitGrant></ImplicitGrant>
      </header>
    </div>
  );
}

export default App;
