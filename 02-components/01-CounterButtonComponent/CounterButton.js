export const CounterButton = {
  // Шаблон потребуется отредактировать
  template: `<button type="button" @click="handleBtnClick"> {{ count }}</button>`,

  model: {
    prop: 'count',
    event: 'increment',
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    handleBtnClick() {
      this.$emit('increment', this.count + 1);
    },
  },
};
