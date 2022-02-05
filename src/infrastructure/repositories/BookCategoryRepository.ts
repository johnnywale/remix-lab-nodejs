import {BookCategoryDTO, BookCategoryEdit, isBookCategory} from '../../core/BookCategory'
import prisma from '../../utils/prismaClient'
import {BackendException} from '../../exception/exception'

export const createCategory = async ({bookGroupId, name}: BookCategoryDTO) => {
  const doBookCategoryExist = await prisma.bookCategory.findFirst({
    where: {bookGroup: {id: bookGroupId}, name},
  })
  if (doBookCategoryExist) {
    throw new BackendException('Book category exists', '-10')
  }
  return await prisma.bookCategory.create({
    data: {
      name,
      bookGroup: {connect: {id: bookGroupId}},
    },
  })
}

export const getGroupCategories = async (bookGroupId: number) => {
  const groupCategories = await prisma.bookCategory.findMany({
    where: {bookGroup: {id: bookGroupId}},
  })
  return groupCategories
}

type ExcludesFalse = <T>(x: T | false) => x is T

export const removeCategory = async (bookCategoryId: number) => {

  const categoryBooksId = await prisma.book
    .findMany({
      where: {categoryId: bookCategoryId},
    })
    .then(data => data.map(book => book.id))

  const deletedOpinions = categoryBooksId.map(id =>
    prisma.opinion.deleteMany({where: {bookId: id}}),
  )

  const deletedBooks =
    Boolean(categoryBooksId?.length) &&
    prisma.book.delete({
      where: {categoryId: bookCategoryId},
    })

  const removeCategory = prisma.bookCategory.delete({
    where: {id: bookCategoryId},
  })

  const toDelete = [...deletedOpinions, deletedBooks, removeCategory].filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Boolean as any as ExcludesFalse,
  )

  const removedCategory = await prisma.$transaction(toDelete).then(data => {
    for (const deleted of data) {
      if (isBookCategory(deleted)) {
        return deleted
      }
    }
    return false
  })
  return removedCategory

}

export const updateCategory = async ({id, ...data}: BookCategoryEdit) => {
  const updatedCategory = await prisma.bookCategory.update({
    where: {id},
    data,
  })
  return updatedCategory
}
