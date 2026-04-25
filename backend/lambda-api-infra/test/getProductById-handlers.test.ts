import { handler } from '../handlers/getProductsById/getProductsByIdHandler'; // adjust path
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('getProductById handler', () => {
  const baseEvent = {
    pathParameters: {
      productId: '',
    },
  } as unknown as APIGatewayProxyEvent;

  it('should return 200 and product when product exists', async () => {
    const event = {
      ...baseEvent,
      pathParameters: {
        productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
      },
    };

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(200);
    expect(body).toMatchObject({
      id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
      title: 'ProductOne',
    });

    expect(result.headers).toMatchObject({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
  });

  it('should return 404 when product does not exist', async () => {
    const event = {
      ...baseEvent,
      pathParameters: {
        productId: 'non-existent-id',
      },
    };

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(404);
    expect(body).toEqual({
      message: 'Product not found',
    });
  });

  it('should return 404 when productId is missing', async () => {
    const event = {
      ...baseEvent,
      pathParameters: null,
    };

    const result = await handler(event);
    const body = JSON.parse(result.body);

    expect(result.statusCode).toBe(404);
    expect(body.message).toBe('Product not found');
  });

  it('should return 500 on unexpected error', async () => {
    // Force error by breaking Array.prototype.find
    const originalFind = Array.prototype.find;
    Array.prototype.find = jest.fn(() => {
      throw new Error('Mock error');
    });

    const event = {
      ...baseEvent,
      pathParameters: {
        productId: 'any-id',
      },
    };

    const result = await handler(event);

    expect(result.statusCode).toBe(500);
    expect(result.body).toBe(
      JSON.stringify({ message: 'Internal Server Error' })
    );

    // restore
    Array.prototype.find = originalFind;
  });
});