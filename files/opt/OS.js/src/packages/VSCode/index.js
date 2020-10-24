import './index.scss';
import osjs from 'osjs';
import {name as applicationName} from './metadata.json';

import {h, app} from 'hyperapp';

const createView = (state, actions) => h('iframe', {src: "./jupyter"}, []);

const createApp = ($content, win) => {
};

// Our launcher
const register = (core, args, options, metadata) => {
  // Create a new Application instance
  const proc = core.make('osjs/application', {args, options, metadata});

  // Create  a new Window instance
  proc.createWindow({
    id: 'VSCodeWindow',
    title: metadata.title.en_EN,
    dimension: {width: 400, height: 400},
    position: {left: 700, top: 200}
  })
    .on('destroy', () => proc.destroy())
    .render(($content, win) => {
      // Add our process and window id to iframe URL
      const suffix = `?pid=${proc.pid}&wid=${win.wid}`;

      // Create an iframe
      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.src = proc.resource('/window/') + suffix;
      iframe.setAttribute('border', '0');

      // Bind window events to iframe
      win.on('blur', () => iframe.contentWindow.blur());
      win.on('focus', () => iframe.contentWindow.focus());

      /*
// Create an even for posting messages to an iframe (for easy reuse)
win.on('iframe:post', msg => iframe.contentWindow.postMessage(msg, window.location.href));

// Listen for messages from iframe
win.on('iframe:get', msg => {
// We should get "Ping" here
console.warn('Message from Iframe', msg);

// In this case we just send "Pong" back
win.emit('iframe:post', 'Pong');
});
  */

      $content.appendChild(iframe); 
});

  // Creates a new WebSocket connection (see server.js)
  //const sock = proc.socket('/socket');
  //sock.on('message', (...args) => console.log(args))
  //sock.on('open', () => sock.send('Ping'));

  // Use the internally core bound websocket
  //proc.on('ws:message', (...args) => console.log(args))
  //proc.send('Ping')

  // Creates a HTTP call (see server.js)
  proc.request('/test', {method: 'post'})
    .then(response => console.log(response));

  return proc;
};

// Creates the internal callback function when OS.js launches an application
osjs.register(applicationName, register);
