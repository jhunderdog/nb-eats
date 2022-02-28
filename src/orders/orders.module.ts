import { Restaurant } from './../restaurants/entities/restaurant.entity';
import { OrderResolver } from './orders.resolver';
import { OrderService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Dish } from 'src/restaurants/entities/dish.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Restaurant, OrderItem, Dish])],
    providers: [
        OrderService,
        OrderResolver,
    ]
})
export class OrdersModule {}
