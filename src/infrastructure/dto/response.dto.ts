export interface ResponseDTO {
  message: string,
  saveUserRS?: SaveUserRS,
}

interface SaveUserRS{
  name : string,
  email : string
}
