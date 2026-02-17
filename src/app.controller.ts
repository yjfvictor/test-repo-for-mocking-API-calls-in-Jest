/**
 * @file app.controller.ts
 * @brief Root controller for health and info endpoints.
 * @details Handles basic HTTP endpoints such as health check and
 * root path. Delegates business logic to AppService.
 * @author Victor Yeh
 * @date 2026-02-17
 * @copyright MIT Licence
 */

import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

/**
 * @class AppController
 * @type class
 * @brief Root HTTP controller.
 * @details Exposes GET / and GET /health for application status.
 */
@Controller()
export class AppController {
  /**
   * @var appService
   * @type AppService
   * @brief Injected application service.
   * @details Provides health and info data for controller endpoints.
   */
  constructor(private readonly appService: AppService) {}

  /**
   * @fn getHello
   * @type function
   * @brief Returns a welcome message.
   * @details Handles GET / and returns a string from the service.
   * @returns {string} Welcome message.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * @fn getHealth
   * @type function
   * @brief Returns application health status.
   * @details Handles GET /health for monitoring and load balancers.
   * @returns {object} Health status object.
   */
  @Get("health")
  getHealth(): { status: string; timestamp: string } {
    return this.appService.getHealth();
  }
}
