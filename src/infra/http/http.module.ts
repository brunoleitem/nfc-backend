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
import { GetUserUrlsUseCase } from "@/domain/url/application/use-cases/get-user-urls-by-user";
import { DeleteUserUrlController } from "./controllers/url/delete-url-controller";
import { DeleteUserUrlUseCase } from "@/domain/url/application/use-cases/delete-user-url-";
import { GetUrlUseCase } from "@/domain/url/application/use-cases/get-url";
import { GetUrlController } from "./controllers/url/get-url-by-id-controller";
import { EditUserUrlUseCase } from "@/domain/url/application/use-cases/edit-user-url";
import { EditUrlController } from "./controllers/url/edit-url-controller";
import { CreateUserUrlContentUseCase } from "@/domain/url/application/use-cases/create-user-url-content";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateUserUrlController,
    GetUserUrlController,
    DeleteUserUrlController,
    GetUrlController,
    EditUrlController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    CreateUserUrlUseCase,
    GetUserUrlsUseCase,
    DeleteUserUrlUseCase,
    GetUrlUseCase,
    EditUserUrlUseCase,
    CreateUserUrlContentUseCase,
  ],
})
export class HttpModule {}
