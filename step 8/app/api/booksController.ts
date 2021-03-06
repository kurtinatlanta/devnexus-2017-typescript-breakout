import Kernel from '../../inversify.config';
import { Router, Request, Response } from 'express';
import { IBook } from '../data/interfaces/books';

const router: Router = Router();

export class BooksController {
    private _books: IBook;

    public constructor() { 
        this._books = Kernel.get<IBook>('IBook');
    }

    public Router(): Router {

        router.route('/')

            .get((req: Request, res: Response) => {
                this._books.getAll().then((bkArr) => {
                    res.json(bkArr);
                });
            });

        router.route('/:id')

            .get((req: Request, res: Response) => {
                this._books.get(req.params.id).then((bk) => {
                    if (bk == null || bk === undefined) {
                        res.sendStatus(404);
                    } else {
                        res.json(bk);
                    }
                });
            });

        return router;
    }
}