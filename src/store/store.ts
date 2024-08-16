import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  isSidebarCollapsed: boolean;
}

const state: State = {
  isSidebarCollapsed: false,
};
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state,
  mutations: {
    toggleSidebar(state) {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    }
  },
})


export function useStore () {
  return baseUseStore(key)
}