export class BackendException extends Error {
  code?: string
  meta?: object
  httpStatus?: number

  constructor(message?: string, code?: string, httpStatus?: number, meta?: object) {
    super(message)
    this.meta = meta
    this.code = code
    this.httpStatus = httpStatus
  }
}

