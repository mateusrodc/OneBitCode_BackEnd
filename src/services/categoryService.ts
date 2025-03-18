import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, BUCKET_NAME } from '../config/enviroment'
import { Category } from '../models'
import generateSignedUrl from './aws'

export const categoryService = {
  findAllPaginated: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage

    const { count, rows } = await Category.findAndCountAll({
      attributes: ['id', 'name', 'position'],
      order: [['position', 'ASC']],
      limit: perPage,
      offset
    })

    return {
      categories: rows,
      page,
      perPage,
      total: count
    }
  },
  findByIdWithCourses: async (id: string) => {
    const categoryWithCourses = await Category.findByPk(id, {
      attributes: ['id', 'name'],
      include: {
        association: 'courses',
        attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
      }
    });
    if(categoryWithCourses && categoryWithCourses.courses){

      for(const course of categoryWithCourses.courses){

        if(course && course.thumbnailUrl){
          
          course.thumbnailUrl = await generateSignedUrl(
            BUCKET_NAME,
            course.thumbnailUrl,
            AWS_REGION,
            AWS_ACCESS_KEY_ID,
            AWS_SECRET_ACCESS_KEY
        );
        }
      }
    }

    return categoryWithCourses
  }
}