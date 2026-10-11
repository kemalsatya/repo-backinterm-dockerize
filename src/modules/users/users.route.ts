import * as controller from './users.controller'
import { Hono } from 'hono'

const userRoutes = new Hono()

// get spesific user
userRoutes.get('/search', controller.getSpesificUserHandler)

// create user
userRoutes.post('/', controller.createUserHandler)

// get all users
userRoutes.get('/', controller.getUsersHandler)

// update user data
userRoutes.patch('/:id', controller.updateSpesificUserHandler)

// delete user
userRoutes.delete("/:id", controller.deleteSpesificUserHandler)

export default userRoutes
