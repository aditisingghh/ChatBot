export type MessageRole = "user" | "model";

export interface MessagePart {
    text: string;
  }

  export interface Message {
    role: MessageRole;
    parts: MessagePart[];
  }

  export interface ChatHistory extends Array<Message> {}

  export interface GenerationConfig {
    temperature: number;
    topP: number;
    responseMimeType: string;
  }
  //Typescript interface

  export interface ChatSettings {
    temperature: number;
    model: string;
    systemInstruction: string;
  }