import {Router} from 'express'
import {authenticateUser, checkIfUserIsAdmin} from '../utils/helpers'
import {addToGroup, createGroup, getUserBookGroups} from '../infrastructure/services/BookGroupService'
import {bookGroupRoute} from '../utils/constants'
import {success} from './success'

const router = Router()

router.use(authenticateUser)

router.post('/', async (req, res) => {
  const {name, userId} = req.body
  const body = {name, userId}
  const response = await createGroup(body)
  success(res, response)
})

router.patch(
  `${bookGroupRoute}addUser`,
  checkIfUserIsAdmin,
  async (req, res) => {
    const {email} = req.body
    const {bookGroupId} = req.params
    const body = {id: parseInt(bookGroupId), email}
    const response = await addToGroup(body)
    success(res, response)
  },
)

router.get(`/all/:userId`, async (req, res) => {
  const {userId} = req.params
  const response = await getUserBookGroups(parseInt(userId))
  success(res, response)
})

export default router
