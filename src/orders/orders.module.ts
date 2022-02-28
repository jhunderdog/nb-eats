import { Restaurant } from './../restaurants/entities/restaurant.entity';
import { OrderResolver } from './orders.resolver';
import { OrderService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Order } from './entities/order.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Restaurant])],
    providers: [
        OrderService,
        OrderResolver,
    ]
})
export class OrdersModule {}
