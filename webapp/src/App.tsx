import './App.css';
import Header from './components/Header'
import Editor from './components/Editor'
import Footer from './components/Footer'
import ThemeProvider from './components/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col justify-between p-4 pb-0 dark:bg-gray-900 App">
        <Header/>
        <Editor/>
        <Footer/>
      </div>
    </ThemeProvider>
  );
}

export default App;
