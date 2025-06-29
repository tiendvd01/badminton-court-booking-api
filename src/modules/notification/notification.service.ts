import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entity/notification.entity';
import { NotificationsGateway } from 'common/websocket/NotificationsGateway';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async createNotification(
    type: string,
    userId: number,
    data: any,
  ): Promise<Notification> {
    // Create and save notification in database

    const notification = this.notificationRepository.create({
      user_id: userId,
      type,
      data,
    });
    
    const savedNotification = await this.notificationRepository.save(notification);
    
    return savedNotification;
  }

  async getUserNotifications(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
    });
    
    if (!notification) {
      throw new Error('Notification not found');
    }
    
    notification.is_read = true;
    return this.notificationRepository.save(notification);
  }

  async markAllAsRead(userId: number): Promise<void> {
    await this.notificationRepository.update(
      { user_id: userId, is_read: false },
      { is_read: true }
    );
  }
}