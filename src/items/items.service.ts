import { Injectable, NotFoundException } from '@nestjs/common';

export interface Item {
  id: number;
  sku: string;
  name: string;
  category: string;
  stockQuantity: number;
  priceUnits: number;
  currency: string;
  active: boolean;
}

export interface FindAllQuery {
  name?: string;
  active?: string;
  pageNumber: number;
  limitNumber: number;
  sort?: string;
}

@Injectable()
export class ItemsService {
  private nextId = 1;
  private items: Item[] = [];

  create(payload: Partial<Item>) {
    const newItem: Item = {
      id: this.nextId++,
      sku: payload.sku ?? '',
      name: payload.name ?? '',
      category: payload.category ?? '',
      stockQuantity: payload.stockQuantity ?? 0,
      priceUnits: payload.priceUnits ?? 0,
      currency: 'RWF',
      active: true,
    };

    this.items.push(newItem);
    return newItem;
  }

  findAll(query: FindAllQuery) {
    let result = this.items;

    if (query.active) {
      const isActive = query.active === 'true';
      result = result.filter((item) => item.active === isActive);
    } else {
      result = result.filter((item) => item.active);
    }

    if (query.name) {
      const search = query.name.toLowerCase();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search),
      );
    } else if (query.sort === 'priceUnits') {
      result.sort((a, b) => a.priceUnits - b.priceUnits);
    }

    const startIndex = (query.pageNumber - 1) * query.limitNumber;
    return result.slice(startIndex, startIndex + query.limitNumber);
  }

  findOne(id: number) {
    const item = this.items.find(
      (item) => item.id === Number(id) && item.active,
    );
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  update(id: number, payload: Partial<Item>) {
    const item = this.findOne(id);
    Object.assign(item, payload);
    return item;
  }

  deactivate(id: number) {
    const item = this.findOne(id);
    item.active = false;
  }
}
