import Ember from 'ember';

export function shortenPartOfSpeech(params/*, hash*/) {
  switch (params[0]) {
    case 'adjective':
      return 'adj';
    case 'noun':
      return 'n';
    case 'verb':
      return 'v';
    default:
      return params;
  }
}

export default Ember.Helper.helper(shortenPartOfSpeech);
