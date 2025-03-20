/*
 *일관성있는 에러처리를 위한 HttpException 클래스
 * @see asyncErrorHandler
 */
export class HttpException extends Error {
  status;
  name;

  constructor(param) {
    const { status, name, message } = param;
    super(message);
    this.status = status;
    this.name = name;
  }
}
