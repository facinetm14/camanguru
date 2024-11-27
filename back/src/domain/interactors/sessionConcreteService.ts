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

  async findUserIdFromSession(id: string): Promise<string | null> {
    const session = await this.sessionRepository.findById(id);
    if (!session) {
      return null;
    }
    return session.user_id;
  }

  async delete(id: string): Promise<void> {
    return this.sessionRepository.delete(id);
  }
}
