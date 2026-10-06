import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpCode
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
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.itemsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.itemsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deactivate(@Param(':id') id: string) {
    return this.itemsService.deactivate(id);
  }
}
