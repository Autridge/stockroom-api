import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode,
  ParseIntPipe,
  Query,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() body: any) {
    return this.itemsService.create(body);
  }

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('active') active?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('sort') sort?: string,
    @Headers('user-agent') userAgent?: string,
  ) {
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const limitNumber = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));

    const allowedSorts = ['name', 'priceUnits'];
    if (sort && !allowedSorts.includes(sort)) {
      throw new BadRequestException(
        `Invalid sort field. Allowed: ${allowedSorts.join}`,
      );
    }
    return this.itemsService.findAll({ name, active, pageNumber, limitNumber });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    this.itemsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.itemsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.deactivate(id);
  }
}
