class ErrorHandler extends Error {
  code: number;
  message: string;
  constructor(data: { message: string; code: number }) {
    super();
    this.message = data.message;
    this.code = data.code;
  }
}

class InvalidIdException extends Error {
  code: number;
  message: string;
  constructor() {
    super();
    this.code = 50;
    this.message = 'Invalid ID';
  }
}

class NotFoundException extends Error {
  code: number;
  message: string;
  constructor() {
    super();
    this.code = 11;
    this.message = 'The product do not exist';
  }
}

class CredentialsException extends Error {
  code: number;
  message: string;
  constructor() {
    super();
    this.code = 33;
    this.message = 'Credential error';
  }
}

export {
  ErrorHandler,
  InvalidIdException,
  NotFoundException,
  CredentialsException,
};
