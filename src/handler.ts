import { successResponse } from './utils'

export const hello = async (event: AWSLambda.APIGatewayEvent) => successResponse({
  message: `Hello, ${event.pathParameters ? event.pathParameters.name : ''}`,
  input: event,
})
