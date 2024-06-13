import { IsNotEmpty } from 'class-validator';
import { ProgressStatement } from '../entities/progress.entity';

export class SetProgressStateDto {
  @IsNotEmpty()
  readonly state: ProgressStatement;
}
