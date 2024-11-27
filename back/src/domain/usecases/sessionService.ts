import { CreateSessionDto } from "../dtos/createSessionDto";

export interface SessionService {
  register(session: CreateSessionDto): Promise<void>;
}
