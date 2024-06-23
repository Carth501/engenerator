import engenLogo from './images/engeneratorLogo.png';
import cLogo from './images/cLogo.png';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { engen_theme } from './theme';
import ShopPage from './content/shop/ShopPage.jsx';


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={engen_theme}>
        <div className='App-header'>
          <img src={engenLogo} alt="engenerator" className='engen-logo' />
        </div>
        <div className='page'>
          <ShopPage />
        </div>
        <footer className='App-footer'>
          <img src={cLogo} alt="site by C" className='designer-logo' />
        </footer>
      </ThemeProvider>
    </div>
  );
}

export default App;
