export class SpinnerFunctions {

  static showSpinner(): void {
    let spinner = document.getElementById('global-spinner');
    if(spinner) {
      spinner.style.display = this.checkIsDisplayed() ? 'none' : 'flex';
    }
  }

  static hideSpinner(): void {
    let spinner = document.getElementById('global-spinner');
    if(spinner) {
      console.log('hide')
      spinner.style.display = 'none';
    }
  }

  static checkIsDisplayed(): boolean {
    let spinner = document.getElementById("global-spinner");
    if(spinner){
      return spinner.style.display == 'flex';
    }
    return false;
  }
}
