import { CreateSessionDto } from "../dtos/createSessionDto";

export interface SessionService {
  register(session: CreateSessionDto): Promise<void>;
  findUserIdFromSession(id: string): Promise<string | null>;
  delete(id: string): Promise<void>;
}