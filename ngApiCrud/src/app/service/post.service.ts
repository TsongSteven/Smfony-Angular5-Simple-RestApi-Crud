import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

  readonly url = "http://localhost:8000/api";

  constructor(private _httpClient: HttpClient) { }

  postBlog(post: Post) {

    const body: Post = {
      id: post.id,
      topic: post.topic,
      description: post.description
    }
    return this._httpClient.post(this.url, body);
  }
  getPost() {

    return this._httpClient.get(this.url);
  }

  updatePost(id, post: Post) {

    const body: Post = {
      id: post.id,
      topic: post.topic,
      description: post.description
    }
    return this._httpClient.put(this.url + "/" + id, body)

  }
  deletePost(id: number) {

    return this._httpClient.delete(this.url + "/" + id);
  }

}
