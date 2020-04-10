import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class UserClickedOnceService {
  userClickedOnce = false
  constructor() {}
}
