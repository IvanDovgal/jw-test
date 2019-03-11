
function getTitle(vm) {
  const { title } = vm.$options;
  if (title) {
    return typeof title === 'function'
      ? function () {
        try {
          return title.call(vm);
        } catch (e) {
          return '';
        }
      }
      : () => title;
  }
  return () => '';
}

export default {
  created() {
    const title = getTitle(this);
    if (title) {
      if (ENV_SERVER) this.$ssrContext.title = title();
    }
  },
  mounted() {
    const title = getTitle(this);
    if (title) {
      document.title = title();
      this.$disableTitleWatch = this.$watch(title, (newTitle) => {
        document.title = newTitle;
      });
    }
  },
  beforeDestroy() {
    if (this.$disableTitleWatch) this.$disableTitleWatch();
  },
};
