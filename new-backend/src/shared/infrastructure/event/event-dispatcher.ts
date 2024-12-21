
class EventDispatcher implements IEventDispatcher {
  constructor(private eventEmitter: EventEmitter2) {}

  dispatch(event: IEvent): Promise<any> {
    this.eventEmitter.emit(
      event.getName(),
      event.getPayload()
    );
  }
  dispatchAsync(event: IEvent): void {}
}