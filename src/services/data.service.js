import { handleResponse } from '../helpers/handle-response';
import { authHeader } from '../helpers/auth-header';
import config from './config';

export default new class DataService {

  get(url, params) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    let queryString = '';

    if (params) {
      queryString = '?' + (new URLSearchParams(params)).toString();
    }

    return fetch(`${config.apiUrl}/${url}/${queryString}`, requestOptions)
      .then(handleResponse);
  }

  post(url, params) {
    const requestOptions = {
      method: 'POST',
      headers: {...authHeader(), 'Content-Type': 'application/json'},
      body: JSON.stringify(params),
    };

    return fetch(`${config.apiUrl}/${url}/`, requestOptions)
      .then(handleResponse);
  }

  delete(url, id) {
    const requestOptions = { method: 'DELETE', headers: authHeader() };
    return fetch(`${config.apiUrl}/${url}/${id}/`, requestOptions)
  }

  getVariables() {
    return this.get('variables')
  }

  getGranjas() {
    return this.get('granjas')
  }

  getPiscinas(granja) {
    return this.get('piscinas', {granja: granja})
  }

  getMuestras(params) {
    return this.get('muestras', params)
  }

  postMuestra(params) {
    return this.post('muestras', params)
  }

  deleteMuestra(muestraId) {
    return this.delete('muestras', muestraId)
  }

  alertarMuestra(muestraId) {
    return this.post(`muestras/${muestraId}/alertar`)
  }

}();