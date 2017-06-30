import Config from '../services/Config';
import socketIO from 'socket.io-client';
import sailsIO from 'sails.io.js';

const IO = sailsIO(socketIO);

IO.sails.url = Config.server.url;
IO.sails.useCORSRouteToGetCookie = false;

export default IO;
