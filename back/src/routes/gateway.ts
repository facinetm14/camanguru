import { IncomingMessage, ServerResponse } from 'http';
import { RequestError } from '../core/enum/RequestError';
export class Gateway {

    routes: Map<string, string> = new Map([
        ['/', 'baseRouter'],
        ['/auth', 'authRouter']
    ]);

    dispatch(req: IncomingMessage, resp: ServerResponse): void {
        
    }

    sanitizeRequest(url: string): void {
        const base = url.split('/')[0];
        if (!this.routes.has(base)) {
            throw new Error(RequestError.NOT_FOUND);
        }
    }
}