class ErrorHandler extends Error {
  code: number;
  message: string;
  constructor(data: { message: string; code: number }) {
    super();
    this.message = data.message;
    this.code = data.code;
  }
}

export { ErrorHandler };
