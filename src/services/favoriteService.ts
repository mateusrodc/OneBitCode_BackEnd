import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, BUCKET_NAME } from "../config/enviroment"
import { Favorite } from "../models/Favorite"
import generateSignedUrl from "./aws"

export const favoriteService = {
	create: async (userId: number, courseId: number) => {
    const favorite = await Favorite.create({
      userId,
      courseId
    })

    return favorite
  },

  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
      attributes: [['user_id', 'userId']],
      where: { userId },
      include: {
        association: 'Course',
        attributes: [
          'id',
          'name',
          'synopsis',
          ['thumbnail_url', 'thumbnailUrl']
        ]
      }
    })

    if(favorites){

      for(const favorite of favorites)
      {

        if(favorite.Course?.thumbnailUrl){

          favorite.Course.thumbnailUrl = await generateSignedUrl(
            BUCKET_NAME,
            favorite.Course.thumbnailUrl,
            AWS_REGION,
            AWS_ACCESS_KEY_ID,
            AWS_SECRET_ACCESS_KEY
          )

        }
      }
    }

    return {
      userId,
      courses: favorites.map(favorite => favorite.Course)
    }
  },

  delete: async (userId: number, courseId: number) => {

    await Favorite.destroy({
      where: {
        userId,
        courseId
      }
    })
  },
  isFavorited: async (userId: number, courseId: number) => {
    const favorite = await Favorite.findOne({
      where: {
        userId,
        courseId
      }
    })

    return favorite !== null
  }
}