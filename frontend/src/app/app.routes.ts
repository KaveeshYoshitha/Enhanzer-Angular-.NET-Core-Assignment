import { Routes } from '@angular/router';

import { Books } from './components/books/books';

export const routes: Routes = [
	{ path: '', component: Books },
	{ path: '**', redirectTo: '' },
];
