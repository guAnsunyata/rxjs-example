export interface Subscription {
  unsubscribe: () => void;
}

export interface Observer {
  next: (value?: any) => void;
  error: (error: any) => void;
  complete: () => void;
}
export type SubscribeFunction = (observer: Observer) => void;
