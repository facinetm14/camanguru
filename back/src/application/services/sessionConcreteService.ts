import { CreateSessionDto } from "../dtos/createSessionDto";
import { SessionService } from "./sessionService";

export class SessionConcreteService implements SessionService {
  async register(session: CreateSessionDto): Promise<void> {
    console.log({ session });
  }
}
