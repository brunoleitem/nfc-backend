import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UsersRepository } from "@/domain/accounts/application/repositories/users-repository";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-users-repository";
import { UserUrlRepository } from "@/domain/url/application/repositories/user-url-repository";
import { PrismaUserUrlRepository } from "./prisma/repositories/prisma-user-url-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: UserUrlRepository,
      useClass: PrismaUserUrlRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, UserUrlRepository],
})
export class DatabaseModule {}
