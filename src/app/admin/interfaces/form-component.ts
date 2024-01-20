import {FormGroup} from "@angular/forms";

export interface FormComponent<T> {
  group: FormGroup
  fillForm(item: T) : void
}
