FROM docker.io/dominodatalab/base:Ubuntu18_DAD_Py3.6_R3.6_20200508

RUN cd /opt && \
  git clone https://github.com/os-js/OS.js.git && \
  cd OS.js && \
  npm install && \
  npm update && \
  npm install --save --production @osjs/xterm-application && \
  npm install --save --production osjs-browser-application
RUN cd /tmp && git clone https://github.com/jradchenko/domino-osjs.git && cp -R domino-osjs/files/* /
RUN cd /opt/OS.js/src/packages/Jupyter && npm install && npm run build
RUN cd /opt/OS.js/src/packages/VSCode && npm install && npm run build
RUN cd /opt/OS.js && \
  npm install --save http-proxy-middleware && \
  npm run package:discover && \
  npm rebuild node-sass && \
  npm run build
  
CMD sudo /etc/init.d/ssh start && cd /opt/OS.js && npm run serve

ENV DOMINO_NOTEBOOK_PREFIX=/apps/Jupyter/window
