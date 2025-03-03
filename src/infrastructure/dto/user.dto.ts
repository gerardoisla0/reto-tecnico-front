export interface UserDTO {
  saveUserRQ: {
    name: string,
    email: string,
    password: string,
    id?: number
  }
}
