import { UID } from "@/core/entities/UID";
import { User, UserProps } from "@/domain/accounts/enterprise/entities/user";
import { PrismaUserMapper } from "@/infra/database/prisma/mappers/prisma-users-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
export function makeUser(override: Partial<UserProps> = {}, id?: UID) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      url: faker.internet.url(),
      ...override,
    },
    id
  );
  return user;
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrimsaUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data);

    await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    });

    return user;
  }
}
