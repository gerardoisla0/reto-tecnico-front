export interface ResponseDTO {
  message: string,
  saveUserRS?: SaveUserRS,
  authUserRS?: AuthUserRS
}

interface SaveUserRS{
  name : string,
  email : string
}

interface AuthUserRS{
  token : string
}

