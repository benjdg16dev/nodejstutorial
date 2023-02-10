# JWT

- Given after the initial authentication

## Access Token

- Short Time

## Refresh Token

- Long Time

## Hazards

- XSS: Cross-Site Scripting
- CSRF: CS Request Forgery

## Access Token

- Sent as JSON
  - Our API will send and receive Access Tokens as JSON data
- Client stores in memory
  - To avoid previously mentioned risk it is recommended for Front-End client applications to only stores Access Tokens in memory so they will be automatically lost when the app is closed
- Do NOT store in local storage or cookie
  - If stores in JavaScript then a "hacker" can also access it

## Refresh Token

- Sent as httpOnly cookie
  - Our API will issue refresh tokens in an httpOnly cookie. This type of cookie is not accessible in JavaScript
- Not accessible via JavaScript
- Must have expiry at some point
- Refresh tokens should not have the ability to issue new refresh tokens because that will grant indefinite access if it falls into the wrong hands

## Overall Access Token Process

- Issued at Authorization
- Client uses for API Access until expires
- Verified with Middleware
  - Everytime when the access token is used for request
- New token issued at Refresh request

## Overall Refresh Token Process

- Issued also at Authorization
- Client uses to request new Access Token
- Verified with endpoint & database
  - Storing in database allows us to terminate the refresh token early if the user logs out
- Must be allowed to expire or logout

## Using NodeJS to generate a sample token

- `node` on terminal
  - This will open Node Terminal
- Use crypto core module from Node
- `require(crypto).randomBytes(64).toString('hex')`

## GitIgnore

- Do not send .env file to github
- Keep in DEV Environment
- If hosted then host should have a way to store this file

## Front-end

- On `fetch` we need to include `credentials: 'include'`
  - This will be blocked in the browser because the value of `'Access-Control-Allow-Credentials'` is `''`. It needs to be set to `true`. Look into credentials.js in middleware folder.

## 11tut Issues

- authController.js
  - When we add these options for the `res.cookie()`: `sameSite: 'None'` & `secure: true` it gets an error on Thunder Client
