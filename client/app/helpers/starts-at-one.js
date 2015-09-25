import Ember from 'ember';

export function startsAtOne(params/*, hash*/) {
  try {
    const int = parseInt(params);

    return int + 1;
  }
  catch (e) {
    throw new Error (e);
  }
}

export default Ember.Helper.helper(startsAtOne);
