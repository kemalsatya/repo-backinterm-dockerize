import { userModel } from "./users.model";
import type { createUserDTO, updateUserDTO } from "./users.validator";

export const createUser = async (data: createUserDTO) => {
    const user = await userModel.create(data)
    return user
}

export const checkUserById = async (userId: string) => {
    const user = await userModel.findById(userId).lean()
    return Boolean(user) 
}

export const getUserById = async (userId: string) => {
    const user = await userModel.findById(userId).lean()
    if (!user) throw new Error("user tidak ditemukan", {cause: { status: 404 }})
    return user
}

export const searchUser = async (nameTarget: string, emailTarget:string) => {
    const user = await userModel.findOne({name: nameTarget, email: emailTarget}).lean()
    if(!user) throw new Error("data user tidak ditemukan", {cause: {status: 404}})
    return user
}

export const getAllUsers = async () => {
    const users = await userModel.find().lean()
    return users
}

export const updateUser = async (userId: string, data: updateUserDTO) => {
    const updatedUser = await userModel.findByIdAndUpdate(userId, data, {returnDocument: 'after'})
    if (!updatedUser) throw new Error("data user tidak ditemukan", {cause: {status: 404}})
    return updatedUser 
}

export const deleteUser = async (userId: string) => {
    const deletedUser = await userModel.findByIdAndDelete(userId)
    return deletedUser
}