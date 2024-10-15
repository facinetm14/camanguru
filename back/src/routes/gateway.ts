import { IncomingMessage, ServerResponse } from 'http';
import { RequestError } from '../core/enum/RequestError';
import { AllowedRoutes } from '../core/enum/AllowedRoutes';
import { Router } from './router';
import { factoryUserRoute } from '../core/utils/factory';
import { InputError } from '../core/errors/inputError';

export class Gateway {
    private registry: Map<AllowedRoutes, Router> = new Map();

    constructor() {
        this.registry.set(AllowedRoutes.USERS, factoryUserRoute());
    }
    async dispatch(req: IncomingMessage, resp: ServerResponse): Promise<void> {
        const url = req.url ?? '';
        try {
            this.sanitizeUrl(url);
            this.resolveRoute(req, resp, this.reducer(this.registry.get(url as AllowedRoutes)!));
        }
        catch (error) {
            if (error instanceof InputError && error.name == RequestError.NOT_FOUND) {
                resp.statusCode = 404;
            }
            resp.end();
        } 
    }

    private sanitizeUrl(route: string): void {
        if (!Object.values(AllowedRoutes).includes(route  as AllowedRoutes)) {
            throw new InputError({
                name: RequestError.NOT_FOUND,
            })
        }
    }

    private async resolveRoute(req: IncomingMessage, resp: ServerResponse, callback: Function): Promise<void> {
        return callback(req, resp);
    }

    reducer(routeHandler: Router): (req: IncomingMessage, resp: ServerResponse) => void {
        return routeHandler.handleRoute;
    }

}