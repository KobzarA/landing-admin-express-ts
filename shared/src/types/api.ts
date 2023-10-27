type ResolvedRequest<T> = {
  success: true;
  data: T;
};

type RejectedRequest = {
  success: false;
  message: string;
};

type IResponse<T> = ResolvedRequest<T> | RejectedRequest;

export type { IResponse };
