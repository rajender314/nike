import AWS from 'aws-sdk'

AWS.config.update({
  region: 'us-east-2',
  accessKeyId: 'AKIAIJM5VA3SUXLDY7UQ',
  secretAccessKey: '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',
})

export const s3Bucket = 'nikegloverteamlogo'
export const s3 = new AWS.S3()
