import React from 'react';
import { Form, Input, Button, Alert } from 'antd';

import AuthenticationService from '../services/authentication.service';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default class Login extends React.Component {

  state = {
      message: '',
  }

  onFinish = values => {
    AuthenticationService.login(values.username, values.password).then(
      () => {
        console.log('Success:', values);
      },
      error => {
        this.setState({message: error})
        console.log(this.state)
      }
    );
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render () {

    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label="Usuario"
          name="username"
          rules={[{ required: true, message: 'Ingresu su nombre de usuario!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Ingrese su contraseña!' }]}
        >
          <Input.Password />
        </Form.Item>

        {this.state.message &&
        <Form.Item {...tailLayout}>
              <Alert message={this.state.message} type="error"></Alert>
        </Form.Item>
        }

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Iniciar sesión
          </Button>
        </Form.Item>
      </Form>
    );
  }
};