import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../object/user';

@Injectable({ providedIn: 'root' })
export class ServiceNameService {
	constructor(private http: HttpRequest<User>) {}
}
