import { QnASchema } from './schema';

namespace QnARequest {
  export type GetList = {
    startDate?: Date;
    endDate?: Date;
    size?: number;
    page?: number;
  };

  export type Create = {
    title: string;
    content: string;
    productId: number;
    images?: string;
    isPrivate?: boolean;
  };

  export type Update = {
    qnaId: number;
    title: string;
    content: string;
    isPrivate?: boolean;
  };

  export type Remove = { qnaId: number };
}

export default QnARequest;
