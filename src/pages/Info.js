import React from "react";
import { Steps, Divider, Col, Row } from 'antd';
import {
  Switch,
  Route,
} from "react-router-dom";

const { Step } = Steps;

export default class Info extends React.Component {
  state = {
    current: 0,
  }

  onChange = current => {
    this.setState({ current });
    this.props.history.push(`/info/${current}`);
  };

  render() {
    return (
      <div className="container">
        <h1>¿Cómo realizar las mediciones?</h1>
          <Steps
            type="navigation"
            size="small"
            current={this.state.current}
            onChange={this.onChange}
            className="site-navigation-steps"
          >
            <Step status="process" title="Preparación" />
            <Step status="process" title="Medición" />
            <Step status="process" title="Verificación" />
          </Steps>
          <Divider />
          <Switch>
            <Row gutter={[48, 16]}>
              <Route exact path="/info/0">
                  <Col md={24} lg={12}>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit montes cum
                      porttitor, magnis porta nam est enim taciti facilisis nibh nisi.
                      Pharetra ridiculus congue nec magnis non vel massa porta pulvinar, risus
                      tellus dictum lectus neque lacus id. Velit ullamcorper rutrum sodales
                      dictumst nisl scelerisque nisi est, integer tempor nec suspendisse
                      montes erat cubilia tristique cum, class dictum convallis nunc placerat
                      inceptos sociosqu. Eu pulvinar bibendum phasellus ornare pretium dapibus
                      sollicitudin, natoque conubia ultrices vel tincidunt.
                    </p>
                    <p>
                      Nulla cursus mauris eu leo convallis placerat. Suspendisse mauris lacus, tempor sit amet sapien in,
                      sagittis accumsan ligula. Maecenas vitae arcu dapibus, aliquam libero quis, pharetra ligula.
                      Duis interdum erat ac neque condimentum hendrerit. Etiam augue erat, faucibus ut rutrum eget, sagittis accumsan lectus.
                      Duis varius nisl nec odio gravida, eu dapibus ante molestie. Sed eu facilisis odio, nec tempor magna.
                      Duis dignissim placerat nisi, ac gravida dolor rutrum ac. Morbi at lacus neque.
                    </p>
                    <p>
                      Nam mattis neque lobortis arcu varius egestas eu nec lacus. Nam a eleifend sapien.
                      Aliquam gravida eros dui, ut sollicitudin velit vehicula eget. Phasellus scelerisque dolor vitae elit vulputate tempor.
                      Suspendisse vitae volutpat neque, et sollicitudin erat. Quisque eu imperdiet arcu.
                      Aliquam eget elit arcu. Suspendisse ligula mi, lobortis et vestibulum et, consectetur quis ligula.
                      Vestibulum in metus ut velit tempus consectetur quis rutrum mi. Phasellus est libero, finibus blandit cursus quis,
                      convallis at felis. Nullam rutrum urna vel est vulputate mollis.
                      Aliquam mauris nisi, efficitur sit amet quam at, maximus dapibus neque. Nulla non eros tincidunt, laoreet lectus ac,
                      consectetur orci. Quisque eu mattis purus, feugiat finibus libero.
                    </p>
                  </Col>
                  <Col md={24} lg={12}>
                    <img class="imgInfo" src="/images/info0.jpg" alt="Info 0" />
                  </Col>
              </Route>
              <Route exact path="/info/1">
                  <Col md={24} lg={12}>
                    <p>
                      Nulla cursus mauris eu leo convallis placerat. Suspendisse mauris lacus, tempor sit amet sapien in,
                      sagittis accumsan ligula. Maecenas vitae arcu dapibus, aliquam libero quis, pharetra ligula.
                      Duis interdum erat ac neque condimentum hendrerit. Etiam augue erat, faucibus ut rutrum eget, sagittis accumsan lectus.
                      Duis varius nisl nec odio gravida, eu dapibus ante molestie. Sed eu facilisis odio, nec tempor magna.
                      Duis dignissim placerat nisi, ac gravida dolor rutrum ac. Morbi at lacus neque.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit montes cum
                      porttitor, magnis porta nam est enim taciti facilisis nibh nisi.
                      Pharetra ridiculus congue nec magnis non vel massa porta pulvinar, risus
                      tellus dictum lectus neque lacus id. Velit ullamcorper rutrum sodales
                      dictumst nisl scelerisque nisi est, integer tempor nec suspendisse
                      montes erat cubilia tristique cum, class dictum convallis nunc placerat
                      inceptos sociosqu. Eu pulvinar bibendum phasellus ornare pretium dapibus
                      sollicitudin, natoque conubia ultrices vel tincidunt.
                    </p>
                    <p>
                      Nam mattis neque lobortis arcu varius egestas eu nec lacus. Nam a eleifend sapien.
                      Aliquam gravida eros dui, ut sollicitudin velit vehicula eget. Phasellus scelerisque dolor vitae elit vulputate tempor.
                      Suspendisse vitae volutpat neque, et sollicitudin erat. Quisque eu imperdiet arcu.
                      Aliquam eget elit arcu. Suspendisse ligula mi, lobortis et vestibulum et, consectetur quis ligula.
                      Vestibulum in metus ut velit tempus consectetur quis rutrum mi. Phasellus est libero, finibus blandit cursus quis,
                      convallis at felis. Nullam rutrum urna vel est vulputate mollis.
                      Aliquam mauris nisi, efficitur sit amet quam at, maximus dapibus neque. Nulla non eros tincidunt, laoreet lectus ac,
                      consectetur orci. Quisque eu mattis purus, feugiat finibus libero.
                    </p>
                  </Col>
                   <Col md={24} lg={12}>
                    <img class="imgInfo" src="/images/info1.jpg" alt="Info 1" />
                  </Col>
              </Route>
              <Route exact path="/info/2">
                  <Col md={24} lg={12}>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit montes cum
                      porttitor, magnis porta nam est enim taciti facilisis nibh nisi.
                      Pharetra ridiculus congue nec magnis non vel massa porta pulvinar, risus
                      tellus dictum lectus neque lacus id. Velit ullamcorper rutrum sodales
                      dictumst nisl scelerisque nisi est, integer tempor nec suspendisse
                      montes erat cubilia tristique cum, class dictum convallis nunc placerat
                      inceptos sociosqu. Eu pulvinar bibendum phasellus ornare pretium dapibus
                      sollicitudin, natoque conubia ultrices vel tincidunt.
                    </p>
                    <p>
                      Nam mattis neque lobortis arcu varius egestas eu nec lacus. Nam a eleifend sapien.
                      Aliquam gravida eros dui, ut sollicitudin velit vehicula eget. Phasellus scelerisque dolor vitae elit vulputate tempor.
                      Suspendisse vitae volutpat neque, et sollicitudin erat. Quisque eu imperdiet arcu.
                      Aliquam eget elit arcu. Suspendisse ligula mi, lobortis et vestibulum et, consectetur quis ligula.
                      Vestibulum in metus ut velit tempus consectetur quis rutrum mi. Phasellus est libero, finibus blandit cursus quis,
                      convallis at felis. Nullam rutrum urna vel est vulputate mollis.
                      Aliquam mauris nisi, efficitur sit amet quam at, maximus dapibus neque. Nulla non eros tincidunt, laoreet lectus ac,
                      consectetur orci. Quisque eu mattis purus, feugiat finibus libero.
                    </p>
                    <p>
                      Nulla cursus mauris eu leo convallis placerat. Suspendisse mauris lacus, tempor sit amet sapien in,
                      sagittis accumsan ligula. Maecenas vitae arcu dapibus, aliquam libero quis, pharetra ligula.
                      Duis interdum erat ac neque condimentum hendrerit. Etiam augue erat, faucibus ut rutrum eget, sagittis accumsan lectus.
                      Duis varius nisl nec odio gravida, eu dapibus ante molestie. Sed eu facilisis odio, nec tempor magna.
                      Duis dignissim placerat nisi, ac gravida dolor rutrum ac. Morbi at lacus neque.
                    </p>
                  </Col>
                  <Col md={24} lg={12}>
                    <img class="imgInfo" src="/images/info2.jpg" alt="Info 2" />
                  </Col>
              </Route>
            </Row>
          </Switch>
      </div>
    )
  }
};
