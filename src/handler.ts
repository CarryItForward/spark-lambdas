import { APIGatewayEvent } from 'aws-lambda'
import { errorResponse, S3, successResponse } from './utils'

export const generateContent = async (event: APIGatewayEvent) => {
  const { WEBSITE_BUCKET } = process.env

  const s3 = new S3()

  if (event.pathParameters && event.pathParameters.name) {
    const { name } = event.pathParameters

    const params = {
      Bucket: WEBSITE_BUCKET || '',
      Key: `${name.toLowerCase()}/index.html`,
      Body: new Buffer(`

<html lang="en">
<head>
    <title>${name}</title>
</head>
<body>
  <h1>${name}'s Profile Page</h1>
  <p>This is a description about what items ${name} needs.</p>
</body>
</html>

      `.trim()),
      ContentType: 'text/html',
      ACL: 'public-read',
    }

    // Wait for object to be uploaded
    await s3.putObject(params).promise()

    return successResponse({
      url: `http://${WEBSITE_BUCKET}.s3-website-us-west-2.amazonaws.com/${name.toLowerCase()}`,
    })
  } else {
    return errorResponse({
      message: 'invalid name',
    }, 400)
  }
}
