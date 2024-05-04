import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPost } from './Post';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent {
  @Input() allowReplies?: boolean = true;
  @Input() postInfo?: IPost;
  
  @Output() focusReply = new EventEmitter<void>();

  formatPostTime(date?: Date | string): string {
    if (!date) return 'error';
    if (typeof date === 'string') date = new Date(date);

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return interval === 1 ? '1 year ago' : `${interval} years ago`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval === 1 ? '1 month ago' : `${interval} months ago`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval === 1 ? '1 day ago' : `${interval} days ago`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
    }
    
    return 'Just now';
  }

  getProfileImageSrc() {
    return this.postInfo?.user?.profileImagePath ?? '../../assets/icons/defaultUser.png';
  }

  emitReply() {
    this.focusReply.emit();
  }
}
