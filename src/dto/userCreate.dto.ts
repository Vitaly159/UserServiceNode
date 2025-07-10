import { IsString, Length } from "class-validator";
import { UserDto } from "./user.dto";

export class UserCreateDto extends UserDto {
  @IsString()
  @Length(8, 20, { message: "Пароль должен быть от 8 до 20 символов" })
  password: string;
}
