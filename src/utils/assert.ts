class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AssertionError';
  }
}

export default function assert(value: any, message: string) {
  if (!value) {
    throw new AssertionError(message);
  }
}
