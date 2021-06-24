import { FormEvent, useState } from "react" 
import { Link, useHistory } from "react-router-dom"
import illustrationImg from "../../assets/images/illustration.svg"
import logoImg from "../../assets/images/logo.svg"
import { PageAuth, Aside, Main, MainContent } from "../auth"
import { Button } from "../../components/button/Button"
import { database } from "../../services/firebase"
import { useAuth } from "../../hooks/useAuth"

export const NewRoom = () => {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorID: user?.id,
    })
    history.push(`/rooms/'${firebaseRoom.key}`)
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
          <h2>Criar uma nova sala</h2>
          <form  onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
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