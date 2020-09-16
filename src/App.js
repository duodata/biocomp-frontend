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
  UserOutlined,
} from '@ant-design/icons';

import AuthenticationService from './services/authentication.service';

import Home from './pages/Home';
import Info from './pages/Info';
import Calc from './pages/Calc';
import Reports from './pages/Reports'
import Contact from './pages/Contact';
import Login from './pages/Login';

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
    currentUser: undefined,
  };

  componentDidMount() {
    AuthenticationService.currentUser.subscribe(user => this.setState({currentUser: user}));
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logout = () => {
    AuthenticationService.logout();
  }

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
              {this.state.currentUser &&
                <Menu.Item key="profile" icon={<UserOutlined />}><Link to="/" onClick={this.logout}> Cerrar sesión</Link></Menu.Item>
              }
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
                  <Route exact path="/calc/" component={this.state.currentUser ? Calc : Login} />
                  <Route exact path="/reports/" component={this.state.currentUser ? Reports : Login} />
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
