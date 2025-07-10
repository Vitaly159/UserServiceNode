import { IsEmail, IsString, IsNotEmpty, IsNumber } from "class-validator";

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  secondName: string;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}
