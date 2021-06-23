import { Link } from "react-router-dom"
import illustrationImg from "../../assets/images/illustration.svg"
import logoImg from "../../assets/images/logo.svg"
import { PageAuth, Aside, Main, MainContent } from "../auth"
import { Button } from "../../components/button/Button"
import { useContext } from "react"
import { AuthContext } from "../../App"

export const NewRoom = () => {
  const { user } = useContext(AuthContext)

  return (
    <PageAuth>
      <Aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </Aside>

      <Main>
        <MainContent>
          <img src={logoImg} alt="Letmeask" />
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form>
            <input
              type="text"
              placeholder="Nome da sala"
            />
            <Button type="submit">
              Criar
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link> </p>
        </MainContent>
      </Main>
    </PageAuth>
  )
}