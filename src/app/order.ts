import {Reception} from './reception';
import {Client} from './client';
import {Material} from './material';
import {Process} from './process';

export class Order {
  id: number;
  name: string;
  number: string;
  desc: string;
  accountNumber: string;
  discount: number;
  discountSum: number;
  count: number;
  summa: number;
  area: number;
  perimeter: number;
  updateDate: string;
  receptionOfOrder: Reception;
  client: Client;
  items: OrderItem[];
}

export class OrderItem {
  id: number;
  desc: string;
  number: number;
  length: number;
  width: number;
  count: number;
  area: number;
  perimeter: number;
  processSum: number;
  summa: number;
  material: Material;
  process: Process[];
}
