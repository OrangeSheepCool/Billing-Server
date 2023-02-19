import { IsOptional, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  identity: string;

  @IsString()
  credential: string;
}

export class UpdateAuthDto {
  @IsOptional()
  @IsString()
  identity?: string;

  @IsOptional()
  @IsString()
  credential?: string;
}
