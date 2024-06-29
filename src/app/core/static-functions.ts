export class SpinnerFunctions {
  

  static showSpinner(): void {
    let spinner = document.getElementById('global-spinner');
    if(spinner) {
      spinner.style.display = !this.checkIsDisplayed() ? 'none' : 'flex';
    }
  }

  static hideSpinner(): void {
    let spinner = document.getElementById('global-spinner');
    if(spinner) {
      spinner.style.display = 'none';
    }
  }

  static checkIsDisplayed(): boolean {
    return !!document.getElementById("global-spinner");
  }
}
