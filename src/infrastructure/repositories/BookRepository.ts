import prisma from '../../utils/prismaClient'
import {BookDTO} from '../../core/Book'
import {BackendException} from '../../exception/exception'

export const createBook = async ({categoryId, ...data}: BookDTO) => {
  const book = await prisma.book.create({
    data: {
      ...data,
      category: {connect: {id: categoryId}},
    },
  })

  return book
}

export const getBookForCategory = async (categoryId: number) => {
  const book = await prisma.book.findFirst({
    where: {categoryId},
  })
  if (!book) {
    throw new BackendException('Book not exists', '10')
  }
  return book
}
