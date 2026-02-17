/**
 * @file api-data.controller.ts
 * @brief Controller that displays API-fetched data via HTTP endpoints.
 * @details Exposes GET /api/posts and GET /api/posts/:id to return data
 * fetched by ApiDataService. Serves as the "display" layer for the component.
 * @author Victor Yeh
 * @date 2026-02-17
 * @copyright MIT Licence
 */

import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ApiDataService } from "./api-data.service";
import type { ApiPost } from "./interfaces/api-post.interface";

/**
 * @class ApiDataController
 * @type class
 * @brief HTTP controller for API data endpoints.
 * @details Handles GET requests to fetch and return post data from external API.
 */
@Controller("api")
export class ApiDataController {
  /**
   * @var apiDataService
   * @type ApiDataService
   * @brief Injected service for fetching API data.
   * @details Used to retrieve posts from external API.
   */
  constructor(private readonly apiDataService: ApiDataService) {}

  /**
   * @fn getAllPosts
   * @type function
   * @brief Returns all posts from the external API.
   * @details Handles GET /api/posts. Fetches and returns array of posts.
   * @returns {Promise<ApiPost[]>} Array of post objects.
   */
  @Get("posts")
  async getAllPosts(): Promise<ApiPost[]> {
    return this.apiDataService.fetchAllPosts();
  }

  /**
   * @fn getPostById
   * @type function
   * @brief Returns a single post by ID.
   * @details Handles GET /api/posts/:id. Parses id as integer and fetches post.
   * @param {number} id - Post ID from URL path.
   * @returns {Promise<ApiPost>} The requested post object.
   */
  @Get("posts/:id")
  async getPostById(@Param("id", ParseIntPipe) id: number): Promise<ApiPost> {
    return this.apiDataService.fetchPostById(id);
  }
}
