import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuizResolver } from './quiz.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Quiz])],
    providers: [QuizService, QuizResolver],
    controllers: [QuizController],
})
export class QuizModule {}