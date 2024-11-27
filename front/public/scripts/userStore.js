class UserStore {
  constructor() {
    this.state = {};
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }
}

const userStore = new UserStore();

export default userStore;
