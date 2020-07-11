import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './pages/Home';
import Info from './pages/Info';
import Calc from './pages/Calc';
import Contact from './pages/Contact';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
            <Menu.Item key="home"><Link to="/">Inicio</Link></Menu.Item>
            <Menu.Item key="info"><Link to="/info/">Descripción</Link></Menu.Item>
            <Menu.Item key="calc"><Link to="/calc/">Calculadora</Link></Menu.Item>
            <Menu.Item key="contact"><Link to="/contact/">Contáctenos</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '50px' }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/info/" component={Info} />
              <Route exact path="/calc/" component={Calc} />
              <Route exact path="/contact/" component={Contact} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2020</Footer>
      </Layout>
    </Router>
  );
}

export default App;
