import { API_PATHS, PROXY_ENTRY } from '../constants';
import escapeRegExp from 'lodash/escapeRegExp';

const { server: API_PATH } = API_PATHS;

export default (body) => {
  return body.replace(new RegExp(escapeRegExp(API_PATH), 'g'), PROXY_ENTRY)
}