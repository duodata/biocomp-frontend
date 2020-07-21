import React from 'react';
import { Form, Row, Col, Radio, InputNumber, Statistic, Card, Select, DatePicker, Button, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export default class Calc extends React.Component {

  handleSave = e => {
    e.preventDefault();
  }

  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };

    return (
      <>
      <Row gutter={[48*4, 16]} justify="center">
        <Col sm={24} md={12} lg={8}>
          <Form {...layout}>
            <Form.Item name="radio-group" label="Tipo">
              <Radio.Group>
                <Radio.Button value="larva">Larva</Radio.Button>
                <Radio.Button value="camaronera">Camaronera</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Calcio">
              <Form.Item name="ca" noStyle>
                <InputNumber min={1} max={100} />
              </Form.Item>
              <span className="ant-form-text"> mg/L</span>
            </Form.Item>
            <Form.Item label="Magnesio">
              <Form.Item name="mg" noStyle>
                <InputNumber min={1} max={100} />
              </Form.Item>
              <span className="ant-form-text"> mg/L</span>
            </Form.Item>
            <Form.Item label="Potasio">
              <Form.Item name="k" noStyle>
                <InputNumber min={1} max={100} />
              </Form.Item>
              <span className="ant-form-text"> mg/L</span>
            </Form.Item>
            <Form.Item label="Salinidad">
              <Form.Item name="salinidad" noStyle>
                <InputNumber min={1} max={100} />
              </Form.Item>
              <span className="ant-form-text"> ups</span>
            </Form.Item>
            <Form.Item label="Densidad">
              <Form.Item name="densidad" noStyle>
                <InputNumber min={1} max={100} />
              </Form.Item>
              <span className="ant-form-text"> Ind/m</span>
            </Form.Item>
          </Form>
        </Col>
        <Col sm={24} md={12} lg={8}>
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
        <Col sm={24} md={24} lg={16}>
          <Divider />
          <Form layout="inline" onSubmit={this.handleSave}>
            <Form.Item label="Piscina">
              <Select
                style={{ width: 200 }}
                showSearch
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Select.Option value="10401">10401</Select.Option>
                <Select.Option value="10402">10402</Select.Option>
                <Select.Option value="10403">10403</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Granja">
              <Select
                style={{ width: 200 }}
                showSearch
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Select.Option value="10401">10401</Select.Option>
                <Select.Option value="10402">10402</Select.Option>
                <Select.Option value="10403">10403</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Fecha">
              <DatePicker />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={this.handleSave}>
                Guardar
              </Button>
            </Form.Item>
          </Form>
            </Col>
          </Row>
      </>
    );
  }
}
