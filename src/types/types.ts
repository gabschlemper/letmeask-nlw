export type AuthContextType = {
  user: User | undefined, 
  signInWithGoogle: () => Promise<void>,
}

export type User = {
  id: string,
  name: string,
  avatar: string,
}