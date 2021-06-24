import {ButtonStyle} from "./style"
import { ButtonProps } from "./types"

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonStyle {...props}/>
  )
}