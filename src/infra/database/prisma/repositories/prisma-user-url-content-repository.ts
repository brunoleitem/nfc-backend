import { UserUrlContentRepository } from "@/domain/url/application/repositories/url-content-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UserUrlContent } from "@/domain/url/enterprise/entities/user-url-content";
import { PrismaUserUrlContentMapper } from "../mappers/prisma-user-url-content-mapper";

@Injectable()
export class PrismaUserUrlContentRepository
  implements UserUrlContentRepository
{
  constructor(private prisma: PrismaService) {}

  async findByUrl(urlid: string): Promise<UserUrlContent[] | null> {
    const content = await this.prisma.userUrlContent.findMany({
      where: {
        url_id: urlid,
      },
    });
    return content.map(PrismaUserUrlContentMapper.toDomain);
  }

  async findById(id: string): Promise<UserUrlContent | null> {
    const content = await this.prisma.userUrlContent.findUnique({
      where: {
        id,
      },
    });

    if (!content) {
      return null;
    }
    return PrismaUserUrlContentMapper.toDomain(content);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.userUrlContent.delete({ where: { id } });
  }
  save(url: UserUrlContent): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create(urlContent: UserUrlContent): Promise<void> {
    const data = PrismaUserUrlContentMapper.toPrisma(urlContent);
    await this.prisma.userUrlContent.create({ data });
  }
}
