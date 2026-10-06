import { IsString, Length, IsInt, Min, IsOptional } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @Length(3, 20)
  sku: string;

  @IsString()
  @Length(2, 100)
  name: string;

  @IsString()
  category: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  stockQuantity?: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  priceUnits?: number;
}
