// const h = require('hyperscript')
// const { div, h1 } = require('hyperscript-helpers')(h)
// import h from 'hyperscript';
import hh from 'hyperscript-helpers';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
const { div, h1, button, br } = hh(h)
const initialModel = 0
const view = (dispatch, model) => {
  return div([
  div({classname: 'mv2'},`count : ${model}`),
  button({className: 'pv1 ph2 mr2', onclick: () => dispatch('plus', model)},'+'),
  button({className: 'pv1 ph2', onclick: () => dispatch('minus', model)}, '-')
  ])};
const updateModel = (msg, model) => {
  switch (msg) {
    case 'plus':
      return model + 1;
      break;
    case 'minus':
      return model -1;
      break;
    default:
      break;
  }
}
// impure function, mutation, dom 
function app(initialModel, udpateModel, view, node) {
  let model = initialModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg, model) {
    let updatedModel = updateModel(msg, model);
    let updatedView = view(dispatch, updatedModel)
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    // node.replaceChild(updatedView, currentView);
    currentView = updatedView;
  }
}
const rootNode = document.getElementById('app');
app(initialModel, updateModel, view, rootNode);
// console.log(h1('hello world'))
// rootNode.appendChild(view(initialModel))