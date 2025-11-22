import { Component } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { FeedContainer } from './feed-container/feed-container';

@Component({
  selector: 'app-home',
  imports: [Header, FeedContainer],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
