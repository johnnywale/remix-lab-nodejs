import {User, UserCredentials, UserDTO} from 'core/User'
import prisma from '../../utils/prismaClient'
import {BackendException} from '../../exception/exception'

export const getUserByEmail = async ({email}: UserCredentials): Promise<UserDTO> => {
  const user = await prisma.user.findUnique({where: {email}})
  if (!user) {
    throw new BackendException('User Not found', '-10')
  }
  return {id: user.id, email: user.email, password: user.password, name: user.name} as UserDTO
}

export const getUsersForBookGroup = async ({
                                             bookGroupId,
                                           }: {
  bookGroupId: number
}) => {
  const users = await prisma.user.findMany({
    where: {bookGroups: {some: {bookGroupId}}},
  })
  return users
}

export const registerUser = async (userData: User) => {
  const {email} = userData
  const existingUser = await prisma.user.findUnique({where: {email}})
  if (existingUser) {
    throw new BackendException('User already exists', '-10')
  }
  return await prisma.user.create({data: userData})
}
