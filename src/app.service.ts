/**
 * @file app.service.ts
 * @brief Root application service.
 * @details Provides basic application logic such as health checks and
 * welcome messages. Used by AppController.
 * @author Victor Yeh
 * @date 2026-02-17
 * @copyright MIT Licence
 */

import { Injectable } from "@nestjs/common";

/**
 * @class AppService
 * @type class
 * @brief Root service for application-level logic.
 * @details Contains methods for health status and root endpoint responses.
 */
@Injectable()
export class AppService {
  /**
   * @fn getHello
   * @type function
   * @brief Returns a welcome message.
   * @details Returns a static string for the root endpoint.
   * @returns {string} Welcome message.
   */
  getHello(): string {
    return "Hello World!";
  }

  /**
   * @fn getHealth
   * @type function
   * @brief Returns current health status.
   * @details Constructs a health object with status and ISO 8601 timestamp.
   * @returns {{ status: string; timestamp: string }} Health object.
   */
  getHealth(): { status: string; timestamp: string } {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
