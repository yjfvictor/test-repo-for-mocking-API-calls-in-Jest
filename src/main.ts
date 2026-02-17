/**
 * @file main.ts
 * @brief Application entry point and NestJS bootstrap.
 * @details Creates and starts the NestJS application. Configures global
 * settings such as CORS and listens on the configured port (default 3000).
 * @author Victor Yeh
 * @date 2026-02-17
 * @copyright MIT Licence
 */

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

/**
 * @fn bootstrap
 * @type function
 * @brief Bootstraps and starts the NestJS application.
 * @details Asynchronously creates the NestJS application instance from
 * AppModule, enables CORS for cross-origin requests, and listens on the
 * specified port. Uses PORT environment variable or defaults to 3000.
 * @returns {Promise<void>} Resolves when the server is listening.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port: number = parseInt(process.env["PORT"] ?? "3000", 10);
  await app.listen(port);
}

bootstrap();
