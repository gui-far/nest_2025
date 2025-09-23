export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * Receives a string and normaliza it as a slug
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   * @returns
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD') // Remove qualquer tipo de acentuação
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // espaços em branco por vazio
      .replace(/[^\w-]+/g, '') // remove "nao texto" por vazio
      .replace(/_/g, '-') // underscores por hífen
      .replace(/--+/g, '-') // múltiplos hífens por um
      .replace(/^-+|-+$/g, '') // hífens no começo ou no final por vazio

    return new Slug(slugText)
  }
}
