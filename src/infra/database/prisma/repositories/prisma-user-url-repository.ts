import { UsersRepository } from "@/domain/accounts/application/repositories/users-repository";
import { User } from "@/domain/accounts/enterprise/entities/user";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "../mappers/prisma-users-mapper";
import { UserUrlRepository } from "@/domain/url/application/repositories/user-url-repository";
import { UserUrl } from "@/domain/url/enterprise/entities/user-url";
import { PrismaUserUrlMapper } from "../mappers/prisma-user-url-mapper";

@Injectable()
export class PrismaUserUrlRepository implements UserUrlRepository {
  constructor(private prisma: PrismaService) {}

  async findBySlug(slug: string): Promise<UserUrl | null> {
    const userUrl = await this.prisma.userUrl.findFirst({
      where: {
        slug,
      },
    });
    if (!userUrl) {
      return null;
    }
    return PrismaUserUrlMapper.toDomain(userUrl);
  }

  async findById(id: string): Promise<UserUrl | null> {
    const userUrl = await this.prisma.userUrl.findUnique({
      where: {
        id,
      },
    });
    if (!userUrl) {
      return null;
    }
    return PrismaUserUrlMapper.toDomain(userUrl);
  }

  async findManyByUsers(user_id: string): Promise<UserUrl[]> {
    const userUrls = await this.prisma.userUrl.findMany({
      where: {
        user_id,
      },
    });

    return userUrls.map(PrismaUserUrlMapper.toDomain);
  }

  async create(userUrl: UserUrl): Promise<void> {
    const data = PrismaUserUrlMapper.toPrisma(userUrl);

    await this.prisma.userUrl.create({ data });
  }
}
