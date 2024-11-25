import { buildSessionModelFromCreateSessionDto } from "../../core/utils/classTransformer";
import { SessionRepository } from "../../domain/repositories/sessionRepository";
import { CreateSessionDto } from "../dtos/createSessionDto";
import { SessionService } from "./sessionService";

export class SessionConcreteService implements SessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async register(session: CreateSessionDto): Promise<void> {
    const newSession = buildSessionModelFromCreateSessionDto(session);
    try {
      return this.sessionRepository.register(newSession);
    } catch (error) {
      console.log(error);
      throw new Error("Error: failed to create user session");
    }
  }
}
