import { AuthResponseLight } from 'src/app/core/models/interface';

export interface IAuthState {
  authState: AuthResponseLight | null,
}

export const AuthStateInit: IAuthState = {
  authState: null,
};
