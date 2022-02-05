import {Router} from 'express'
import {authenticateUser, checkIfUserIsInGroup, checkIfUserIsUserPassed} from '../utils/helpers'
import {createOpinion, getOpinionsForBook} from '../infrastructure/services/OpinionService'
import {bookGroupRoute} from '../utils/constants'
import {success} from './success'

const router = Router()

router.use(authenticateUser)

const route = `${bookGroupRoute}opinion`
console.log('route in options %s', route)

router.post(
  `${route}`,
  checkIfUserIsInGroup,
  checkIfUserIsUserPassed,
  async (req, res) => {
    const {bookId, description, userId, rate} = req.body
    const body = {bookId, description, userId, rate}
    const response = await createOpinion(body)
    success(res, response)
  },
)

router.get(`/opinion/:bookId`, async (req, res) => {
  const {bookId} = req.params
  const response = await getOpinionsForBook(parseInt(bookId))
  success(res, response)
})

export default router
