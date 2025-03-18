import { FeatureType, ResourceOptions } from "adminjs";
import uploadFileFeature from '@adminjs/upload'
import {AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET_NAME  } from '../../config/enviroment'

export const courseResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'uploadThumbnail', 'featured', 'categoryId'],
  filterProperties: ['name', 'synopsis', 'featured', 'categoryId', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'featured', 'categoryId'],
  showProperties: ['id', 'name', 'synopsis', 'featured', 'thumbnailUrl', 'categoryId', 'createdAt', 'updatedAt']
}

export const courseResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      aws: {
        bucket: BUCKET_NAME,
        region: AWS_REGION,
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    },
    properties: {
      key: 'thumbnailUrl',
      file: 'uploadThumbnail',
    },
    uploadPath: (record, filename) => `thumbnails/course-${record.get('id')}/${filename}`,
    validation: {
      mimeTypes: ['image/png', 'image/jpeg', 'image/gif'],
    },
  }),
];