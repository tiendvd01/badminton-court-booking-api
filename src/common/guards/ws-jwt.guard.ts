// ws-jwt.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();

    const token = client.handshake.auth?.token;
    console.log("token", token)
    if (!token) return false;

    try {
      const payload = this.jwtService.verify(token);
      client.data.user = payload; // Attach user info to socket
      return true;
    } catch (err) {
      console.error('JWT error:', err.message);
      return false;
    }
  }
}
