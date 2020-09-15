import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu, Button } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  ExperimentOutlined,
  CalculatorOutlined,
  LineChartOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

import Home from './pages/Home';
import Info from './pages/Info';
import Calc from './pages/Calc';
import Reports from './pages/Reports'
import Contact from './pages/Contact';

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Router>
        <Layout hasSider>
          <Sider
            breakpoint="lg"
            collapsedWidth={0}
            collapsed={this.state.collapsed}
            trigger={null}
            onCollapse={(collapsed, type) => {
              this.toggleCollapsed();
            }}
          >
            <div className="logo"><h1>Biocomp</h1></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
              <Menu.Item key="home" icon={<HomeOutlined />}><Link to="/">Inicio</Link></Menu.Item>
              <Menu.Item key="info" icon={<ExperimentOutlined />}><Link to="/info/0">Mediciones</Link></Menu.Item>
              <Menu.Item key="calc" icon={<CalculatorOutlined />}><Link to="/calc/">Calculadora</Link></Menu.Item>
              <Menu.Item key="reports" icon={<LineChartOutlined />}><Link to="/reports/">Reportes</Link></Menu.Item>
              <Menu.Item key="contact" icon={<PhoneOutlined />}><Link to="/contact/">Contáctenos</Link></Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
              <Button type="link" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                {this.state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
              </Button>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/info/" component={Info} />
                  <Route exact path="/calc/" component={Calc} />
                  <Route exact path="/reports/" component={Reports} />
                  <Route exact path="/contact/" component={Contact} />
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2020</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
