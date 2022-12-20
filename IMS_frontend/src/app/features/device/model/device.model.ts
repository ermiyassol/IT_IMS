export class Device {
    constructor(
        public brand: string,
        public serialNumber: string,
        public assetTagNumber: string,
        public model: string,
        public status: string,
        public poId?: string,
        public id?: string,
        public createdAt?: string,
        public updatedAt?: string,
    ) {
        
    }
}