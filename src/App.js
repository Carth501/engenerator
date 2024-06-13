import engenLogo from './images/engeneratorLogo.png';
import cLogo from './images/cLogo.png';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { engen_theme } from './theme';
import ShopGen from './content/ShopGen';


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={engen_theme}>
        <div className='App-header'>
          <img src={engenLogo} alt="engenerator" className='engen-logo' />
        </div>
        <div className='page'>
          <ShopGen />
        </div>
        <footer className='App-footer'>
          <img src={cLogo} alt="site by C" className='designer-logo' />
        </footer>
      </ThemeProvider>
    </div>
  );
}

export default App;
