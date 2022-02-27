import { CategoryRepository } from './repositories/category.repository';
import { RestaurantService } from './restaurants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantResolver, CategoryResolver, DishResolver } from './restaurants.resolver';
import { Module } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository])],
    providers: [RestaurantResolver, RestaurantService, CategoryResolver, DishResolver]
})
export class RestaurantsModule {
}
