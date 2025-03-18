import AWS from 'aws-sdk';

async function generateSignedUrl(bucketName: string, key: string, region: string, accessKeyId: string, secretAccessKey: string): Promise<string> {
    const s3 = new AWS.S3({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    const params = {
        Bucket: bucketName,
        Key: key,
        Expires: 60,
    };

    return new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', params, (err, url) => {
            if (err) {
                reject(err);
            } else {
                resolve(url);
            }
        });
    });
}

export default generateSignedUrl;