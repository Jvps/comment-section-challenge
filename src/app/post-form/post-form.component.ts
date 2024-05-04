import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../post-item/Post';
import { IUser } from '../post-item/User';
import { ITextAreaContent } from './TextAreaContent';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  @Input() postList: IPost[];
  @Input() events: Observable<IPost>;
  
  @Output() postListChange = new EventEmitter<IPost[]>();
  @Output() newPost = new EventEmitter<IPost>();
  
  @ViewChild('commentSection') commentSection!: ElementRef;

  textAreaContent: ITextAreaContent = {
    value: '',
    isReply: false,
    parentReplyId: undefined
  };
  idCount: number = 1;
  
  ngOnInit(): void {
    this.events.subscribe(currentPost => {
      
      this.textAreaContent = {
        value: `@${currentPost.user.username} `,
        parentReplyId: currentPost.id,
        isReply: true
      } as ITextAreaContent;
      
      this.commentSection.nativeElement.focus();
    });
  }

  sendComment() {
    const currentText: string = this.textAreaContent?.value?.trim();
    if (currentText === '' || currentText === undefined) return;

    const user: IUser = {
      username: 'João Victor'
    };

    const post: IPost = {
      id: this.getId(),
      text: this.textAreaContent.value,
      user: user,
      date: new Date()
    };

    if (this.textAreaContent.isReply) {
      let updatePost = this.postList.find(post => post.id === this.textAreaContent?.parentReplyId);
      
      if (updatePost) {
        updatePost.postReplies = updatePost?.postReplies ?? [];
        updatePost?.postReplies.push(post);
        localStorage.setItem('posts', JSON.stringify(this.postList));
      }
    } else {
      this.newPost.emit(post);
    }

    this.textAreaContent = {
      isReply: false,
      parentReplyId: undefined,
      value: ''
    } as ITextAreaContent;
  }

  getId(): number {
    const currentId = this.idCount;
    this.idCount++;
    return currentId;
  }
}
