import { SearchRestaurantOutput, SearchRestaurantInput } from './dtos/search-restaurant.dto';
import { RestaurantOutput, RestaurantInput } from './dtos/restaurant.dto';
import { RestaurantsInput, RestaurantsOutput } from './dtos/restaurants.dto';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { DeleteRestaurantOutput, DeleteRestaurantInput } from './dtos/delete-restaurant.dto';
import { EditRestaurantOutput, EditRestaurantInput } from './dtos/edit-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CreateRestaurantInput, CreateRestaurantOutput } from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurants.service';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User, UserRole } from 'src/users/entities/user.entity';
import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/auth/role.decorator';
import { Category } from './entities/category.entity';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';

@Resolver(of => Restaurant)
export class RestaurantResolver {
    constructor(private readonly restaurantService: RestaurantService){}
    @Mutation(returns => CreateRestaurantOutput)
    @Role(["Owner"])
    async createRestaurant(
        @AuthUser() authUser: User,
        @Args('input') createRestaurantInput: CreateRestaurantInput,
    ): Promise<CreateRestaurantOutput> {
        return this.restaurantService.createRestaurant(
            authUser,
            createRestaurantInput,
        );
    }

    @Mutation(returns => EditRestaurantOutput)
    @Role(["Owner"])
    editRestaurant(
        @AuthUser() owner: User,
        @Args('input')  editRestaurantInput: EditRestaurantInput
    ) : Promise<EditRestaurantOutput> {
        return this.restaurantService.editRestaurant(owner, editRestaurantInput);
    }

    @Mutation(returns => DeleteRestaurantOutput)
    @Role(['Owner'])
    deleteRestaurant(
        @AuthUser() owner:User,
        @Args('input') deleteRestaurantInput:DeleteRestaurantInput,
    ) : Promise<DeleteRestaurantOutput> {
        return this.restaurantService.deleteRestaurant(
            owner, 
            deleteRestaurantInput
            );
    }

    @Query(returns => RestaurantsOutput)
    restaurants(@Args('input') restaurantInput: RestaurantsInput
    ): Promise<RestaurantsOutput> {
        return this.restaurantService.allRestaurants(restaurantInput);
    }

    @Query(returns => RestaurantOutput)
    restaurant(
        @Args('input') restaurantInput: RestaurantInput,        
    ) :  Promise<RestaurantOutput> {
        return this.restaurantService.findRestaurantById(restaurantInput);
    }

    @Query(returns => SearchRestaurantOutput)
    searchRestaurant(
        @Args('input') searchRestaurantInput: SearchRestaurantInput
    ) : Promise<SearchRestaurantOutput> {
        return this.restaurantService.searchRestaurantByName(searchRestaurantInput);
    }
}

@Resolver(of => Category)
export class CategoryResolver {
    constructor(private readonly restaurantService: RestaurantService){}

    @ResolveField(type => Int)
    restaurantCount(@Parent() category: Category): Promise<number> {
        return this.restaurantService.countRestaurants(category);
    }
    @Query(type => AllCategoriesOutput)
    allCategories(): Promise<AllCategoriesOutput>{
        return this.restaurantService.allCategories();
    }
    @Query(type => CategoryOutput)
    category(@Args('input') categoryInput: CategoryInput): Promise<CategoryOutput> {
        return this.restaurantService.findCategoryBySlug(categoryInput);
    }

    
}
