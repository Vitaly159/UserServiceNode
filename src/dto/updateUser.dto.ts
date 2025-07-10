import { IsEmail, IsString, IsNumber, Length, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  secondName?: string;

  @IsOptional()
  @IsNumber()
  roleId?: number;

  @IsOptional()
  @IsString()
  @Length(8, 20, { message: "Пароль должен быть от 8 до 20 символов" })
  password?: string;
}
