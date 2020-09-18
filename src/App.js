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
        <Menu.Item key="ansi">
          <NavLink to="/deal-ansi">ANSI</NavLink>
        </Menu.Item>
        <Menu.Item key="table">
          <NavLink to="/edit-table">可编辑单元格</NavLink>
        </Menu.Item>
        <Menu.Item key="3d">
          <NavLink to="/threed-view">3d模型</NavLink>
        </Menu.Item>
        <Menu.Item key="hoc">
          <NavLink to="/hoc-component">高阶组件</NavLink>
        </Menu.Item>
      </Menu>
      <div style={{ marginTop: 30, height: 100 }}> 
      { renderRoutes(routes) }
      </div>
    </HashRouter>
  );
}

export default App;
