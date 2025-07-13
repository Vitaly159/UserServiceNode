import { IsEmail, IsString, IsNotEmpty, IsNumber } from "class-validator";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
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
