import { expect, describe, it } from 'vitest'
import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  } else {
    return left('error')
  }
}

describe('Testing Either', () => {
  it('success result', async () => {
    const result = doSomething(true)

    if (result.isRight()) {
      console.log(result.value)
    }

    expect(result.isRight()).toBe(true)
    expect(result.isLeft()).toBe(false)
  })

  it('error result', async () => {
    const result = doSomething(false)
    expect(result.isRight()).toBe(false)
    expect(result.isLeft()).toBe(true)
  })
})
