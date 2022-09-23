import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  constructor() {} // private readonly exampleRepository: Repository<Example> // @InjectRepository(Example)

  async catA() {
    return {
      message: 'cat A'
    };
  }

  async catB() {
    return {
      message: 'cat B'
    };
  }

  async catC() {
    return {
      message: 'cat C'
    };
  }

  async logRequestBody(body) {
    console.log(body);
    return {
      body
    };
  }
}
