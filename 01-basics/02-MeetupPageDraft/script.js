import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}
/**
 * Возвращает ссылку на изображение agenda-иконки
 * @param type - строка с описанием типа
 * @return {string} - ссылка на изображение
 */
function getIcon(type) {
  return `/assets/icons/icon-${agendaItemIcons[type]}.svg`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

function getDateOnlyString(date) {
  const YYYY = date.getFullYear();
  const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  const DD = date.getDate().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
}

export const app = new Vue({
  el: '#app',

  data: {
    rawMeetup: {},
  },

  mounted() {
    this.fetchMeetup(MEETUP_ID);
  },

  computed: {
    meetup() {
      if (!this.rawMeetup) return null;
      return {
        ...this.rawMeetup,
        cover: this.rawMeetup.imageId
          ? getMeetupCoverLink(this.rawMeetup)
          : undefined,
        agenda: this.rawMeetup.agenda
          ? this.rawMeetup.agenda.map((item) => ({
              ...item,
              icon: getIcon(item.type),
              title: item.title ? item.title : `${agendaItemTitles[item.type]}`,
            }))
          : null,
        date: new Date(this.rawMeetup.date),
        dateOnlyString: getDateOnlyString(new Date(this.rawMeetup.date)),
        localDate: new Date(this.rawMeetup.date).toLocaleString(
          navigator.language,
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          },
        ),
      };
    },
  },

  methods: {
    async fetchMeetup(id) {
      const res = await fetch(`${API_URL}/meetups/${id}`);
      this.rawMeetup = await res.json();
    },
  },
});

window.app = app;
