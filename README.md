# NodeJS Tutorial

## 01tut

1. Node runs on a server - not in a browser (backend not frontend)
2. Console is the terminal window (not in the browser)
   > If from file (server.js for example) we can run `node server` without the ".js" extension
3. Global object instead of window object
4. Has Common Core modules (oprating system, file system etc.)
5. CommonJS modules instead of ES6 modules
6. Missing some JS APIs like fetch

## 02tut

1. Node is asynchronous
2. `process` is already available; no need to import
3. Use `process.exit()` if needed only
4. Use `path` for cleaner concatenation of paths
5. `writeFile` 2nd parameter `utf8` is not necessary since it is default
6. We can use callbacks so our processes are in order (see WRITEFILE, APPENDFILE & RENAME section)
7. Use async await to avoid "callback hell"
8. `unlink` is delete
9. Sometimes we need to get data part by part if it is too large (see stream.js)
10. We can listen using `.on('data')` or a more efficient way is to "pipe" readable stream to write stream using `rs.pipe(ws)` (rs and ws as example)
