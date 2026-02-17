/**
 * @file app.module.ts
 * @brief Root application module.
 * @details Defines the root NestJS module that imports and registers
 * all feature modules. Aggregates AppController and AppService, plus
 * the ApiDataModule for API fetching functionality.
 * @author Victor Yeh
 * @date 2026-02-17
 * @copyright MIT Licence
 */

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ApiDataModule } from "./api-data/api-data.module";

/**
 * @class AppModule
 * @type class
 * @brief Root module of the NestJS application.
 * @details Composes all application modules. Imports ApiDataModule for
 * API data fetching and display functionality.
 */
@Module({
  imports: [ApiDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
