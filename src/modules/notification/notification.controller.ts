
import { Controller, Get, Param, Patch, UseGuards, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'common/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getUserNotifications(@Req() req: Request) {
    return this.notificationService.getUserNotifications(req.user.id);
  }

  @Patch(':id/read')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(+id);
  }

  @Patch('read-all')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async markAllAsRead(@Req() req: Request) {
    await this.notificationService.markAllAsRead(req.user.id);
    return { success: true };
  }
}

