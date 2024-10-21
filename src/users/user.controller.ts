import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginDto, RegisterUserDto } from "./dto/user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.userService.register(registerUserDto);
    }

    @Post('login')
    async login(@Body() login: LoginDto) {
        return this.userService.login(login.username, login.password);
    }
}