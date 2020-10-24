import './index.scss';
import osjs from 'osjs';
import {name as applicationName} from './metadata.json';

import {h, app} from 'hyperapp';

// Our launcher
const register = (core, args, options, metadata) => {
  // Create a new Application instance
  const proc = core.make('osjs/application', {args, options, metadata});

  // Create  a new Window instance
  proc.createWindow({
    id: 'JupyterWindow',
    title: metadata.title.en_EN,
    dimension: {width: 400, height: 400},
    position: {left: 700, top: 200}
  })
    .on('destroy', () => proc.destroy())
    .render(($content, win) => {
      // For auditing, add our process and window id to iframe URL
      const suffix = `?pid=${proc.pid}&wid=${win.wid}`;

      const iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.src = proc.resource('/window') + suffix;
      iframe.setAttribute('border', '0');

      // Bind window events to iframe
      win.on('blur', () => iframe.contentWindow.blur());
      win.on('focus', () => iframe.contentWindow.focus());

      $content.appendChild(iframe); 
    });

  return proc;
};

// Creates the internal callback function when OS.js launches an application
osjs.register(applicationName, register);
