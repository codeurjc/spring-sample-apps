import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Book {
    id?: number;
    title: string;
    description: string;
}

const URL = '/api/books/';
@Injectable()
export class BookService {
    constructor(private http: HttpClient) {}

    getBooks(): Observable<Book[]> {
        return this.http.get(URL, { withCredentials: true }).pipe(
            map((response: Book[]) => {
                return response;
            }),
            catchError((error) => this.handleError(error)),
        );
    }

    getBook(id: number | string): Observable<Book> {
        return this.http.get(URL + id, { withCredentials: true }).pipe(
            map((response: Book) => response),
            catchError((error) => this.handleError(error)),
        );
    }

    saveBook(book: Book) {
        const body = JSON.stringify(book);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        });

        if (!book.id) {
            return this.http.post(URL, body, { headers, observe: 'response', withCredentials: true }).pipe(
                map((response: HttpResponse<any>) => response.body),
                catchError((error) => this.handleError(error)),
            );
        } else {
            return this.http.put(URL+book.id, body, { headers, observe: 'response', withCredentials: true }).pipe(
                map((response: HttpResponse<any>) => response.body),
                catchError((error) => this.handleError(error)),
            );
        }
    }

    removeBook(book: Book) {
        const headers = new HttpHeaders({
            'X-Requested-With': 'XMLHttpRequest',
        });

        return this.http.delete(URL + book.id, { withCredentials: true, headers }).pipe(
            map((response) => undefined),
            catchError((error) => this.handleError(error)),
        );
    }

    updateBook(book: Book) {
        const body = JSON.stringify(book);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        });
        return this.http.put(URL + book.id, body, { headers, observe: 'response', withCredentials: true }).pipe(
            map((response: HttpResponse<any>) => response.body),
            catchError((error) => this.handleError(error)),
        );
    }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw('Server error (' + error.status + '): ' + error.text());
    }
}
