export class Device {
    constructor(
        public poId: string,
        public deviceType: string,
        public brand: string,
        public serialNumber: string,
        public assetTagNumber: string,
        public model: string,
        public status: string,
        public id?: string,
        public createdAt?: string,
        public updatedAt?: string,
    ) {
        
    }
}