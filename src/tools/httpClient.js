import axios from 'axios';
import Qs from 'qs';
import prepareApiBody from '../misc/prepareApiBody';
import { API_SERVER } from '../constants';

const instance = axios.create({
  baseURL: API_SERVER,
  paramsSerializer(params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
  transformResponse: [(rawData, headers) => {
    let data;
    if (ENV === 'server') data = prepareApiBody(rawData);
    else data = rawData;
    if (headers['content-type'].indexOf('application/json') < 0) return data;
    return JSON.parse(data);
  }],
});

export default instance;
