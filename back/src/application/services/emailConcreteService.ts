import { CreateUserDto } from "../dtos/createUserDto";
import { EmailService } from "./emailService";
import sgMail from "@sendgrid/mail";

export class EmailConcreteService implements EmailService {
  async sendConfirmationEmail(user: CreateUserDto) {
    sgMail.setApiKey(process.env.SEND_GRID_MAIL_API_KEY!);

    const template = "<strong>Confirm your registration</strong>";

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
