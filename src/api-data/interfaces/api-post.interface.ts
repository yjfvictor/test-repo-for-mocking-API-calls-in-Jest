/**
 * @file api-post.interface.ts
 * @brief Interface for post data from external API.
 * @details Defines the shape of post objects returned by JSONPlaceholder
 * or similar REST APIs. Used for type safety when fetching and displaying.
 * @author Victor Yeh
 * @date 2026-02-17
 * @copyright MIT Licence
 */

/**
 * @interface ApiPost
 * @type interface
 * @brief Structure of a post from the external API.
 * @details Represents a blog post with id, userId, title, and body.
 * Aligns with JSONPlaceholder typicode.com response format.
 */
export interface ApiPost {
  /**
   * @var userId
   * @type number
   * @brief Identifier of the post author.
   * @details Unique user ID from the API.
   */
  userId: number;

  /**
   * @var id
   * @type number
   * @brief Unique identifier of the post.
   * @details Primary key for the post resource.
   */
  id: number;

  /**
   * @var title
   * @type string
   * @brief Title of the post.
   * @details Short descriptive heading.
   */
  title: string;

  /**
   * @var body
   * @type string
   * @brief Full body content of the post.
   * @details Main text content.
   */
  body: string;
}
