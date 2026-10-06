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
  UsePipes,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ListItemDto } from './dto/list-items.dto';
import { SkuNormalizerPipe } from './pipes/sku-normalizer.pipe';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UsePipes(SkuNormalizerPipe)
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll(@Query() query: ListItemDto) {
    return this.itemsService.findAll(query);
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
