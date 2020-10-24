FROM docker.io/dominodatalab/base:Ubuntu18_DAD_Py3.6_R3.6_20200508
RUN cd /opt && \
  git clone https://github.com/os-js/OS.js.git && \
  cd OS.js && \
  sudo npm install && \
  sudo npm update && \
  sudo npm install --save --production @osjs/xterm-application && \
  sudo npm install --save --production osjs-browser-application && \
  sudo npm run package:discover && \
  sudo npm rebuild node-sass && \
  sudo npm run build
COPY files/ /
RUN cd /opt/OS.js/src/packages/Jupyter && npm install
RUN cd /opt/OS.js && npm install --save http-proxy-middleware
RUN cd /opt/OS.js && npm run package:discover
CMD sudo /etc/init.d/ssh start && cd /opt/OS.js && npm run serve

ENV DOMINO_NOTEBOOK_PREFIX=/apps/Jupyter/window
