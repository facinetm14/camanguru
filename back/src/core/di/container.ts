export class DIContainer {
    
    private static register: Map<string, any> = new Map();

    public static registerClass(name: string, service: any): void {
        DIContainer.register.set(name, service);
    }

    public static resolve(name: string): any {
        return DIContainer.register.get(name);
    }
}