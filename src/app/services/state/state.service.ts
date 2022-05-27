import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class StateService {
  private loading$ = new BehaviorSubject<boolean>(false);
  private error$ = new BehaviorSubject<string | undefined>('');

  getLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  setLoading(value: boolean) {
    this.loading$.next(value);
  }

  setError(value: string | undefined) {
    this.error$.next(value);
  }

  getError$(): Observable<string | undefined> {
    return this.error$.asObservable();
  }
}
