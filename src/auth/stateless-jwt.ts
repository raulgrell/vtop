import { AuthenticationService } from '@feathersjs/authentication';

class StatelessService extends AuthenticationService {
  async getPayload(authResult: any, params: any) {
    const payload = await super.getPayload(authResult, params);
    const { user } = authResult;
    if (user && user.permissions) {
      payload.permissions = user.permissions;
    }

    return payload;
  }
}
