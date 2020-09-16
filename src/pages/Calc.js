import React from 'react';
import { Form, Row, Col, Radio, InputNumber, Statistic, Card, Select, DatePicker, Button, Divider, Alert } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Steps } from 'intro.js-react';

import 'intro.js/introjs.css';

import DataService from '../services/data.service';

export default class Calc extends React.Component {
  state = {
    stepsEnabled: false,
    initialStep: 0,
    steps: [
      {
        element: ".formulario",
        intro: "Digite los valores medidos"
      },
      {
        element: ".calculos",
        intro: "Los valores requeridos serán calculados automáticamente"
      },
      {
        element: ".guardar",
        intro: "Puede guardar el cálculo asignándolo a una granja y piscina"
      },
    ],
    saveMessage: '',
    saveMessageType: '',
    variables: [],
    granjas: [],
    piscinas: [],
    granjaId: null,
    piscinaId: null,
    fecha: null,
    mediciones: null,
  };

  componentDidMount() {
    DataService.getGranjas().then(granjas => this.setState({granjas}));
    DataService.getVariables().then(variables => this.setState({variables}));
  }

  handleMedicionChange = (changedValues, allValues) => {
    /*
    {variableId: value} to {"variable": variableId, "valor": value}
    */
    const mediciones = Object.entries(allValues).map(([variable, valor]) => ({variable: variable, valor: valor}))
    this.setState({mediciones: mediciones})
  }

  handleChangeGranja = granjaId => {
    if (granjaId) {
      DataService.getPiscinas(granjaId).then(piscinas => this.setState({piscinas, granjaId}));
    } else {
      this.setState({piscinas: []});
    }
    this.setState({piscinaId: null})
  }

  handleChangePiscina = piscinaId => {
    this.setState({piscinaId});
  }

  handleChangeFecha = (_, fecha) => {
    this.setState({fecha});
  }

  handleSave = e => {
    e.preventDefault();
    DataService.postMuestra({
      piscina: this.state.piscinaId,
      fecha: this.state.fecha,
      mediciones: this.state.mediciones,
    }).then(
      () => {
        this.setState({saveMessage: "Guardado con éxito", saveMessageType: "success"})
        this.setState({piscinaId: null, fecha: null, mediciones: []})
      },
      error => {
        this.setState({saveMessage: "Hubo un error", saveMessageType: "error"})
      }
    );
  };

  handleShowSteps = () => {
    this.setState(() => ({ stepsEnabled: true }));
  }

  onExitSteps = () => {
    this.setState(() => ({ stepsEnabled: false }));
  };

  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };

    const {
      stepsEnabled,
      steps,
      initialStep,
    } = this.state;

    return (
      <>
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={initialStep}
        onExit={this.onExitSteps}
      />
      <Row gutter={[48*4, 16]} justify="center">
        <Col sm={24} md={12} lg={8} className="formulario">
          <Form {...layout} onValuesChange={this.handleMedicionChange}>
            <Form.Item label="Tipo">
              <Radio.Group>
                <Radio.Button value="larva">Larva</Radio.Button>
                <Radio.Button value="camaronera">Camaronera</Radio.Button>
              </Radio.Group>
            </Form.Item>
            {this.state.variables.map(v =>
              <Form.Item key={v.id} label={v.nombre}>
                <Form.Item name={v.id} noStyle>
                  <InputNumber min={v.minimo} max={v.maximo} />
                </Form.Item>
                <span className="ant-form-text"> {v.unidad}</span>
              </Form.Item>
            )}
          </Form>
          <Button type="dashed" icon={<InfoCircleOutlined />} onClick={this.handleShowSteps}>
             Ayuda
          </Button>
        </Col>
        <Col sm={24} md={12} lg={8} className="calculos">
          <Card>
            <Statistic
              title="Calcio"
              value={11.12}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="ppm"
            />
          </Card>
          <Card>
            <Statistic
              title="Magnesio"
              value={1.22}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="ppm"
            />
          </Card>
          <Card>
            <Statistic
              title="Potasio"
              value={89.82}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="ppm"
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[48*4, 16]} justify="center">
        <Col sm={24} md={24} lg={16} className="guardar">
          <Divider />
          <Form layout="inline" onSubmit={this.handleSave} onValuesChange={this.handlePlaceChange} preserve={false}>
            <Form.Item label="Granja" name="granjaId">
              <Select
                style={{ width: 200 }}
                showSearch
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={this.handleChangeGranja}
                value={this.state.granjaId}
              >
                {this.state.granjas.map(g => <Select.Option key={g.id} value={g.id}>{g.nombre}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="Piscina" name="piscinaId">
              <Select
                style={{ width: 200 }}
                showSearch
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                // disabled={this.state.piscinas.length === 0}
                onChange={this.handleChangePiscina}
                value={this.state.piscinaId}
              >
                {this.state.piscinas.map(p => <Select.Option key={p.id} value={p.id}>{p.nombre}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="Fecha" name="fecha">
              <DatePicker onChange={this.handleChangeFecha} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={this.handleSave}
                disabled={!this.state.granjaId || !this.state.piscinaId || !this.state.fecha}>
                Guardar
              </Button>
            </Form.Item>
            {this.state.saveMessage &&
            <Form.Item>
              <Alert message={this.state.saveMessage} type={this.state.saveMessageType} showIcon />
            </Form.Item>
            }
          </Form>
            </Col>
          </Row>
      </>
    );
  }
}
