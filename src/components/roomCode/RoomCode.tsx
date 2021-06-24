import copyImg from "../../assets/images/copy.svg"
import { ButtonRoomCode } from "./style"
import { RoomCodeProps } from "./types"

export const RoomCode = (props: RoomCodeProps) => {

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <ButtonRoomCode onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala {props.code}</span>
    </ButtonRoomCode>
  )
}