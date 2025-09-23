// Permite que o "tratamento" de IDs unicos seja centralizado facilitando a manutencao
// e tambem facilita a mudanca de estrategia de geracao de IDs unicos

export class UniqueEntityID {
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? crypto.randomUUID()
  }

  equals(id: UniqueEntityID) {
    return id.toValue() === this.value
  }
}
