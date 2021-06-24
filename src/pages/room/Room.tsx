import logoImg from "../../assets/images/logo.svg";
import { Button } from "../../components/button/Button";
import { PageRoom, Content, RoomTitle, FormFooter, MainContent, Form} from "./style"
import { RoomCode } from "../../components/roomCode/RoomCode"
import { useParams } from "react-router-dom";
import { RoomParams } from "./types"

export const Room = () => {
  const params = useParams<RoomParams>();

  return (
    <PageRoom>
      <header>
        <Content>
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={params.id}/>
        </Content>
      </header>

      <MainContent>
        <RoomTitle>
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </RoomTitle>

        <Form>
          <textarea
            placeholder="O que você quer perguntar?"
          />
          <FormFooter>
            <span>Para enviar uma pergunta <button>faça seu login</button>.</span>
            <Button type="submit">Enviar pergunta</Button>
          </FormFooter>
        </Form>
      </MainContent>
    </PageRoom>
  )
}