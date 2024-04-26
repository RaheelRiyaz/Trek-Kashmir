export class Cart {
  id: string;
  quantity!: number;
  pricePerDay!: number;
  filePath!: string;
  name!: string;
  constructor(
    id: string,
    quantity: number,
    filePath: string,
    pricePerDay: number,
    name: string,
  ) {
    this.id = id;
    this.quantity = quantity;
    this.pricePerDay = pricePerDay;
    this.filePath = filePath;
    this.name=name;
  }
}
