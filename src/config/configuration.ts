import { STAGING } from '~common/constants/environments';

export default () => ({
  dbConfig: {
    host: process.env.DB_HOST,
    port: Number(process.env.TYPEORM_PORT),
    connection: process.env.DB_CONNECTION,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_DATABASE,
    useSSL: process.env.DB_SSL === 'true'
  },
  serverConfig: {
    port: Number(process.env.PORT) || 3001,
    host: process.env.HOST || 'localhost'
  },
  jwtConfig: {
    passwordSaltLength: process.env.PASSWORD_SALT_LENGTH
      ? Number(process.env.PASSWORD_SALT_LENGTH)
      : 10,
    secret: process.env.JWT_SECRET || 'JWT_SECRET',
    expire: process.env.JWT_EXPIRE ? Number(process.env.JWT_EXPIRE) : 86400,
    resetPasswordKey:
      process.env.JWT_KEY_RESET_PASSWORD || 'JWT_KEY_RESET_PASSWORD',
    resetPasswordExpire: process.env.JWT_EXPIRE_RESET_PASSWORD
      ? Number(process.env.JWT_EXPIRE_RESET_PASSWORD)
      : 300
  },
  appConfig: {
    pairingCodeLength: process.env.PAIRING_CODE_LENGTH
      ? Number(process.env.PAIRING_CODE_LENGTH)
      : 12
  }, // note
  papertrailConfig: {
    host: process.env.PAPERTRAIL_HOST,
    port: Number(process.env.PAPERTRAIL_PORT) || 41359,
    appName: process.env.PAPERTRAIL_APP_NAME || 'example-app'
  },
  s3Config: {
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    preSignUrlExpireIn: +process.env.AWS_S3_PRESIGN_URL_EXPIRE_IN || 300,
    preSignUrlMaxSize: +process.env.AWS_S3_PRESIGN_URL_MAX_SIZE || 5242880,
    region: process.env.AWS_DEFAULT_REGION || 'ap-southeast-1'
  },
  serviceName: process.env.SERVICE_NAME || 'user-subscription-service',
  environment: process.env.NODE_ENV || STAGING,
  aws: {
    defaultRegion: 'ap-southeast-1',
    accountId: process.env.AWS_ACCOUNT_ID || '',
    sns: {
      timeout: 5000
    }
  },
  httpServiceConfig: {
    timeout: Number(process.env.HTTP_TIMEOUT) || 5000,

    billingUrl: process.env.BILLING_URL,
    billingName: process.env.BILLING_NAME || 'billing-service'
  }
});
