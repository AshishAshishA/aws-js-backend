import { APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Swagger UI</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>

        <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
        <script>
          window.onload = () => {
            SwaggerUIBundle({
              spec: {
                openapi: "3.0.1",
                info: { title: "Product API", version: "1.0.0" },
                paths: {
                  "/products": {
                    get: {
                      summary: "Get all products",
                      responses: {
                        "200": {
                          description: "List of products"
                        }
                      }
                    }
                  },
                  "/products/{productId}": {
                    get: {
                      summary: "Get product by ID",
                      parameters: [
                        {
                          name: "productId",
                          in: "path",
                          required: true,
                          schema: { type: "string" }
                        }
                      ],
                      responses: {
                        "200": { description: "Product found" },
                        "404": { description: "Product not found" }
                      }
                    }
                  }
                }
              },
              dom_id: '#swagger-ui'
            });
          };
        </script>
      </body>
    </html>
    `,
  };
};