import { QuestionRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface FetchRecentQuestionUseCaseRequest {
  page: number
}

/* interface FetchRecentQuestionUseCaseResponse {
    questions: Question[]
} */

type FetchRecentQuestionUseCaseResponse = Either<
  null,
  { questions: Question[] }
>

@Injectable()
export class FetchRecentQuestionUseCase {
  constructor(private questionsRepository: QuestionRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({ questions })
  }
}
