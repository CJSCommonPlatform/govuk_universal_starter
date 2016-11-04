import { Injectable } from '@angular/core';


@Injectable()
export class State {

  constructor() {

  }

  go(to, toParams, options) {
    //$state.go(to, toParams, options);
  }

  // goNext(viewModel) {
  //   var nextState = this.getNext(viewModel);
  //   $state.go(nextState);
  // }

  // getNext(viewModel) {
  //   if (angular.isArray($state.current.data.nextState)) {
  //     return this.getNextGivenViewModel(viewModel);
  //   }
  //   return $state.current.data.nextState;
  // }

  // scrollToAnchor(target) {
  //   $location.hash(target);
  //   $anchorScroll();
  // }

  // private getNextGivenViewModel(viewModel) {
  //   var propertyValue = lodash.get(viewModel, $state.current.data.propertyName);
  //   var constant = lodash.get(viewModel, $state.current.data.constantName);

  //   for (var i = 0; i < $state.current.data.nextState.length; i++) {
  //     var candidate = $state.current.data.nextState[i];
  //     var constantValue = lodash.get(constant, candidate.constantValue);

  //     if (propertyValue === constantValue) {
  //       return candidate.stateName;
  //     }
  //   }
  // }
}

