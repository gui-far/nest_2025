import { QuestionRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { Either, right } from '@/core/either'

interface FetchRecentQuestionBySlugUseCaseRequest {
  page: number
}

/* interface FetchRecentQuestionBySlugUseCaseResponse {
    questions: Question[]
} */

type FetchRecentQuestionBySlugUseCaseResponse = Either<
  null,
  { questions: Question[] }
>

export class FetchRecentQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionBySlugUseCaseRequest): Promise<FetchRecentQuestionBySlugUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({ questions })
  }
}
