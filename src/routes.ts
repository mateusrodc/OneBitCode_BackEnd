import express from 'express'
import { categoriesController } from './controllers/categoriesControllers'
import { coursesController } from './controllers/coursesController'
import { episodesController } from './controllers/episodesControllers'
import { authController } from './controllers/authController'
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth'
import { favoritesController } from './controllers/favoriteController'

const router = express.Router()

router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)

router.get('/courses/featured', ensureAuth, coursesController.featured)
router.get('/courses/newest', coursesController.newest)
router.get('/courses/search', ensureAuth, coursesController.search)
router.get('/courses/:id', ensureAuth, coursesController.show)

router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)

router.get('/favorites', ensureAuth, favoritesController.index)
router.post('/favorites', ensureAuth, favoritesController.save)
router.delete('/favorites', ensureAuth, favoritesController.delete)

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

export { router }