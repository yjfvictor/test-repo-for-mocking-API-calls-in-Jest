/**
 * @file api-data.module.ts
 * @brief Module for API data fetching and display.
 * @details Registers ApiDataController and ApiDataService. Service uses
 * axios directly for outgoing HTTP requests to external APIs.
 * @author Victor Yeh
 * @date 2026-02-17
 * @copyright MIT Licence
 */

import { Module } from "@nestjs/common";
import { ApiDataController } from "./api-data.controller";
import { ApiDataService } from "./api-data.service";

/**
 * @class ApiDataModule
 * @type class
 * @brief Module encapsulating API data fetching functionality.
 * @details Provides endpoints to fetch and display data from external APIs.
 */
@Module({
  controllers: [ApiDataController],
  providers: [ApiDataService],
  exports: [ApiDataService],
})
export class ApiDataModule {}
