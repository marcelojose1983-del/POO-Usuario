import { useState, type FormEvent } from 'react'
import { Usuario } from './Usuario'
import './App.css'

function App() {
  const [usuario, setUsuario] = useState(() => new Usuario('Ana Souza', 28, 'poo2026'))
  const [tentativa, setTentativa] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmacao, setConfirmacao] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [autenticado, setAutenticado] = useState(false)

  function verificarSenha(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const senhaCorreta = usuario.verificarSenha(tentativa)
    setAutenticado(senhaCorreta)
    setMensagem(senhaCorreta ? 'Senha correta. Acesso liberado.' : 'Senha incorreta. Tente novamente.')
    setTentativa('')
  }

  function redefinirSenha(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (novaSenha !== confirmacao) {
      setMensagem('As senhas não coincidem. Confira os campos e tente novamente.')
      return
    }

    setUsuario(new Usuario(usuario.nome, usuario.idade, novaSenha))
    setNovaSenha('')
    setConfirmacao('')
    setAutenticado(false)
    setMensagem('Senha redefinida. Use a nova senha na próxima tentativa.')
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <span className="brand-mark" aria-hidden="true">U</span>
        <span className="brand-name">Conta pessoal</span>
        <span className="topbar-label">Demonstração de POO</span>
      </header>

      <section className="profile" aria-labelledby="page-title">
        <p className="eyebrow">ÁREA DO USUÁRIO</p>
        <h1 id="page-title">Olá, {usuario.nome.split(' ')[0]}.</h1>
        <p className="profile-description">{usuario.apresentar()}</p>
      </section>

      <div className="workspace">
        <section className="access-panel" aria-labelledby="access-title">
          <div className="panel-heading">
            <span className="step-number">01</span>
            <div>
              <p className="eyebrow">AUTENTICAÇÃO</p>
              <h2 id="access-title">Acesse sua conta</h2>
            </div>
          </div>

          <form className="form" onSubmit={verificarSenha}>
            <label htmlFor="tentativa">Digite sua senha</label>
            <input
              id="tentativa"
              type="password"
              autoComplete="current-password"
              value={tentativa}
              onChange={(event) => setTentativa(event.target.value)}
              placeholder="Sua senha"
              required
            />
            <button className="button button-primary" type="submit">
              Verificar senha <span aria-hidden="true">→</span>
            </button>
          </form>

          <div className={`status ${autenticado ? 'status-success' : ''}`} role="status" aria-live="polite">
            <span className="status-indicator" aria-hidden="true" />
            <span>{mensagem || 'Aguardando tentativa de acesso.'}</span>
          </div>
        </section>

        <section className="reset-panel" aria-labelledby="reset-title">
          <div className="panel-heading">
            <span className="step-number">02</span>
            <div>
              <p className="eyebrow">SEGURANÇA</p>
              <h2 id="reset-title">Redefina sua senha</h2>
            </div>
          </div>

          <form className="form" onSubmit={redefinirSenha}>
            <label htmlFor="nova-senha">Nova senha</label>
            <input
              id="nova-senha"
              type="password"
              autoComplete="new-password"
              value={novaSenha}
              onChange={(event) => setNovaSenha(event.target.value)}
              placeholder="Crie uma senha"
              required
            />

            <label htmlFor="confirmacao">Confirme a nova senha</label>
            <input
              id="confirmacao"
              type="password"
              autoComplete="new-password"
              value={confirmacao}
              onChange={(event) => setConfirmacao(event.target.value)}
              placeholder="Digite novamente"
              required
            />

            <button className="button button-secondary" type="submit">
              Salvar nova senha <span aria-hidden="true">↗</span>
            </button>
          </form>
        </section>
      </div>

      <footer className="page-footer">
        <span>Perfil ativo</span>
        <span className="footer-dot" aria-hidden="true" />
        <span>Usuário · {usuario.idade} anos</span>
      </footer>
    </main>
  )
}

export default App
