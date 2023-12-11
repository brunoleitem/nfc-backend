import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CryptographyModule } from "../crypto/crypto.module";
import { CreateAccountController } from "./controllers/accounts/create-account.controller";
import { RegisterUserUseCase } from "@/domain/accounts/application/use-cases/register-user";
import { AuthenticateController } from "./controllers/accounts/authenticate.controller";
import { AuthenticateUserUseCase } from "@/domain/accounts/application/use-cases/authenticate-user";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAccountController, AuthenticateController],
  providers: [RegisterUserUseCase, AuthenticateUserUseCase],
})
export class HttpModule {}
