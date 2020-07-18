import React from 'react';
import { DatePicker, Table, Form, Icon, Input, Button, Select, Empty, Row, Col, Divider } from 'antd';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

import HistoryChart from '../components/HistoryChart';

const { RangePicker } = DatePicker;

export default class Reports extends React.Component {

  state = {
    dataSource: [],
    mapPosition: [-2.1494119,-79.9025117],
  }

  handleSearch = e => {
    e.preventDefault();

    const dataSource = [
      {
        key: '1',
        date: '2020-01-20',
        mg: 100,
        ca: 200,
        k: 300,
      },
      {
        key: '2',
        date: '2020-01-24',
        mg: 800,
        ca: 300,
        k: 400,
      },
      {
        key: '3',
        date: '2020-01-28',
        mg: 130,
        ca: 250,
        k: 500,
      },
    ];

    this.setState({dataSource: dataSource})
  }

  render() {
    const columns = [
      {
        title: 'Fecha',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Calcio',
        dataIndex: 'ca',
        key: 'ca',
      },
      {
        title: 'Magnesio',
        dataIndex: 'mg',
        key: 'mg',
      },
      {
        title: 'Potasio',
        dataIndex: 'k',
        key: 'k',
      },
    ];
    return (
      <>
      <Form layout="inline" onSubmit={this.handleSearch}>
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
          <RangePicker />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={this.handleSearch}>
            Consultar
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Row gutter={[48, 16]}>
        <Col md={24} lg={12}>
        {this.state.dataSource.length > 0 ? <HistoryChart dataSource={this.state.dataSource} /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{margin: '150px'}} />}
        </Col>
        <Col md={24} lg={12}>
          <Map center={this.state.mapPosition} zoom={12}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </Map>
        </Col>
      </Row>
      <Row gutter={[48, 16]}>
        <Col span={24}>
          <Table dataSource={this.state.dataSource} columns={columns} />
        </Col>
      </Row>
      </>
    );
  }
}
