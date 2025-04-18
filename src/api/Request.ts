export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export enum MsaService {
  AUTH = "/auth-service",
  MEMO = "/memo-service",
  BOARD = "/board-service",
  POPULAR = "/popular-posts-service",
}

export enum HttpStatus {
  CREATED = 201,
  NO_CONTENT = 204,
}
