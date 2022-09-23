// import * as bcrypt from 'bcrypt';

// import { jwtConfig } from '~/config';

// export class EncryptHelper {
//   static async encrypt(password: string): Promise<string> {
//     return bcrypt.hash(password, jwtConfig.passwordSaltLength);
//   }

//   static async verify(password: string, hash: string): Promise<boolean> {
//     return bcrypt.compare(password, hash);
//   }
// }

/**
 * I think later we should have an authentication service to do this, not from a helper
 */
