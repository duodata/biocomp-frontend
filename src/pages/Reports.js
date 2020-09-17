import React from 'react';
import { DatePicker, Table, Form, Button, Select, Empty, Row, Col, Divider, message, Popconfirm, Space} from 'antd';
import { Map, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

import HistoryChart from '../components/HistoryChart';
import DataService from '../services/data.service';

const { RangePicker } = DatePicker;

export default class Reports extends React.Component {

  state = {
    dataSource: [],
    mapPosition: [-2.1494119,-79.9025117],
    mapZoom: 12,
    variables: [],
    granjas: [],
    piscinas: [],
    granjaId: null,
    piscinaId: null,
    fechaInicio: null,
    fechaFin: null,
  }

  componentDidMount() {
    DataService.getGranjas().then(granjas => this.setState({granjas}));
    DataService.getVariables().then(variables => this.setState({variables}));
  }

  centerMap(granjaId, piscinaId) {
    let mapPosition = [-2.1494119,-79.9025117];
    let mapZoom = 12;

    if (piscinaId) {
      const piscina = this.state.piscinas.find(p => p.id === piscinaId)
      mapPosition = [piscina.latitud, piscina.longitud];
      mapZoom = 16;
    } else if (granjaId) {
      const granja = this.state.granjas.find(g => g.id === granjaId)
      mapPosition = [granja.latitud, granja.longitud];
      mapZoom = 14;
    }
    this.setState({mapPosition: mapPosition, mapZoom: mapZoom})
  }

  handleChangeGranja = granjaId => {
    if (granjaId) {
      DataService.getPiscinas(granjaId).then(piscinas => this.setState({piscinas, granjaId}));
    } else {
      this.setState({piscinas: []});
    }
    this.setState({piscinaId: null});
    this.centerMap(granjaId, this.state.piscinaId);
  }

  handleChangePiscina = piscinaId => {
    this.setState({piscinaId});
    this.centerMap(this.state.granjaId, piscinaId);
  }

  handleChangeFecha = (_, fechas) => {
    this.setState({fechaInicio: fechas[0], fechaFin: fechas[1]});
  }

  handleSearch = e => {
    if (e)
      e.preventDefault();

    let params = {
      granja: this.state.granjaId,
      fechaInicio: this.state.fechaInicio,
      fechaFin: this.state.fechaFin,
    }

    if (this.state.piscinaId)
      params.piscina = this.state.piscinaId;

    DataService.getMuestras(params).then(
      muestras => {

        let dataSource = []

        muestras.forEach(m => {
          let muestra = {
            key: m.id,
            fecha: m.fecha,
          };

          m.mediciones.forEach(med => muestra[med.variable] = med.valor);

          dataSource.push(muestra);
        });

        this.setState({dataSource: dataSource})
      },
      error => {
        // todo
      }
    );
  }

  handleDelete = key => {
    DataService.deleteMuestra(key).then(
      () => {
        message.error("Eliminado");
        this.handleSearch();
      },
      error => {}
    );
  }

  handleAlert = key => {
    message.loading({content: 'Enviando...', key: key})
    DataService.alertarMuestra(key).then(
      response => {
        message.warning({content: response.msg, key: key});
      },
      error => {
        message.error({content: 'Error enviando la alerta', key: key});
      }
    );
  }

  render() {
    let columns = [
      {
        title: 'Fecha',
        dataIndex: 'fecha',
        key: 'fecha',
      },
    ];

    this.state.variables.forEach(v => columns.push({
      title: v.nombre,
      dataIndex: v.id,
      key: v.id,
    }))

    columns.push(
      {
        title: '',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <>
            <Space size="middle">
              <Popconfirm title="Seguro de alertar?" onConfirm={() => this.handleAlert(record.key)}>
                <Button>Alertar</Button>
              </Popconfirm>
              <Popconfirm title="Seguro de eliminar?" onConfirm={() => this.handleDelete(record.key)}>
                <Button danger>Eliminar</Button>
              </Popconfirm>
            </Space>
            </>
          ) : null,
      }
    )

    return (
      <>
      <Form layout="inline" onSubmit={this.handleSearch}>
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
        <Form.Item label="Piscina">
          <Select
            style={{ width: 200 }}
            showSearch
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={this.handleChangePiscina}
            value={this.state.piscinaId}
          >
            <Select.Option key={0} value={null}>Todas</Select.Option>)}
            {this.state.piscinas.map(p => <Select.Option key={p.id} value={p.id}>{p.nombre}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item label="Fecha">
          <RangePicker onChange={this.handleChangeFecha} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={this.handleSearch}
            disabled={!this.state.granjaId || !this.state.fechaInicio || !this.state.fechaFin}>
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
          <Map center={this.state.mapPosition} zoom={this.state.mapZoom}>
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
