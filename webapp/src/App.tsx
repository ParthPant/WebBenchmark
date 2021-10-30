import './App.css';
import Header from './components/Header'
import Editor from './components/Editor'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App m-4 mb-0 flex flex-col justify-between">
      <Header/>
      <Editor/>
      <Footer/>
    </div>
  );
}

export default App;
