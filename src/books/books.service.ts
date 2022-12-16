import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book/book';
import { newBookInput } from './dto/newBook.input';

let books = [
  {
    id: 1,
    title: "test 1",
    author: "Joe",
    price: 1000,
    createdAt: new Date()
  },
  {
    id: 2,
    title: "test 2",
    author: "Maria",
    price: 2000,
    createdAt: new Date()
  },
  {
    id: 3,
    title: "test 3",
    author: "Smith",
    price: 3000,
    createdAt: new Date()
  }
] as Book[]

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>
  ) {}


  findAll(): Promise<Book[]> {
    return this.booksRepository.find()
  }

  findOneById(id: number): Promise<Book> {
    return this.booksRepository.findOneById(id)
  }

  async create(data: newBookInput): Promise<Book> {
    const book = this.booksRepository.create(data)
    await this.booksRepository.save(book)
    
    return book
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.booksRepository.delete(id)

    return result.affected > 0
  }
}
