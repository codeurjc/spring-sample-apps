import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

const URL = '/api';

export interface User {
    id?: number;
    name: string;
    roles: string[];
}

@Injectable()
export class LoginService {
    isLogged = false;
    isAdmin = false;
    user: User;

    constructor(private http: HttpClient) {
        this.reqIsLogged();
    }

    reqIsLogged(): void {
        const headers = new HttpHeaders({
            'X-Requested-With': 'XMLHttpRequest',
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache" // due to IE browser caches API get requests
        });

        this.http.get(URL + '/logIn', { withCredentials: true, headers }).subscribe(
            (response: User) => this.processLogInResponse(response),
            (error: HttpErrorResponse) => {
                if (error.status !== 401) {
                    console.error('Error when asking if logged: ' + JSON.stringify(error));
                }
            },
        );
    }

    private processLogInResponse(response: User) {
        this.isLogged = true;
        this.user = response;
        this.isAdmin = this.user.roles.indexOf('ROLE_ADMIN') !== -1;
    }

    logIn(user: string, pass: string) {
        console.log('user:' + user + ' pass:' + pass);

        const userPass = user + ':' + pass;

        const headers = new HttpHeaders({
            Authorization: 'Basic ' + utf8_to_b64(userPass),
            'X-Requested-With': 'XMLHttpRequest',
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache" // due to IE browser caches API get requests
        });

        return this.http.get(URL + '/logIn', { withCredentials: true, headers }).pipe(
            map((response: User) => {
                this.processLogInResponse(response);
                return this.user;
            }),
        );
    }

    logOut() {
        return this.http.get(URL + '/logOut', { withCredentials: true }).pipe(
            map((response) => {
                this.isLogged = false;
                this.isAdmin = false;
                return response;
            }),
        );
    }
}

function utf8_to_b64(str) {
    return btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode(<any>'0x' + p1);
        }),
    );
}
