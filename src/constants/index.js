
const PROXY_ENTRY = '/api/'

const API_SERVERS = {
  server: 'http://my-lib.ru/',
  client: '/'
}

const API_PATHS = {
  server: `${API_SERVERS.server}api/`,
  client: PROXY_ENTRY
}

const API_PATH = API_PATHS[ENV]
const API_SERVER = API_SERVERS[ENV]

export {
  API_PATHS,
  API_SERVERS,
  API_PATH,
  API_SERVER,
  PROXY_ENTRY
}