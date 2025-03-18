import { Op } from "sequelize"
import { Course } from "../models"
import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET_NAME } from '../config/enviroment';
import generateSignedUrl from "./aws";

export const courseService = {
  findByIdWithEpisodes: async (id: string) => {
    const courseWithEpisodes = await Course.findByPk(id, {
      attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
      include: {
        association: 'episodes',
        attributes: [
          'id',
          'name',
          'synopsis',
          'order',
          ['video_url', 'videoUrl'],
          ['seconds_long', 'secondsLong']
        ],
        order: [['order', 'ASC']],
        separate: true
      }
    });

    if (courseWithEpisodes && courseWithEpisodes.thumbnailUrl) {
      courseWithEpisodes.thumbnailUrl = await generateSignedUrl(
          BUCKET_NAME,
          courseWithEpisodes.thumbnailUrl,
          AWS_REGION,
          AWS_ACCESS_KEY_ID,
          AWS_SECRET_ACCESS_KEY
      );
  }

    return courseWithEpisodes
  },

  getRandomFeaturedCourses: async () => {
    const featuredCourses = await Course.findAll({
      attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
      where: {
        featured: true
      }
    })

    for (const element of featuredCourses) {
      if (element && element.thumbnailUrl) {
          element.thumbnailUrl = await generateSignedUrl(
              BUCKET_NAME,
              element.thumbnailUrl,
              AWS_REGION,
              AWS_ACCESS_KEY_ID,
              AWS_SECRET_ACCESS_KEY
          );
      }
    }

    const randomFeaturedCourses = featuredCourses.sort(() => 0.5 - Math.random())

    return randomFeaturedCourses.slice(0, 3)
  },

  getTopTenNewest: async () => {
    const courses = await Course.findAll({
      limit: 10,
      order: [['created_at', 'DESC']]
    })

    for(const course of courses){
      if(course && course.thumbnailUrl){
        course.thumbnailUrl = await generateSignedUrl(
          BUCKET_NAME,
          course.thumbnailUrl,
          AWS_REGION,
          AWS_ACCESS_KEY_ID,
          AWS_SECRET_ACCESS_KEY
        )
      }
    }

    return courses
  },

  findByName: async (name: string, page: number, perPage: number) => {
    const offset = (page - 1) * perPage

    const { count, rows } = await Course.findAndCountAll({
      attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      limit: perPage,
      offset
    })

    return {
      courses: rows,
      page,
      perPage,
      total: count
    }
  },

  getTopTenByLikes: async () => {
    const results = await Course.sequelize?.query(
      `SELECT
        courses.id,
        courses.name,
        courses.synopsis,
        courses.thumbnail_url as thumbnailUrl,
        COUNT(users.id) AS likes
      FROM courses
        LEFT OUTER JOIN likes
          ON courses.id = likes.course_id
          INNER JOIN users
            ON users.id = likes.user_id
      GROUP BY courses.id
      ORDER BY likes DESC
      LIMIT 10;`
    )

    if (results) 
    {

      const [topTen, metada] = results
      return topTen

    } 
    else 
    {
      return null
    }
  },
}