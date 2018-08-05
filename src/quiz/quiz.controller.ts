import { Controller, Get } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';
import { Query , Resolver} from '@nestjs/graphql';

@Controller('quizzes')
export class QuizController {

    constructor(private readonly quizService: QuizService) {}

}