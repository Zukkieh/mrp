import { action, persist } from 'easy-peasy';
import { INITIAL_VALUES } from './shared/utils';

export default {
    counter: {
        counter: INITIAL_VALUES,
        iterate: action((state, payload) => {
            state.counter++;
        })
    },
    // persistedCounter: persist({
    //     persistedCount: 0,
    //     setPersistedCount: action((state, payload) => {
    //         state.persistedCount = payload;
    //     })
    // })
};