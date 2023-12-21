import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UsersRepository } from "@/domain/accounts/application/repositories/users-repository";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-users-repository";
import { UrlRepository } from "@/domain/url/application/repositories/url-repository";
import { PrismaUserUrlRepository } from "./prisma/repositories/prisma-user-url-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: UrlRepository,
      useClass: PrismaUserUrlRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, UrlRepository],
})
export class DatabaseModule {}
