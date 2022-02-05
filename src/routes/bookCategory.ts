import {Router} from 'express'
import {authenticateUser, checkIfUserIsAdmin, checkIfUserIsInGroup} from '../utils/helpers'
import {
  createCategory,
  getGroupCategories,
  removeCategory,
  updateCategory,
} from '../infrastructure/services/BookCategoryService'
import {BookCategoryEdit} from 'core/BookCategory'
import {bookGroupRoute} from '../utils/constants'
import {success} from './success'

const router = Router()

const route = `${bookGroupRoute}bookCategory/`

router.use(authenticateUser)

router.post(route, checkIfUserIsAdmin, async (req, res) => {
  const {name} = req.body
  const bookGroupId = parseInt(req.params.bookGroupId)
  const body = {name, bookGroupId}

  const response = await createCategory(body)
  success(res, response)
})

router.get(`${route}all`, checkIfUserIsInGroup, async (req, res) => {
  const {bookGroupId} = req.params
  const response = await getGroupCategories(parseInt(bookGroupId))
  success(res, response)

})

router.delete(`${route}:id`, checkIfUserIsAdmin, async (req, res) => {
  const {id} = req.params
  const response = await removeCategory(parseInt(id))
  success(res, response)
})

router.patch(`${route}:id`, checkIfUserIsAdmin, async (req, res) => {
  const {id} = req.params
  const data: BookCategoryEdit = {id: parseInt(id), ...req.body}
  console.log(data)
  const response = await updateCategory(data)
  console.log(response)
  success(res, response)
})

export default router
