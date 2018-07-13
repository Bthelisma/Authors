import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {}
  addAuthor(newAuthor) {
    return this._http.post('/authors', newAuthor);
  }

  getAuthors() {
    return this._http.get('/authors');
  }
  findOneAuthorByID(authorID) {
    return this._http.get('/authors/' + authorID);
  }
  removeOneAuthor(authorID) {
    return this._http.delete('/authors/' + authorID);
  }
  updateOneAuthor(authorID, author) {
    return this._http.put('/authors/' + authorID, author);
    }
  }

