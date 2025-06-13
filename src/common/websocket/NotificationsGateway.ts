// notifications.gateway.ts
import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { WsJwtGuard } from 'common/guards/ws-jwt.guard';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins, adjust for production
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @UseGuards(WsJwtGuard)
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Optional: send to specific user/room
  sendToUser(eventName: string, userId: string, data: any) {
    console.log(`Sending event ${eventName} to user ${userId}`);
    this.server.emit(`${userId}_${eventName}`, data);
  }
}
