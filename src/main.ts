import * as os from 'os';

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ClusterService } from './cluster.service';

/**
 *     "start": "NODE_OPTIONS=\"--max-old-space-size=2048\" UV_THREADPOOL_SIZE=300 nest start",

 */
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false,maxRequestsPerSocket: 50000,
      connectionTimeout:60000 })
  );

  const server: any = app.getHttpAdapter().getInstance();

  // Increase keep-alive timeout and backlog to avoid dropped connections
//  server.keepAliveTimeout = 60000;  // 60s keep-alive
 // server.headersTimeout = 65000;    // Keep request headers open
  //server.maxRequestsPerSocket = 5000; // Don't prematurely close sockets
  server.maxConnections = 10000; // Max number of concurrent connections
  server.backlog = 10000; // Max number of pending connections

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
//ClusterService.clusterize(bootstrap);

bootstrap();