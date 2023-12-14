import { Either, left, right } from "@/core/either";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";
import { HashComparer } from "../crypto/hash-comparer";
import { Encrypter } from "../crypto/encrypter";
import { UID } from "@/core/entities/UID";

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUserUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    accessToken: string;
    user: {
      id: string;
      email: string;
    };
  }
>;

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new InvalidCredentialsError());
    }

    const passwordValid = await this.hashComparer.compare(
      password,
      user.password
    );

    if (!passwordValid) {
      return left(new InvalidCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    });

    return right({
      accessToken,
      user: {
        id: user.id.toValue(),
        email: user.email,
      },
    });
  }
}
