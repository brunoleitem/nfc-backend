import { FakeEncrypter } from "test/crypto/fake-encrypter";
import { FakeHasher } from "test/crypto/fake-hasher";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { AuthenticateUserUseCase } from "./authenticate-user";
import { makeUser } from "test/factories/make-user";
import { UID } from "@/core/entities/UID";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHasher: FakeHasher;
let encrypter: FakeEncrypter;

let sut: AuthenticateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHasher = new FakeHasher();
    encrypter = new FakeEncrypter();

    sut = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      encrypter
    );
  });

  it("should be able to authenticate user", async () => {
    const user = makeUser({
      email: "johndoe@example.com",
      password: await fakeHasher.hash("123456"),
      url: "teste123",
    });

    inMemoryUsersRepository.items.push(user);

    const result = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
      user: {
        id: expect.any(UID),
        email: expect.any(String),
        url: expect.any(String),
      },
    });
  });
});
