import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CryptographyModule } from "../crypto/crypto.module";
import { CreateAccountController } from "./controllers/accounts/create-account.controller";
import { RegisterUserUseCase } from "@/domain/accounts/application/use-cases/register-user";
import { AuthenticateController } from "./controllers/accounts/authenticate.controller";
import { AuthenticateUserUseCase } from "@/domain/accounts/application/use-cases/authenticate-user";
import { CreateUserUrlController } from "./controllers/url/create-url-controller";
import { CreateUserUrlUseCase } from "@/domain/url/application/use-cases/create-user-url";
import { GetUserUrlController } from "./controllers/url/get-user-urls-by-user-controller";
import { GetUserUrlsByUserUseCase } from "@/domain/url/application/use-cases/get-user-urls-by-user";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateUserUrlController,
    GetUserUrlController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    CreateUserUrlUseCase,
    GetUserUrlsByUserUseCase,
  ],
})
export class HttpModule {}
