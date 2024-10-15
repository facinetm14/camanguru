export class DIContainer {
    
    private constructor() { }

    private static instance: DIContainer;
    private register: Map<string, any> = new Map();

    public getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer();
        }
        return DIContainer.instance;
    }

    public registerClass(name: string, service: any): void {
        this.register.set(name, service);
    }

    public resolve(name: string): any {
        return this.register.get(name);
    }
}