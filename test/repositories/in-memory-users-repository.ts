import { DomainEvents } from "@/core/events/domain-events";
import { UsersRepository } from "@/domain/accounts/application/repositories/users-repository";
import { User } from "@/domain/accounts/enterprise/entities/user";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) return null;

    return user;
  }

  async create(user: User): Promise<void> {
    this.items.push(user);

    DomainEvents.dispatchEventsForAggregate(user.id);
  }
}
