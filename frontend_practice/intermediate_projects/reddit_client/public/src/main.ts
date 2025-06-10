import './style.css'
import "sharable/dist/sharable.css"
import { PromiseFeedback } from 'sharable';
import { getHomePage } from './components/HomePage';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.append(getHomePage());

