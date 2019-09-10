import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({ _id: id });
    }

    async create(item: User): Promise<User> {
        const newUser = this.userModel(item);
        return await newUser.save();
    }

    async delete(id: string): Promise<User> {
        return await this.userModel.findByIdAndRemove(id);
    }

    async update(id: string, item: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, item, {new: true});
    }

    async findOneByUsername(username: any): Model<User> {
        return await this.userModel.findOne({username});
    }
}
