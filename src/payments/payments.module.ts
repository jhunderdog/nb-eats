import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentResolver } from './payments.resolver';
import { PaymentService } from './payments.service';
import { Module } from '@nestjs/common';
import { Payment } from './entities/payment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Payment, Restaurant])],
    providers: [PaymentService, PaymentResolver],
})
export class PaymentsModule {}
