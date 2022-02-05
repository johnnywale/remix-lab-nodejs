import {BookGroupAddToGroupDTO, BookGroupDTO} from '../../core/BookGroup'

import {
  addToGroup as addToGroupR,
  createGroup as createGroupR,
  getUserBookGroups as getUserBookGroupsR,
} from '../repositories/BookGroupRepository'

export const createGroup = async (bookGroupData: BookGroupDTO) => {
  const bookGroup = await createGroupR(bookGroupData)
  return bookGroup

}

export const addToGroup = async (bookGroupData: BookGroupAddToGroupDTO) => {
  const bookGroup = await addToGroupR(bookGroupData)
  return bookGroup

}

export const getUserBookGroups = async (userId: number) => {
  const bookGroups = await getUserBookGroupsR(userId)
  return bookGroups

}
