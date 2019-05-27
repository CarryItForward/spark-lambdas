import { S3 as awsS3 } from 'aws-sdk'

export const isOffline = () => process.env.IS_OFFLINE === 'true'

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || ''
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || ''
const sessionToken = process.env.AWS_SESSION_TOKEN || ''

const s3Options = {
  online: {
    credentials: { accessKeyId, secretAccessKey, sessionToken },
  },
  offline: {
    s3ForcePathStyle: true,
    endpoint: 'http://localhost:5353',
    credentials: {
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER',
    },
  },
}

export class S3 extends awsS3 {
  constructor(options?: awsS3.Types.ClientConfiguration) {
    const config = isOffline()
      ? { ...s3Options.offline, ...options }
      : { ...s3Options.online, ...options }

    super(config)
  }
}
