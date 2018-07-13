import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  authors: any;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.getAuthors();
  }
  getAuthors() {
    const observable = this._httpService.getAuthors();
    observable.subscribe(data => {
      console.log(data);
        this.authors = data['data'];
    });
  }
  deleteThisAuthor(authorID) {
    const observable = this._httpService.removeOneAuthor(authorID);
    observable.subscribe(data => {});
    this.getAuthors();
  }

}
