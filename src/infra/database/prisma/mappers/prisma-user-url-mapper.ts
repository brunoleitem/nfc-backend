import { UID } from "@/core/entities/UID";
import { UserUrl } from "@/domain/url/enterprise/entities/user-url";
import { Slug } from "@/domain/url/enterprise/entities/value-objects/slug";
import {
  Prisma,
  UserUrl as PrismaUserUrl,
  UserUrlContent as PrismaUserUrlContent,
} from "@prisma/client";
import { PrismaUserUrlContentMapper } from "./prisma-user-url-content-mapper";

type PrismaUrlDetails = PrismaUserUrl & {
  user_url_content: PrismaUserUrlContent[];
};
export class PrismaUserUrlMapper {
  static toDomain(raw: PrismaUrlDetails): UserUrl {
    return UserUrl.create(
      {
        title: raw.title,
        slug: Slug.create(raw.slug),
        user_id: new UID(raw.user_id),
        content: raw.user_url_content.map(PrismaUserUrlContentMapper.toDomain),
      },
      new UID(raw.id)
    );
  }

  static toPrisma(userUrl: UserUrl): Prisma.UserUrlUncheckedCreateInput {
    return {
      id: userUrl.id.toString(),
      title: userUrl.title,
      slug: userUrl.slug.value,
      user_id: userUrl.user_id.toString(),
    };
  }
}
