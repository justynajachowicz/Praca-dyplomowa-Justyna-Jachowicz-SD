import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:8080/api/users'; // dostosuj URL

    constructor(private http: HttpClient) {}


    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/all`);
    }



    deleteUser(userId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${userId}`);
    }

    updateUserRole(userId: number, newRole: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/update-role/${userId}`, { role: newRole });
    }

}