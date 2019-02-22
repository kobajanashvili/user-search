import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {

  size = 8;

  constructor(private http: Http) {}

  getUsers() {
    return this.http.get('https://randomuser.me/api/?inc=genre,name,picture,location&results='+this.size+'&nat=gb')
      .pipe(map(response => response.json()))
      .pipe(map(response => response.results))
      .pipe(map(users => {
        return users.map(u => {
          return {
            name: u.name.first + ' ' + u.name.last,
            image: u.picture.large,
            geo: u.location.city + ' ' + u.location.state + ' ' + u.location.street
          };
        });
      }));
  }

  setSize(size) {
    this.size = size;
  }

  // users = [
  //   {name: 'Alex 1'},
  //   {name: 'Alex 2'},
  //   {name: 'Alex 3'},
  //   {name: 'Alex 4'},
  //   {name: 'Alex 5'}
  // ]

}
