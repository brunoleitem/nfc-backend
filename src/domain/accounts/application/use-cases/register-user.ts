import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";
import { HashGenerator } from "../crypto/hash-generator";
import { User } from "../../enterprise/entities/user";
import { UserAlreadyExistsError } from "./errors/user-exists-error";
import { Either, left, right } from "@/core/either";
import { UserURLAlreadyExistsError } from "./errors/url-exists-error";

interface RegisterUserUseCaseRequest { 
  name: string;
  email: string;
  url: string;
  password: string;
}

type RegisterUserUseCaseResponse = Either<UserAlreadyExistsError | UserURLAlreadyExistsError, { user: User}>


@Injectable()
export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository, private hashGenerator: HashGenerator) {}

  async execute({
    name,
    email,
    password,
    url
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userExists = await this.usersRepository.findByEmail(email)

    if(userExists) {
      return left(new UserAlreadyExistsError(email));
    }

    const urlExists = await this.usersRepository.findByUrl(url)

    if(urlExists) {
      return left(new UserURLAlreadyExistsError(url))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      url,
      password: hashedPassword
    }) 

    await this.usersRepository.create(user)

    //aq retorno
    return right({
      user
    })
  }
}