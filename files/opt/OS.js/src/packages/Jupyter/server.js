const { createProxyMiddleware } = require('http-proxy-middleware');
const { spawn, exec } = require('child_process');

module.exports = (core, proc) => {
  var process = null;
  var port = 8889;

  const stop = () => {
    if (process) {
      exec(`/opt/conda/bin/jupyter notebook stop ${port}`, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    }
  };

  return {
    init: async () => {
      process = spawn(
        "bash",
        [
          "/var/opt/workspaces/jupyter/start",
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
