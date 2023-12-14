import { UID } from "@/core/entities/UID";
import { UserUrl } from "@/domain/url/enterprise/entities/user-url";
import { Slug } from "@/domain/url/enterprise/entities/value-objects/slug";
import { Prisma, UserUrl as PrismaUserUrl } from "@prisma/client";

export class PrismaUserUrlMapper {
  static toDomain(raw: PrismaUserUrl): UserUrl {
    return UserUrl.create(
      {
        title: raw.title,
        slug: Slug.create(raw.slug),
        user_id: new UID(raw.user_id),
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
