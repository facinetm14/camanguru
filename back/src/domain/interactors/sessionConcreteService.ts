import { SessionRepository } from "../ports/sessionRepository";
import { CreateSessionDto } from "../dtos/createSessionDto";
import { SessionService } from "../../domain/usecases/sessionService";
import { buildSessionModelFromCreateSessionDto } from "../utils/mappers/session-entity.mapper";

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
