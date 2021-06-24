import { useHistory } from 'react-router-dom'
import illustrationImg from "../../assets/images/illustration.svg"
import logoImg from "../../assets/images/logo.svg"
import googleIconImg from "../../assets/images/google-icon.svg"
import { PageAuth, Aside, Main, MainContent, Separator, CreateRoom } from "../auth"
import { Button } from "../../components/button/Button"
import { useAuth } from '../../hooks/useAuth'
import { FormEvent } from 'react'
import { useState } from 'react'
import { database } from '../../services/firebase'

export const Home = () => {
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth();
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
      history.push('/rooms/new')
    }

  async function  handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exist.')
      return;
    }

    history.push(`rooms/${roomCode}`)
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
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
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