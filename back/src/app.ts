import { IncomingMessage, ServerResponse } from 'http';
import { Gateway } from './routes/gateway';


export class App {
    constructor(public req: IncomingMessage, public resp: ServerResponse) {
        this.gateway = new Gateway();
    }
    gateway: Gateway;

    run(): void {
        this.gateway.dispatch(this.req, this.resp);    
    }
}