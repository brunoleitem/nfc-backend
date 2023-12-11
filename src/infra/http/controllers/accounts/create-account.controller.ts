import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { z } from 'zod'
import { Public } from '@/infra/auth/public'
import { RegisterUserUseCase } from '@/domain/accounts/application/use-cases/register-user'
import { UserAlreadyExistsError } from '@/domain/accounts/application/use-cases/errors/user-exists-error'
import { UserURLAlreadyExistsError } from '@/domain/accounts/application/use-cases/errors/url-exists-error'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  url: z.string()
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password, url } = body
    
    const result = await this.registerUser.execute({
      name,
      email,
      password,
      url
    })

    if(result.isLeft()) {
      const error = result.value

      switch(error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        case UserURLAlreadyExistsError:
          throw new ConflictException(error.message)
        default: 
          throw new BadRequestException(error.message)
      }
    }
  }
}
