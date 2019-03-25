import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';

export interface Book {
    id?: number;
    title: string;
    description: string;
}

const URL = 'https://localhost:8443/api/books/';
@Injectable()
export class BookService {
    constructor(private loginService: LoginService, private http: HttpClient) {}

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(URL, { withCredentials: true }).pipe(catchError((error) => this.handleError(error)));
    }

    getBook(id: number | string): Observable<Book> {
        return this.http.get<Book>(URL + id, { withCredentials: true }).pipe(catchError((error) => this.handleError(error)));
    }

    saveBook(book: Book): Observable<Book> {

        const body = JSON.stringify(book);
        
        const headers = new HttpHeaders({
            Authorization: this.loginService.getAuth(),
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache', // due to IE browser caches API get requests
        });

        console.log(book);

        if (!book.id) {
            return this.http
                .post<Book>(URL, body, { headers, withCredentials: true })
                .pipe(catchError((error) => this.handleError(error)));
        } else {
            return this.http
                .put<Book>(URL + book.id, body, { headers, withCredentials: true })
                .pipe(catchError((error) => this.handleError(error)));
        }
    }

    removeBook(book: Book): Observable<Book> {
        const headers = new HttpHeaders({
            Authorization: this.loginService.getAuth(),
            'X-Requested-With': 'XMLHttpRequest',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache', // due to IE browser caches API get requests
        });

        return this.http
            .delete<Book>(URL + book.id, { withCredentials: true, headers })
            .pipe(catchError((error) => this.handleError(error)));
    }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw('Server error (' + error.status + '): ' + error);
    }
}
