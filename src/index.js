const http = require('http');
const app = require('./app');
const logger = require('./config/logger');
const config = require('./config/config');
let server = http.createServer(app);

// 종료시 로깅, 후처리를 하기 위해 사용
// 추후에 무중단 배포 등 용도로 사용 가능
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// 로그를 남기기 위한 에러 핸들러 함수 정의
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

// 핸들링 거부, 예상치 못한 에러 이벤트 발생시에 핸들러 호출
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// 시스템 종료 이벤트 수신
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

const port = parseInt(config.port) || 8080;
const host = process.env.HOST || '0.0.0.0';
app.set('port', port);

server.listen(port);
console.log('Running on http://' + host + ':' + port);
