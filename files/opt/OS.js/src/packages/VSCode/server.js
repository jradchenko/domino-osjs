const { createProxyMiddleware } = require('http-proxy-middleware');
const { spawn } = require('child_process');

module.exports = (core, proc) => {
  var process = null;
  var port = 8890;

  const stop = () => {
    if (process) {
      process.kill();
    }
  };

  return {
    init: async () => {
      process = spawn(
        "bash",
        [
          "/var/opt/workspaces/vscode/start",
          port
        ], {
          stdio: ['inherit', 'inherit', 'inherit']         
        }
      );
    },

    start: () => {
    },

    destroy: () => {
      stop();
    },

    // When using an internally bound websocket, messages comes here
    onmessage: (ws, respond, args) => {
    }
  };
};
