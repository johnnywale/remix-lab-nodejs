import {OpinionDTO} from '../../core/Opinion'
import {
  createOpinion as createOpinionR,
  getOpinionsForBook as getOpinionsForBookR,
} from '../repositories/OpinionRepository'
import {BackendException} from '../../exception/exception'

export const createOpinion = async (opinionData: OpinionDTO) => {
  const {rate} = opinionData
  if (rate < 0 || rate > 10) {
    throw new BackendException('not a valid rate', '10')
  }
  const opinion = await createOpinionR(opinionData)
  return opinion
}

export const getOpinionsForBook = async (bookId: number) => {
  const book = await getOpinionsForBookR(bookId)
  return book
}
