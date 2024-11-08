import { UserSessionStatus } from "../../core/enum/User";

export type SessionModel = {
  id: string;
  user_id: string;
  status: UserSessionStatus;
  created_at: Date;
  updated_at: Date;
};
