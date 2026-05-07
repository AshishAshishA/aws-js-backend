"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async () => {
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
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dhZ2dlckhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzd2FnZ2VySGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFTyxNQUFNLE9BQU8sR0FBRyxLQUFLLElBQW9DLEVBQUU7SUFDaEUsT0FBTztRQUNMLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFO1lBQ1AsY0FBYyxFQUFFLFdBQVc7U0FDNUI7UUFDRCxJQUFJLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBcURMO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQztBQTdEVyxRQUFBLE9BQU8sV0E2RGxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBJR2F0ZXdheVByb3h5UmVzdWx0IH0gZnJvbSAnYXdzLWxhbWJkYSc7XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlciA9IGFzeW5jICgpOiBQcm9taXNlPEFQSUdhdGV3YXlQcm94eVJlc3VsdD4gPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC9odG1sJyxcclxuICAgIH0sXHJcbiAgICBib2R5OiBgXHJcbiAgICA8IURPQ1RZUEUgaHRtbD5cclxuICAgIDxodG1sPlxyXG4gICAgICA8aGVhZD5cclxuICAgICAgICA8dGl0bGU+U3dhZ2dlciBVSTwvdGl0bGU+XHJcbiAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJodHRwczovL3VucGtnLmNvbS9zd2FnZ2VyLXVpLWRpc3Qvc3dhZ2dlci11aS5jc3NcIiAvPlxyXG4gICAgICA8L2hlYWQ+XHJcbiAgICAgIDxib2R5PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJzd2FnZ2VyLXVpXCI+PC9kaXY+XHJcblxyXG4gICAgICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly91bnBrZy5jb20vc3dhZ2dlci11aS1kaXN0L3N3YWdnZXItdWktYnVuZGxlLmpzXCI+PC9zY3JpcHQ+XHJcbiAgICAgICAgPHNjcmlwdD5cclxuICAgICAgICAgIHdpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIFN3YWdnZXJVSUJ1bmRsZSh7XHJcbiAgICAgICAgICAgICAgc3BlYzoge1xyXG4gICAgICAgICAgICAgICAgb3BlbmFwaTogXCIzLjAuMVwiLFxyXG4gICAgICAgICAgICAgICAgaW5mbzogeyB0aXRsZTogXCJQcm9kdWN0IEFQSVwiLCB2ZXJzaW9uOiBcIjEuMC4wXCIgfSxcclxuICAgICAgICAgICAgICAgIHBhdGhzOiB7XHJcbiAgICAgICAgICAgICAgICAgIFwiL3Byb2R1Y3RzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBnZXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnk6IFwiR2V0IGFsbCBwcm9kdWN0c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiMjAwXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMaXN0IG9mIHByb2R1Y3RzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgXCIvcHJvZHVjdHMve3Byb2R1Y3RJZH1cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeTogXCJHZXQgcHJvZHVjdCBieSBJRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcm9kdWN0SWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbjogXCJwYXRoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1hOiB7IHR5cGU6IFwic3RyaW5nXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiMjAwXCI6IHsgZGVzY3JpcHRpb246IFwiUHJvZHVjdCBmb3VuZFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiNDA0XCI6IHsgZGVzY3JpcHRpb246IFwiUHJvZHVjdCBub3QgZm91bmRcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBkb21faWQ6ICcjc3dhZ2dlci11aSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIDwvc2NyaXB0PlxyXG4gICAgICA8L2JvZHk+XHJcbiAgICA8L2h0bWw+XHJcbiAgICBgLFxyXG4gIH07XHJcbn07Il19