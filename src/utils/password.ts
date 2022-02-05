import bcrypt from 'bcryptjs'


export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10)
}

export const verifyPassword = (password: string, hashed_password: string) => {
  return bcrypt.compareSync(password, hashed_password)
}