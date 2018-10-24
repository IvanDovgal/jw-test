import Vue from 'vue';
import debounce from 'lodash/debounce';

function getScrollEventTarget(element) {
  let currentNode = element;
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    const { overflowY } = document.defaultView.getComputedStyle(currentNode);
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode;
    }
    currentNode = currentNode.parentNode;
  }
  return window;
}

const DEFAULT_THRESHOLD = 700;

export default Vue.directive('load-more', {

  inserted(el, { value, arg }, vnode) {
    const scrollEventTarget = getScrollEventTarget(el);
    vnode.scrollEventTarget = scrollEventTarget;
    vnode.eventHandler = debounce(value, 100);
    vnode.handleScroll = (event) => {
      const target = event.target === document ? document.documentElement : event.target;
      const threshold = Number(arg || DEFAULT_THRESHOLD);
      const needLoad = (target.scrollTop + target.clientHeight + threshold) >= target.offsetHeight;
      if (needLoad) {
        vnode.eventHandler();
      }
      vnode.needLoad = needLoad;
    };
    scrollEventTarget.addEventListener('scroll', vnode.handleScroll);
  },
  unbind(el, binding, vnode) {
    vnode.scrollEventTarget.removeEventListener('scroll', vnode.handleScroll);
  },
});
