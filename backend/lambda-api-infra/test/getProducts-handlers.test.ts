import { handler } from '../handlers/getProductList/getProductListHandler'; // adjust path
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('handler', () => {
  const mockEvent = {} as APIGatewayProxyEvent;

  it('should return 200 and correct products list', async () => {
    const result = await handler(mockEvent);

    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);

    expect(body).toHaveLength(6);

    expect(body[0]).toEqual({
      description: "Short Product Description1",
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      price: 24,
      title: "ProductOne"
    });

    expect(result.headers).toMatchObject({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
  });

  it('should return valid JSON array', async () => {
    const result = await handler(mockEvent);

    expect(() => JSON.parse(result.body)).not.toThrow();
  });
});