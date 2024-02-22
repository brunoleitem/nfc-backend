import { UID } from "@/core/entities/UID";
import { UserUrlContent } from "@/domain/url/enterprise/entities/user-url-content";
import { Prisma, UserUrlContent as PrismaUserUrlContent } from "@prisma/client";

export class PrismaUserUrlContentMapper {
  static toDomain(raw: PrismaUserUrlContent): UserUrlContent {
    return UserUrlContent.create(
      {
        title: raw.title,
        content: raw.content,
        url_id: new UID(raw.url_id),
      },
      new UID(raw.id)
    );
  }

  static toPrisma(
    userUrlContent: UserUrlContent
  ): Prisma.UserUrlContentUncheckedCreateInput {
    return {
      id: userUrlContent.id.toString(),
      title: userUrlContent.title,
      content: userUrlContent.content,
      url_id: userUrlContent.url_id.toString(),
    };
  }
}
