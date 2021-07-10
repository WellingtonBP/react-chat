export default interface ICustomError extends Error {
  originalMessage?: string
  statusCode?: number
  info?: any
}
