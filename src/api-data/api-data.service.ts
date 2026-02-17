/**
 * @file api-data.service.ts
 * @brief Service that fetches and returns data from external APIs.
 * @details Uses axios to perform GET requests to JSONPlaceholder API.
 * Provides methods to fetch a single post or multiple posts. Designed
 * to be mockable in Jest tests via jest.mock('axios').
 * @author Victor Yeh
 * @date 2026-02-17
 * @copyright MIT Licence
 */

import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios, { type AxiosInstance } from "axios";
import type { ApiPost } from "./interfaces/api-post.interface";

/**
 * @var DEFAULT_API_BASE_URL
 * @type string
 * @brief Default base URL for the external API.
 * @details JSONPlaceholder provides fake REST API for testing.
 */
const DEFAULT_API_BASE_URL: string = "https://jsonplaceholder.typicode.com";

/**
 * @class ApiDataService
 * @type class
 * @brief Service for fetching post data from external REST API.
 * @details Uses axios instance for HTTP GET requests. Handles errors
 * and returns typed ApiPost objects. Axios can be mocked in tests.
 */
@Injectable()
export class ApiDataService {
  /**
   * @var apiBaseUrl
   * @type string
   * @brief Base URL for the external API.
   * @details Configurable via constructor or environment. Used as prefix for all requests.
   */
  private readonly apiBaseUrl: string;

  /**
   * @var httpClient
   * @type AxiosInstance
   * @brief Axios instance for HTTP requests.
   * @details Used for GET requests. Can be overridden in tests.
   */
  private readonly httpClient: AxiosInstance;

  /**
   * @fn constructor
   * @type function
   * @brief Constructs the ApiDataService.
   * @details Creates axios instance and sets apiBaseUrl from env. No constructor
   * parameters for NestJS DI. For testing, use createWithClient().
   */
  constructor() {
    this.apiBaseUrl = process.env["API_BASE_URL"] ?? DEFAULT_API_BASE_URL;
    this.httpClient = axios.create({ timeout: 5000 });
  }

  /**
   * @fn createWithClient
   * @type function
   * @brief Creates an ApiDataService with a custom HTTP client (for testing).
   * @details Factory to inject a mock axios instance. Bypasses constructor for tests.
   * @param {AxiosInstance} client - HTTP client to use (e.g. jest.fn() mock).
   * @param {string} [baseUrl] - Optional base URL override.
   * @returns {ApiDataService} Service instance using the provided client.
   */
  static createWithClient(
    client: AxiosInstance,
    baseUrl?: string,
  ): ApiDataService {
    const instance: ApiDataService = Object.create(ApiDataService.prototype);
    const mutable = instance as unknown as {
      apiBaseUrl: string;
      httpClient: AxiosInstance;
    };
    mutable.apiBaseUrl =
      baseUrl ?? process.env["API_BASE_URL"] ?? DEFAULT_API_BASE_URL;
    mutable.httpClient = client;
    return instance;
  }

  /**
   * @fn fetchPostById
   * @type function
   * @brief Fetches a single post by ID from the external API.
   * @details Performs GET request to /posts/{id}. Throws HttpException
   * on non-2xx responses or network errors.
   * @param {number} postId - The post identifier (1-based).
   * @returns {Promise<ApiPost>} The fetched post object.
   * @throws {HttpException} When the request fails or returns an error status.
   */
  async fetchPostById(postId: number): Promise<ApiPost> {
    const url: string = `${this.apiBaseUrl}/posts/${postId}`;
    try {
      const response = await this.httpClient.get<ApiPost>(url);
      return response.data;
    } catch (error: unknown) {
      const message: string =
        error instanceof Error ? error.message : "Unknown error fetching post";
      throw new HttpException(
        `Failed to fetch post ${postId}: ${message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  /**
   * @fn fetchAllPosts
   * @type function
   * @brief Fetches all posts from the external API.
   * @details Performs GET request to /posts. Returns array of ApiPost.
   * @returns {Promise<ApiPost[]>} Array of post objects.
   * @throws {HttpException} When the request fails.
   */
  async fetchAllPosts(): Promise<ApiPost[]> {
    const url: string = `${this.apiBaseUrl}/posts`;
    try {
      const response = await this.httpClient.get<ApiPost[]>(url);
      return response.data;
    } catch (error: unknown) {
      const message: string =
        error instanceof Error ? error.message : "Unknown error fetching posts";
      throw new HttpException(
        `Failed to fetch posts: ${message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
