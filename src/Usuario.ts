export class Usuario {
  nome: string
  idade: number
  senha: string

  constructor(nome: string, idade: number, senha: string) {
    this.nome = nome
    this.idade = idade
    this.senha = senha
  }

  apresentar(): string {
    return `Seu perfil está ativo. Você tem ${this.idade} anos.`
  }

  verificarSenha(tentativa: string): boolean {
    return tentativa === this.senha
  }
}