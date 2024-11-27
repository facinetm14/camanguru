import { RequestError } from "../enums/RequestError";

export class InputError extends Error {
  constructor({ name, message }: { name: RequestError; message?: string }) {
    super();
    this.name = name;
    this.message = message ?? "";
  }
}
