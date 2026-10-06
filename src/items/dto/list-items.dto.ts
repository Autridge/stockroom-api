import { IsOptional, IsString, IsInt, Min, Max, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class ListItemDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  active?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageNumber?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(100)
  limitNumber?: number = 10;

  @IsOptional()
  @IsIn(['name', 'priceUnits'])
  sort?: string;
}
