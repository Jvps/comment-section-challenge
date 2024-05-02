import { Component, OnInit } from '@angular/core';
import { IPost } from '../post-item/Post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  postList: IPost[] = [];
  
  ngOnInit(): void {
    const localStoragePosts = localStorage.getItem('posts');

    if (localStoragePosts) {
      const storedPosts: IPost[] = JSON
        .parse(localStoragePosts)
        .map((post: IPost) => {
          return {
            date: new Date(post.date),
            text: post.text,
            user: post.user
          };
        });
        
      this.postList = storedPosts ?? [];
    }
  }

  receivePostFromChild(post: IPost) {
    this.postList.push(post);
    localStorage.setItem('posts', JSON.stringify(this.postList));
  }
}
