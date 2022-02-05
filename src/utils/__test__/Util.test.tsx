import {hashPassword, verifyPassword} from '../password'

describe('Encoding', () => {
  const error = new Error('Unhandled')
  describe('createGroup', () => {
    it('should create new book group ', async () => {
      const data = hashPassword('password')
      console.log(data)
      await expect(Promise.resolve(verifyPassword('password', data))).resolves.toEqual(true)
      // const name = 'NewBookGroup'
      // const userId = 1
      // const bookGroup = {
      //   id: 2,
      //   creatorId: userId,
      //   name,
      // }
      //
      // const bookGroupDTO = {userId, name}
      //
      // prismaMock.bookGroup.create.mockResolvedValue(bookGroup)
      //
      // await expect(createGroup(bookGroupDTO)).resolves.toEqual(bookGroup)
    })


  })
})
