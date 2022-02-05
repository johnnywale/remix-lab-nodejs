import {User, UserCredentials, UserTokenCredentials} from 'core/User'
import {
  getUserByEmail as getUserByEmail,
  getUsersForBookGroup as getUsersForBookGroupR,
  registerUser as registerUserR,
} from '../repositories/UserRepository'
import jwt from 'jsonwebtoken'
import {sendRegisterEmail} from '../../utils/mailer'
import {hashPassword, verifyPassword} from '../../utils/password'
import {BackendException} from '../../exception/exception'

function generateAccessToken(data: UserTokenCredentials) {
  const token = process.env.TOKEN_SECRET
  if (token) {
    return jwt.sign(data, token, {expiresIn: '7d'})
  } else {
    throw new BackendException('Token not setup', '-10')
  }
}

export const loginUser = async (credentials: UserCredentials) => {
  const user = await getUserByEmail(credentials)
  const ok = verifyPassword(credentials.password, user.password)
  if (!ok) {
    throw new BackendException('Password validation not pass', '-10')
  }
  const credential = {id: user.id, email: user.email} as UserTokenCredentials
  const token = generateAccessToken(credential)
  return {token, id: credential.id}
}

export const registerUser = async (user: User) => {
  let cloned = {...user}
  cloned.password = hashPassword(user.password)
  const userResponse = await registerUserR(cloned)

  const token = generateAccessToken({
    email: userResponse.email,
    id: userResponse.id,
  }) // TODO: add here id and simplify helper function
  await sendRegisterEmail(userResponse)
  return {token, user: userResponse}
}

export const getUsersForBookGroup = async (data: {bookGroupId: number}) => {
  return await getUsersForBookGroupR(data)
}
