import { successResponse } from './utils'

export const hello = async (event: AWSLambda.APIGatewayEvent) => successResponse({
  message: 'Go Serverless v1.0! Your function executed successfully!',
  input: event,
})
