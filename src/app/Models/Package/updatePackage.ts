export class UpdatePackage {
  id!: string;
  name!: string;
  description!: string;
  groupSize!: number;
  price!: number;
  startDate!: Date;
  endDate!: Date;
  guideId: string="";
  packageBookingStatus: number=0;
}
