import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8080/api/admin';

    constructor(private http: HttpClient) {
    }


    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/users`);
    }


    deleteUser(userId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${userId}`);
    }

    updateUserRole(userId: number, newRole: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/update-role/${userId}`, {role: newRole});
    }
    searchCities(query: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}?q=${query}`);
    }



}