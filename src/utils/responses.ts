export const successResponse = (body: any, statusCode = 200) => ({
  statusCode,
  body: JSON.stringify(body),
})

export const errorResponse = (body: any, statusCode = 500) => ({
  statusCode,
  body: JSON.stringify(body),
})
