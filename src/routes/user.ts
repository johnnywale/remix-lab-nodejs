import {Router} from 'express'
import {checkIfUserIsInGroup} from '../utils/helpers'
import {getUsersForBookGroup, loginUser, registerUser} from '../infrastructure/services/UserService'

const router = Router()

router.post('/login', async (req, res, next) => {
  const {email, password} = req.body
  const credentials = {email, password}
  const data = await loginUser(credentials)
  res.status(200)
  res.json({...data})
})

router.get('/all/:bookGroupId', checkIfUserIsInGroup, async (req, res) => {
  const {bookGroupId} = req.params
  const data = await getUsersForBookGroup({
    bookGroupId: parseInt(bookGroupId),
  })
  res.status(200)
  res.json(data)

})

router.post('/register', async (req, res) => {
  const {email, password, name} = req.body
  const user = {email, password, name}
  const response = await registerUser(user)
  res.status(200)
  res.json({token: response?.token, id: response.user.id})
})

export default router
