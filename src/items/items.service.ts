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

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  private nextId = 1;

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

  findAll() {
    return this.items.filter((item) => item.active);
  }

  findOne(id: string) {
    const item = this.items.find(
      (item) => item.id === Number(id) && item.active,
    );
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  update(id: string, payload: Partial<Item>) {
    const item = this.findOne(id);
    Object.assign(item, payload);
    return item;
  }

  deactivate(id: string) {
    const item = this.findOne(id);
    item.active = false;
  }
}
