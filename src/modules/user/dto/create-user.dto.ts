export class CreateUserDto {
    name: string;
    username: string;
    password: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
}