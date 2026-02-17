/**
 * @file api-data.service.spec.ts
 * @brief Unit tests for ApiDataService with mocked API calls.
 * @details Demonstrates jest.fn() and jest.mock() to mock the axios client
 * and verify that ApiDataService correctly fetches and handles API responses.
 * Uses jest.fn() for mock functions and dependency injection of a mock client.
 * Tests success and error paths without making real network requests.
 * @author Victor Yeh
 * @date 2026-02-17
 * @copyright MIT Licence
 */

import { ApiDataService } from "../src/api-data/api-data.service";
import { HttpException } from "@nestjs/common";
import type { ApiPost } from "../src/api-data/interfaces/api-post.interface";
import type { AxiosInstance } from "axios";

/**
 * @var mockApiPost
 * @type ApiPost
 * @brief Sample post data for mock responses.
 * @details Used as return value for mocked HTTP responses.
 */
const mockApiPost: ApiPost = {
  userId: 1,
  id: 1,
  title: "Test Post Title",
  body: "Test post body content",
};

/**
 * @var mockGet
 * @type jest.Mock
 * @brief Mock function for axios get method.
 * @details Replaces the real get method to avoid network calls.
 */
const mockGet = jest.fn();

/**
 * @var mockHttpClient
 * @type AxiosInstance
 * @brief Mock axios instance with jest.fn() for get.
 * @details Passed to ApiDataService constructor for dependency injection.
 */
const mockHttpClient: AxiosInstance = {
  get: mockGet,
} as unknown as AxiosInstance;

describe("ApiDataService", () => {
  let service: ApiDataService;

  beforeEach(async () => {
    jest.clearAllMocks();
    service = ApiDataService.createWithClient(mockHttpClient);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("fetchPostById", () => {
    it("should fetch and return a post when the API responds successfully", async () => {
      mockGet.mockResolvedValue({
        data: mockApiPost,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });

      const result: ApiPost = await service.fetchPostById(1);

      expect(mockGet).toHaveBeenCalledTimes(1);
      expect(mockGet).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts/1",
      );
      expect(result).toEqual(mockApiPost);
      expect(result.title).toBe("Test Post Title");
      expect(result.body).toBe("Test post body content");
    });

    it("should throw HttpException when the API request fails", async () => {
      const errorMessage: string = "Network Error";
      mockGet.mockRejectedValue(new Error(errorMessage));

      await expect(service.fetchPostById(999)).rejects.toThrow(HttpException);
      await expect(service.fetchPostById(999)).rejects.toThrow(
        `Failed to fetch post 999: ${errorMessage}`,
      );

      expect(mockGet).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts/999",
      );
    });
  });

  describe("fetchAllPosts", () => {
    it("should fetch and return all posts when the API responds successfully", async () => {
      const mockPosts: ApiPost[] = [mockApiPost, { ...mockApiPost, id: 2 }];
      mockGet.mockResolvedValue({
        data: mockPosts,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });

      const result: ApiPost[] = await service.fetchAllPosts();

      expect(mockGet).toHaveBeenCalledTimes(1);
      expect(mockGet).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts",
      );
      expect(result).toEqual(mockPosts);
      expect(result).toHaveLength(2);
    });

    it("should throw HttpException when fetchAllPosts fails", async () => {
      mockGet.mockRejectedValue(new Error("Connection refused"));

      await expect(service.fetchAllPosts()).rejects.toThrow(HttpException);
      await expect(service.fetchAllPosts()).rejects.toThrow(
        "Failed to fetch posts: Connection refused",
      );
    });
  });
});
