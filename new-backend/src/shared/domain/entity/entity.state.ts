export class EntityState {
  private _isValid;
  private _context: Record<string, any>

  markAsValid(): void {
    this._isValid = true;
    this._context = {}
  }

  markAsInValid(context: Record<string, any>): void {
    this._isValid = false;
    this._context = context;
  }

  isValid(): boolean {
    return this._isValid;
  }

  getContext(): Record<string, any> {
    return this._context;
  }
}
