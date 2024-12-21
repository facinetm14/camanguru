class UserCreatedEvent implements IEvent {
  public static readonly USER_CREATED = 'user.created';

  getName(): string {
    return UserCreatedEvent.USER_CREATED;
  }

  getPayload(): any {
    return {
      id: 1,
      email: 'toto@example.com'
    }
  }
}