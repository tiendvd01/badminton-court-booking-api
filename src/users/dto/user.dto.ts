export class RegisterUserDto {
  name: string;
  username: string;
  password: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export class LoginDto {
  username: string;
  password: string;
}
