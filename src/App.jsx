import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './App.css';
import CharacterPage from './content/character/CharacterPage.jsx';
import { CharacterMap } from './content/character_map/CharacterMap.jsx';
import { SeedControls } from './content/SeedControls.jsx';
import ShopPage from './content/shop/ShopPage.jsx';
import cLogo from './images/cLogo.png';
import engenLogo from './images/engeneratorLogo.png';
import { engen_theme } from './theme';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function App() {
    const [activeTab, setActiveTab] = useState(0);


    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div className="App">
            <ThemeProvider theme={engen_theme}>
                <div className='App-header'>
                    <img src={engenLogo} alt="engenerator" className='engen-logo' />
                    <SeedControls />
                </div>
                <div className='page'>
                    <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                        <Tabs
                            value={activeTab}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            textColor="secondary">
                            <Tab label="Shops" {...a11yProps(0)} />
                            <Tab label="Characters" {...a11yProps(1)} />
							<Tab label="Character Map" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={activeTab} index={0}>
                        <ShopPage />
                    </CustomTabPanel>
                    <CustomTabPanel value={activeTab} index={1}>
                        <CharacterPage />
                    </CustomTabPanel>
                    <CustomTabPanel value={activeTab} index={2}>
                        <CharacterMap />
                    </CustomTabPanel>
                </div>
                <footer className='App-footer'>
                    <img src={cLogo} alt="site by C" className='designer-logo' />
                </footer>
            </ThemeProvider>
        </div>
    );
}

export default App;
