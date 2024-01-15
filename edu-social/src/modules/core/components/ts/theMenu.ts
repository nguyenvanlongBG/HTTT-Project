import { defineComponent, ref } from 'vue';
import { Menu } from '../../enums/Menu';
import GroupMenu from '../menu/GroupMenu.vue';
import router from 'src/router';
import { getUser } from '../../utils/cookies';

export default defineComponent({
  name: 'TheMenu',
  components: {
    GroupMenu,
  },
  setup() {
    const pageFocus = ref(1);
    const routerNames = [
      'forum',
      'forum',
      'class',
      'groups',
      'groups',
      'groups',
      'groups',
      'bank',
    ];
    function navigateToPage(indexItemMenu = 0, params = null) {
      pageFocus.value = indexItemMenu;
      console.log(params, routerNames, indexItemMenu);
      router.push({ name: routerNames[indexItemMenu] });
    }
    function checkRole(role: number) {
      const user = getUser();
      if (user) {
        if (user.role == role) return true;
      }
      return false;
    }
    return { navigateToPage, pageFocus, Menu, checkRole };
  },
});
