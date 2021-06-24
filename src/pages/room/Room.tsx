import logoImg from "../../assets/images/logo.svg";
import { Button } from "../../components/button/Button";
import { PageRoom, Content, RoomTitle, FormFooter, MainContent, Form, UserInfo } from "./style"
import { RoomCode } from "../../components/roomCode/RoomCode"
import { useParams } from "react-router-dom";
import { FirebaseQuestions, RoomParams, Question } from "./types"
import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { useEffect } from "react";

export const Room = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [roomId])

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in')
    }
    
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('');
  }

  return (
    <PageRoom>
      <header>
        <Content>
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId}/>
        </Content>
      </header>

      <MainContent>
        <RoomTitle>
          <h1>Sala {title} </h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </RoomTitle>

        <Form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <FormFooter>
            {user ? (
              <UserInfo>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </UserInfo>
            ) : (
              <span>Para enviar uma pergunta <button>faça seu login</button>.</span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </FormFooter>
        </Form>
        {/* {JSON.stringify(questions)} */}
      </MainContent>
    </PageRoom>
  )
}