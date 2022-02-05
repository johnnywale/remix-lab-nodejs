import {BookCategoryDTO, BookCategoryEdit} from '../../core/BookCategory'
import {
  createCategory as createCategoryR,
  getGroupCategories as getGroupCategoriesR,
  removeCategory as removeCategoryR,
  updateCategory as updateCategoryR,
} from '../repositories/BookCategoryRepository'

export const createCategory = async (bookCategoryData: BookCategoryDTO) => {
  const bookCategory = await createCategoryR(bookCategoryData)
  return bookCategory
}

export const getGroupCategories = async (bookGroupId: number) => {
  const bookCategories = await getGroupCategoriesR(bookGroupId)
  return bookCategories
}

export const removeCategory = async (bookCategoryId: number) => {
  const bookCategory = await removeCategoryR(bookCategoryId)
  return bookCategory
}

export const updateCategory = async (data: BookCategoryEdit) => {
  const bookCategory = await updateCategoryR(data)
  return bookCategory
}
