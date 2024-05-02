import { Component, EventEmitter, Output } from '@angular/core';
import { IPost } from '../post-item/Post';
import { IUser } from '../post-item/User';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  @Output() newPost = new EventEmitter<IPost>();
  textAreaContent: string = '';

  sendComment() {
    if (this.textAreaContent.trim() !== '') {
      const user: IUser = {
        username: 'João Victor'
      };

      const post: IPost = {
        text: this.textAreaContent,
        user: user,
        date: new Date()
      };

      this.newPost.emit(post);

      this.textAreaContent = '';
    }
  }
}
