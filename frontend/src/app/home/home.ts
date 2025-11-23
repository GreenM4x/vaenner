import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { FeedContainer } from './feed-container/feed-container';
import { CreatePost } from '../shared/components/create-post/create-post';
import { Auth } from '../shared/components/auth/auth';

@Component({
  selector: 'app-home',
  imports: [Header, FeedContainer, CreatePost, Auth],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
