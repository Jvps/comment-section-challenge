import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { IPost } from '../post-item/Post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  postList: IPost[] = [];
  eventsSubject: Subject<IPost> = new Subject<IPost>();
  
  ngOnInit(): void {
    const localStoragePosts = localStorage.getItem('posts');

    if (localStoragePosts) {
      const storedPosts: IPost[] = JSON
        .parse(localStoragePosts)
        .map((post: IPost) => {
          const postMapReturn: IPost = {
            id: post.id,
            date: new Date(post.date),
            text: post.text,
            user: post.user
          }

          //Verifica se o post tem respostas
          if (post?.postReplies) postMapReturn.postReplies = post.postReplies;

          return postMapReturn;
        });
        
      this.postList = storedPosts ?? [];
    }
  }

  receivePostFromChild(post: IPost) {
    this.postList.push(post);
    localStorage.setItem('posts', JSON.stringify(this.postList));
  }

  focusOnReply(post: IPost) {
    this.eventsSubject.next(post);
  }
}
