import type { Context } from 'hono'
import * as service from './users.service'
import * as util from '@/utils/response.util'
import { link } from '@/utils/hateoas.util';
import { userSchema, updateUserSchema } from './users.validator';
import { paramIdSchema } from '../projects/project.validator';

const userLinks = (userId: string) => [
//   link.self(`/api/users/${userId}`),
  link.update(`/api/users/${userId}`),
  link.delete(`/api/users/${userId}`),
  link.collection('/api/users'),
  link.rel('tasks', `/api/tasks?assignedTo=${userId}`), // relasi ke task
];

export const createUserHandler = async (c: Context) => {
    try {
        const body = await c.req.json()
        const validData = userSchema.parse(body)
        const createdUser = await service.createUser(validData)
        return util.successResponseHT(c, createdUser, userLinks(createdUser.id), "user berhasil dibuat", 201)
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}

export const getUsersHandler = async (c: Context) => {
    try {
        const users = await service.getAllUsers()
        const usersLink = [link.self('/api/users'), link.create('/api/users'), link.rel('search', '/api/users/search?name=&email=')]
        return util.successResponseHT(c, users, usersLink, "data users berhasil diambil")
    } catch (error: any) {
        return util.errorResponse(c, error.message)
    }
}

export const getSpesificUserHandler = async (c: Context) => {
    try {
        const { name:nameTarget, email:emailTarget } = userSchema.parse(c.req.query())
        const usersLink = [link.collection('/api/users'), link.rel('tasks', `/api/tasks?assignedTo=$userId`)]

        const userSearched = await service.searchUser(nameTarget, emailTarget)
        return util.successResponseHT(c, userSearched, usersLink, "data user berhasil diambil")
    } catch (error: any) {
        return util.errorResponse(c, error.message, error.cause?.status)
    }
}

export const updateSpesificUserHandler = async (c: Context) => {
    try {
        const { id: userId } = paramIdSchema.parse(c.req.param())
        const body = await c.req.json()
        const validData = updateUserSchema.parse(body)
        const updatedUser = await service.updateUser(userId, validData)
        return util.successResponseHT(c, updatedUser, userLinks(updatedUser.id), "data user berhasil diupdate")
    } catch (error: any) {
        return util.errorResponse(c, error.message, error.cause?.status)
    }
}

export const deleteSpesificUserHandler = async (c: Context) => {
    try {
        const {id: userId } = paramIdSchema.parse(c.req.param())
        const deletedUser = await service.deleteUser(userId)
        return util.successResponse(c, deletedUser, "data user telah berhasil dihapus")
    } catch (error:any){
        return util.errorResponse(c, error.message)
    }
}