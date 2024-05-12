import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

export interface FormComponent<T> {
  group: FormGroup;

  fillForm(item: T) : void;

  submitForm(): void;

  prepareDataToSend(): void;

  submitInsert(data: FormData): Observable<any>;

  submitUpdate(data: FormData): Observable<any>;


}
