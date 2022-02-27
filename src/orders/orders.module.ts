import { OrderResolver } from './orders.resolver';
import { OrderService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Order } from './entities/order.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    providers: [
        OrderService,
        OrderResolver,
    ]
})
export class OrdersModule {}
