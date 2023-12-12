import {Component, inject} from '@angular/core';
import {SearchService} from "../../../search/services/search.service";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchControl! : FormControl
  private _searchService = inject(SearchService)
  constructor(private fb: FormBuilder) {
    this.searchControl = this.fb.control('')

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe({
        next: (query) => {
          this.search(query)

        }
      })
  }
  search(query: string) {
    this._searchService.querySignal.set(query)
    console.log('from bar', this._searchService.querySignal().length)
    this._searchService.search(query)
  }
}
