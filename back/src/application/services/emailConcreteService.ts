import { confirmationTemplate } from "../../adapters/mailTemplates/signupConfirmation";
import { API_BASE, CLIENT_HOST } from "../../core/enum/AllowedRoutes";
import { CreateUserDto } from "../dtos/createUserDto";
import { EmailService } from "./emailService";
import sgMail from "@sendgrid/mail";

export class EmailConcreteService implements EmailService {
  async sendConfirmationEmail(user: CreateUserDto, token?: string) {
    sgMail.setApiKey(process.env.SEND_GRID_MAIL_API_KEY!);

    const verifyLink = `${CLIENT_HOST}/activate/${token}`;
    const template = confirmationTemplate(verifyLink);

    const msg = {
      to: user.email,
      from: process.env.SEND_GRID_MAIL_SENDER!,
      subject: "Registration Confirmation to CamagruApp",
      html: template,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log("Confirmation email successfully sent");
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
