import { IRegistrationUsecase } from "../../../../application/usecase/registration/registration.usecase";
import { IRegistrationRequest } from "../../../../application/usecase/registration/request/registration.request";
import { ControllerInputType } from '../../../../../../../../back/src/infrastructure/delivery/types/controllerInputType';

export class RegistrationController {
  constructor(
    private readonly usecase: IRegistrationUsecase,
    private readonly request: IRegistrationRequest,
  ) {}

  async register({ req, resp }: ControllerInputType) {
    const response = await this.usecase.execute(this.request.create(req.firstname, req.lastname, req.email, req.plainPassword));

    resp.statusCode = response.getStatusCode();
    resp.data = response.getData()
    resp.end();
  }
}