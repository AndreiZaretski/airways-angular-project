export interface AuthResponse {
  accessToken?: string,
  user: {
    email: string,
    birthDay: string | Date,
    citizenship: string,
    countryCode: number,
    password?: string,
    firstName: string,
    gender: string,
    lastName: string,
    phoneNumber: number,
    termsUse: boolean,
    id: number
  }
}

export interface AuthResponseLight {

  email: string,
  birthDay: string | Date,
  citizenship: string,
  countryCode: number,
  password?: string,
  firstName: string,
  gender: string,
  lastName: string,
  phoneNumber: number,
  termsUse: boolean,
  id: number

}

export interface AuthLogin {
  email: string,
  password: string,
}

export interface AuthRegistration {
  email: string,
  birthDay: string | Date,
  citizenship: string,
  countryCode: number,
  password: string,
  firstName: string,
  gender: string,
  lastName: string,
  phoneNumber: number,
  termsUse: boolean,
}
