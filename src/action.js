export const ADD_TODO = 'ADD_TODO';

export const VisibilityFilters = { // 其他常量
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}


export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}
