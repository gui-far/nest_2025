import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import type { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import z from 'zod'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) { }

  @Post()
  async handle(
    // Poderia ser assim
    // @UsePipes(new ZodValidationPipe(createAccountBodySchema))

    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const { sub: userId } = user


    await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: []
    })

    return 'ok'
  }


}
