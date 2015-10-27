import Ember from 'ember';

export function synonymHelper(params/*, hash*/) {
  let joined = params[0].join(', ');
  return joined;
}

export default Ember.Helper.helper(synonymHelper);
