import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {products} from '../../../mocks/data';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      },
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};