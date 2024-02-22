import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UrlRepository } from "@/domain/url/application/repositories/url-repository";
import { UserUrl } from "@/domain/url/enterprise/entities/user-url";
import { PrismaUserUrlMapper } from "../mappers/prisma-user-url-mapper";
import { UserUrlContentRepository } from "@/domain/url/application/repositories/url-content-repository";

@Injectable()
export class PrismaUserUrlRepository implements UrlRepository {
  constructor(
    private prisma: PrismaService,
    private contentRepository: UserUrlContentRepository
  ) {}

  async findBySlug(slug: string): Promise<UserUrl | null> {
    const userUrl = await this.prisma.userUrl.findFirst({
      where: {
        slug,
      },
      include: {
        user_url_content: true,
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
      include: {
        user_url_content: true,
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
      include: {
        user_url_content: true,
      },
    });

    return userUrls.map(PrismaUserUrlMapper.toDomain);
  }

  async create(userUrl: UserUrl): Promise<void> {
    const data = PrismaUserUrlMapper.toPrisma(userUrl);

    await this.prisma.userUrl.create({ data });

    userUrl.content.map(async (content) => {
      await this.contentRepository.create(content);
    });
  }

  async delete(urlId: string): Promise<void> {
    await this.prisma.userUrl.delete({
      where: {
        id: urlId,
      },
    });
  }

  async save(url: UserUrl): Promise<void> {
    const data = PrismaUserUrlMapper.toPrisma(url);
    console.log(data);
    await this.prisma.userUrl.update({
      where: {
        id: url.id.toString(),
      },
      data,
    });
  }
}
