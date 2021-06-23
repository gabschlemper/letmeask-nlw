import { useHistory } from 'react-router-dom'
import illustrationImg from "../../assets/images/illustration.svg"
import logoImg from "../../assets/images/logo.svg"
import googleIconImg from "../../assets/images/google-icon.svg"
import { PageAuth, Aside, Main, MainContent, Separator, CreateRoom } from "../auth"
import { Button } from "../../components/button/Button"
import { useContext } from 'react'
import { AuthContext } from '../../App'

export const Home = () => {
  const history = useHistory();
  const { signInWithGoogle, user } = useContext(AuthContext)

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

      history.push('/rooms/new')
    }

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
          <CreateRoom onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Letmeask" />
            Crie sua sala com o Google
          </CreateRoom>
          <Separator>ou entre em uma sala</Separator>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </MainContent>
      </Main>
    </PageAuth>
  )
}