import { IsNumber, Min } from 'class-validator';

export class IdParam {
  @IsNumber()
  @Min(1)
  id: number;
}
