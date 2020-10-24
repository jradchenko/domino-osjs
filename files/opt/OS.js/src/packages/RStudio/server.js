const { createProxyMiddleware } = require('http-proxy-middleware');
const { spawn } = require('child_process');

// Methods OS.js server requires
module.exports = (core, proc) => {
  /*var process = null;

  const stop = () => {
    if (process) {
      process.kill();
    }
  };*/

  return {
    // When server initializes
    init: async () => {
      /*proc.on('create-window', (win, proc) => {
        console.log("Created window");
        console.log(win);
        console.log(proc);
        stop();
        const process = spawn(
          "sh",
          [
            "/var/opt/workspaces/rstudio/start"
          ]
        );
      });

      proc.on('destroy-window', (win, proc) => {
        console.log("destroy");
        stop();
      });*/
    },

    // When server starts
    start: () => {
    },

    // When server goes down
    destroy: () => {
    },

    // When using an internally bound websocket, messages comes here
    onmessage: (ws, respond, args) => {
      respond('Pong');
    }
  };
};
