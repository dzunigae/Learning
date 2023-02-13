import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit{
  
  title:string = "List of Posts";
  messagePost:string = 'Message Post';
  postParentMessage:string = 'Message coming from the post parent'

  @Input() fromParent:string;

  constructor(){
    this.fromParent = ''
  }
  ngOnInit(): void {
    
  }
}
