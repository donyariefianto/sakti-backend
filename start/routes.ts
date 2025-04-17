/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import SwaggerUI from 'swagger-ui'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Serve Swagger UI
router.get('/docs', async ({ response }) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Swagger UI</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
    <script>
      window.onload = function() {
        SwaggerUIBundle({
          url: 'https://petstore.swagger.io/v2/swagger.json',
          dom_id: '#swagger-ui',
        });
      };
    </script>
  </body>
  </html>
  `
  response.header('Content-Type', 'text/html')
  return html
})

router
  .group(() => {
    router.get('google', '#controllers/authentication_controller.redirectToGoogle')
    router.get('google/callback', '#controllers/authentication_controller.handleGoogleCallback')
    router.post('send-otp', '#controllers/authentication_controller.sendOTP')
    router.post('verify-otp', '#controllers/authentication_controller.verifyOTP')
  })
  .prefix('authentication')

router.post('graphql', async () => {}).use([middleware.jwt(), middleware.graphql()])
