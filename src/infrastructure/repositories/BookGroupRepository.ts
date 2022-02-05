import {BookGroupAddToGroupDTO, BookGroupDTO} from '../../core/BookGroup'
import prisma from '../../utils/prismaClient'
import {BackendException} from '../../exception/exception'

export const createGroup = async ({userId, name}: BookGroupDTO) => {
  const doBookGroupExist = await prisma.bookGroup.findFirst({
    where: {users: {some: {userId}}, name},
  })
  if (doBookGroupExist) {
    throw new BackendException('Group already exists', '10')
  }
  const bookGroup = await prisma.bookGroup.create({
    data: {
      name,
      creatorId: userId,
      users: {create: [{user: {connect: {id: userId}}}]},
    },
  })
  return bookGroup
}

export const addToGroup = async ({email, id}: BookGroupAddToGroupDTO) => {
  const user = await prisma.user.findFirst({
    where: {email},
  })
  if (!user) {
    throw new BackendException('User not found', '10')
  }
  const updatedGroup = await prisma.bookGroup.update({
    where: {id},
    data: {users: {create: [{userId: user.id}]}},
  })
  return updatedGroup
}

export const getUserBookGroups = async (userId: number) => {
  const userGroups = await prisma.bookGroup.findMany({
    where: {users: {some: {userId}}},
  })
  return userGroups
}
