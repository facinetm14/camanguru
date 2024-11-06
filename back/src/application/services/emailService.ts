import { CreateUserDto } from "../dtos/createUserDto";

export interface EmailService {
    sendConfirmationEmail(user: CreateUserDto): Promise<void>;
}