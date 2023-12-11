import { Encrypter } from "@/domain/accounts/application/crypto/encrypter";

export class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}
