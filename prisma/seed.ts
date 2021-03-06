import {PrismaClient} from '@prisma/client'

const db = new PrismaClient()

async function seed() {
  await Promise.all(
    getUsers().map(user => {
      return db.user.create({
        data: {
          ...user,
          bookGroups: {
            create: [{bookGroup: {create: {name: 'test', creatorId: 1}}}],
          },
        },
      })
    }),
  )

  await Promise.all(
    getBookCategories().map(bookCategory => {
      return db.bookCategory.create({
        data: {...bookCategory, bookGroup: {connect: {id: 1}}},
      })
    }),
  )
  await Promise.all(
    getBook().map(data => {
      return db.book.create({data: {...data, category: {connect: {id: 1}}}})
    }),
  )
  await Promise.all(
    getOpinion().map(data => {
      return db.opinion.create({
        data: {...data, user: {connect: {id: 1}}, book: {connect: {id: 1}}},
      })
    }),
  )
}

seed()

function getUsers() {
  return [
    {
      name: 'Johnny',
      email: 'johnnywalee@gmail.com',
      password: '$2a$10$tLLJW.CSEdniP9gYS0.JcuHMMH6EfpVPz.cATLa7clQ8RYLOuQvvK',
    },
  ]
}

function getBookGroups() {
  return [
    {
      name: 'Konoha',
    },
  ]
}

function getBookCategories() {
  return [
    {
      name: '克雷米纳乌',
    },
  ]
}

function getBook() {
  return [
    {
      title: '写在骨头里',
      author: '西蒙·贝克特',
      dateStart: new Date(),
      dateEnd: new Date(),
    },
  ]
}

function getOpinion() {
  return [
    {
      description: 'Great book',
      rate: 10,
    },
  ]
}
