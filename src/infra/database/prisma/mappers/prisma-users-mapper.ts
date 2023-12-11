import { UID } from "@/core/entities/UID";
import { User } from "@/domain/accounts/enterprise/entities/user";
import { Prisma, User as PrismaUser} from "@prisma/client";

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create({
      name: raw.name,
      email: raw.email,
      password: raw.password,
      url: raw.url
    },
    new UID(raw.id)
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      url: user.url
    }
  }
}