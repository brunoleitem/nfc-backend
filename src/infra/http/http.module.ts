import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { CryptographyModule } from "../crypto/crypto.module";
import { CreateAccountController } from "./controllers/accounts/create-account.controller";
import { RegisterUserUseCase } from "@/domain/accounts/application/use-cases/register-user";

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAccountController],
  providers: [RegisterUserUseCase]
}) 
export class HttpModule {}
