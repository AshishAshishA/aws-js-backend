import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

const dynamoDbClient = new DynamoDBClient({
  region: 'us-east-1'
});
const docClient = DynamoDBDocumentClient.from(dynamoDbClient);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const resProducts = []

    const prodResp = await docClient.send(new ScanCommand({
      TableName: 'products',
    }));

    const products = prodResp.Items || [];

    for(const prod of products){
      const stock = await docClient.send(new GetCommand({
        TableName: 'stocks',
        Key: {
          product_id: prod.id
        }
      }));
      resProducts.push({ ...prod, count: stock.Item?.count || 0 });
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      },
      body: JSON.stringify(resProducts), // Return only the items
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};