import React, {useState} from 'react';
import { GlobalStyle } from './style.js';
import { Menu } from 'antd';
import routes from './routes';
import { renderRoutes } from 'react-router-config';
import { HashRouter, NavLink } from 'react-router-dom';
import './app.css';

function App() {
  const [current, setCurrent] = useState('mail')

  console.log(current)
  return (
    <HashRouter>
      <GlobalStyle />
      <Menu mode="horizontal" onClick={(e) => setCurrent(e.key) } selectedKeys={[current]}>
        <Menu.Item key="mail">
          <NavLink to="/dark-mode">黑暗模式</NavLink>
        </Menu.Item>
        <Menu.Item key="app">
          <NavLink to="/normal-mode">正常模式</NavLink>
        </Menu.Item>
      </Menu> 
      { renderRoutes(routes) }
    </HashRouter>
  );
}

export default App;
