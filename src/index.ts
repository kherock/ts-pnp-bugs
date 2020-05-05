import { mapKeys, toUpper } from 'lodash/fp';

import test from './test.json';
import s3 from './test-module';

const transform = mapKeys(toUpper);

console.log(transform(test));

console.log(s3);
