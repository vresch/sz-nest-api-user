import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as rateLimit from 'express-rate-limit';
// --------------------------------------------------
import { Logger, chalk, logo } from './logger';
import { AppModule } from './app.module';
import { ServerConfig, DocConfig } from './config';
// --------------------------------------------------
const logger = new Logger('main');
// --------------------------------------------------

process.on('uncaughtException', (error) => {
  logger.error(error);
});

bootstrap()
  .then(() => {
    serverIsRunning();
  })
  .catch((error) => {
    logger.error(error);
  });

async function bootstrap() {
  logger.method('bootstrap');
  const app = await NestFactory.create(AppModule);
  setUp(app);
  await app.listen(ServerConfig.port);
}

function setUp(app) {
  app.setGlobalPrefix(ServerConfig.globalPrefix);
  setUpSecurity(app);
  setUpDocs(app);
}

function setUpSecurity(app) {
  app.enableCors();
  // Security Brute-force protection
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
}

function setUpDocs(app) {
  logger.method('setUpDocs');
  const options = new DocumentBuilder()
    .setTitle(ServerConfig.appName)
    .setDescription(`The ${ServerConfig.appName} API project`)
    .setVersion('1.0')
    .addBearerAuth()
    .setSchemes('http', 'https')
    .setBasePath(ServerConfig.globalPrefix)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(DocConfig.prefix, app, document);
}

function serverIsRunning() {
  logo();
  logger.log(
    `server ${ServerConfig.appName} is running on ${chalk.yellow(
      `http://${ServerConfig.host}:${ServerConfig.port}`,
    )}`,
  );
  logger.log(
    `documentation: ${chalk.yellow(
      `http://${ServerConfig.host}:${ServerConfig.port}/${DocConfig.prefix}`,
    )}`,
  );
}
