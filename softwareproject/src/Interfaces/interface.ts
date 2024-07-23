export interface Message {
    id: number;
    message: string;
    sender: "user" | "bot";
    image?: string;
    loadingImage?: boolean;
  }