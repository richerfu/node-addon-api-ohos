import abilityTest from './Ability.test';
import basicTypesArray from './BasicTypes/Array.test';
import basicTypesBoolean from './BasicTypes/Boolean.test';
import basicTypeNumber from './BasicTypes/Number.test';
import basicTypeValue from './BasicTypes/Value.test';

export default function testsuite() {
  abilityTest();
  basicTypesArray();
  basicTypesBoolean();
  basicTypeNumber();
  basicTypeValue();
}