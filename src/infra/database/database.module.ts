import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UsersRepository } from "@/domain/accounts/application/repositories/users-repository";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-users-repository";
import { UrlRepository } from "@/domain/url/application/repositories/url-repository";
import { PrismaUserUrlRepository } from "./prisma/repositories/prisma-user-url-repository";
import { UserUrlContentRepository } from "@/domain/url/application/repositories/url-content-repository";
import { PrismaUserUrlContentRepository } from "./prisma/repositories/prisma-user-url-content-repository";

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
    {
      provide: UserUrlContentRepository,
      useClass: PrismaUserUrlContentRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    UrlRepository,
    UserUrlContentRepository,
  ],
})
export class DatabaseModule {}
