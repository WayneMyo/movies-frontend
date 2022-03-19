import { useState, useEffect } from 'react';
import configureStoreFunc from './store/configureStore';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import { Switch, IconButton } from '@material-ui/core';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

const store = configureStoreFunc();

function App() {
  var hr = (new Date()).getHours();
  var afterSunset = hr > 17;
  const [theme, setTheme] = useState(afterSunset ? 'dark-theme' : 'light-theme');
  const [checked, setChecked] = useState(!afterSunset);
  const [navToggle, setNavToggle] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme, afterSunset]);

  const themeToggler = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
      setChecked(false)
    } else {
      setTheme('light-theme');
      setChecked(true)
    }
  }

  return (
    <div className='App'>
      <Navbar navToggle={navToggle} theme={theme} />

      <div className="theme">
        <div className="light-dark-mode">
          <div className="left-content">
            {theme === "light-theme" ? <Brightness5Icon /> : <Brightness3Icon />}
          </div>
          <div className="right-content">
            <Switch
              value=""
              checked={checked}
              inputProps={{ 'aria-label': '' }}
              size="small"
              onClick={themeToggler}
            />
          </div>
        </div>
      </div>

      <div className="ham-burger-menu">
        <IconButton onClick={() => setNavToggle(!navToggle)}>
          {navToggle ? <NavigateBeforeRoundedIcon /> : <NavigateNextRoundedIcon />}
        </IconButton>
      </div>

      <MainContentStyled>
        <Provider store={store}>
          <HomePage/>
        </Provider>
      </MainContentStyled>
    </div>
  );
}

const MainContentStyled = styled.main`
  position: relative;
  min-width: 100vh;

  @media screen and (min-width:1200px){
    padding-top: 5rem;
  }
`;

export default App;
