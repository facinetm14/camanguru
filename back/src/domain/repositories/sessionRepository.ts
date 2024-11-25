import { SessionModel } from "../models/SessionModel";

export interface SessionRepository {
    register(session: SessionModel): Promise<any>;
    findById(id: string): Promise<SessionModel>;
}