import escapeRegExp from 'lodash/escapeRegExp';
import { API_PATHS, PROXY_ENTRY } from '../constants';

const { server: API_PATH } = API_PATHS;

export default body => body.replace(new RegExp(escapeRegExp(API_PATH), 'g'), PROXY_ENTRY);
