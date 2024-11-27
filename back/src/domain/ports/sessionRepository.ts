import { SessionModel } from "../../infrastructure/model/SessionModel";

export interface SessionRepository {
  register(session: SessionModel): Promise<any>;
  findById(id: string): Promise<SessionModel>;
  delete(id: string): Promise<void>;
}
