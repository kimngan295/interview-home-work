# Interview Homework Backend API Documentation

This API allows users to interact with a blog-like application where they can manage users, posts, and comments. Below is a detailed description of the endpoints for user authentication, post management, and comment functionality.

## **Base URL**
https://interview-home-work-backend.onrender.com


## **User Authentication API**

| **Action**     | **Endpoint**                                                      | **Method** | **Description**                              |
|----------------|-------------------------------------------------------------------|------------|----------------------------------------------|
| Sign In        | `/users/sign-in`                                                  | `POST`     | Authenticates a user and returns an access token. |
| Sign Up        | `/users/sign-up`                                                  | `POST`     | Registers a new user.                       |
| Logout         | `/users/logout`                                                   | `POST`     | Logs out the current user and invalidates the session. |
| Refresh Token  | `/users/refresh-token`                                            | `POST`     | Generates a new access token using a refresh token. |
| Get User Details | `/users/details/:userID`                                        | `GET`      | Fetches details of a specific user by user ID. |

---

## **Posts API**

| **Action**        | **Endpoint**                                                     | **Method** | **Description**                              |
|-------------------|------------------------------------------------------------------|------------|----------------------------------------------|
| Get All Posts     | `/posts/?page=&limit=`                                           | `GET`      | Retrieves a paginated list of all posts.     |
| Get Post Details  | `/posts/:postID`                                                 | `GET`      | Retrieves the details of a specific post by post ID. |
| Search Post       | `/posts/search?title=`                                           | `GET`      | Searches for posts by title.                |
| Create New Post   | `/posts/new-post`                                                | `POST`     | Creates a new post.                         |
| Update Post       | `/posts/update-post/:postID`                                     | `PUT`      | Updates an existing post.                   |
| Delete Post       | `/posts/delete-post/:postID`                                     | `DELETE`   | Deletes a specific post by post ID.         |

---

## **Comments API**

| **Action**        | **Endpoint**                                                     | **Method** | **Description**                              |
|-------------------|------------------------------------------------------------------|------------|----------------------------------------------|
| Create New Comment| `/comments/:postID/comment`                                      | `POST`     | Adds a new comment to a specific post.       |
| Update Comment    | `/comments/:commentID`                                           | `PUT`      | Updates an existing comment.                |
| Delete Comment    | `/comments/delete-comment/:commentID`                            | `DELETE`   | Deletes a specific comment by comment ID.    |

---

## **Usage**

1. **Authentication**: Most endpoints require authentication. Ensure that you provide the token received from the `sign-in` endpoint in the request headers for secured routes.
   
   Example:
   ```bash
   Authorization: Bearer <your-token>
