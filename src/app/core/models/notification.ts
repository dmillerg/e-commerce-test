export interface Notification {
    id:number;
    title: string;
    message: string;
    duration?: number;
    type: NotificationType;
}

export type NotificationType = "SUCCESS" | "ERROR" | "WARNING"