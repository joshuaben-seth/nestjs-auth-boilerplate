import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';
import { UserDto } from '../dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @Get()
    // async findAll(): Promise<User[]> {
    //     return this.userService.findAll();
    // }

    @Get('test')
    @UseGuards(AuthGuard())
    testAuthRoute() {
        return {
            message: 'You did it!',
        };
    }

    @Get(':id')
    findOne(@Param('id') id: string): any {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() createUserDto: UserDto) {
        return this.userService.create(createUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User> {
        return this.userService.delete(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UserDto): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }
}
