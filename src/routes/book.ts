import {Router} from 'express'
import {authenticateUser, checkIfUserIsAdmin, checkIfUserIsInGroup} from '../utils/helpers'
import {createBook, getBookForCategory} from '../infrastructure/services/BookService'
import {bookGroupRoute} from '../utils/constants'
import {success} from './success'

const router = Router()

router.use(authenticateUser)

const route = `${bookGroupRoute}bookCategory/`

router.post(
  `${route}:categoryId/book`,
  checkIfUserIsAdmin,
  async (req, res) => {
    const {categoryId} = req.params
    const {title, author, dateEnd, dateStart} = req.body
    const body = {
      categoryId: parseInt(categoryId),
      title,
      author,
      dateEnd,
      dateStart,
    }
    const response = await createBook(body)
    success(res, response)
  },
)

router.get(
  `${route}:categoryId/book`,
  checkIfUserIsInGroup,
  async (req, res) => {
    const {categoryId} = req.params
    const response = await getBookForCategory(parseInt(categoryId))
    success(res, response)
  },
)

export default router
