import abilityTest from './Ability.test';
import basicTypesArray from './BasicTypes/Array.test';
import basicTypesBoolean from './BasicTypes/Boolean.test';

export default function testsuite() {
  abilityTest();
  basicTypesArray();
  basicTypesBoolean();
}