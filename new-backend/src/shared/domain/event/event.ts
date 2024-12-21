
interface IEvent {
  getName(): string;
  getPayload(): any;
}

interface IEventDispatcher {
  dispatch(event: IEvent): Promise<any>
  dispatchAsync(event: IEvent): void
}
