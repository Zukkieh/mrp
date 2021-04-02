import { createStore } from 'easy-peasy';
import counter from '../counterModel';

const models = {
    counter
};

export const store = createStore(models, {
  name: 'mrp'
});