import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Overview from './pages/Overview/Overview';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        <Header />
        <Overview />
      </main>
    </div>
  );
}

export default App;
