import { Session } from "../entity/session";

export interface ISessionRepository {
  save(session: Session): Promise<void>
}
