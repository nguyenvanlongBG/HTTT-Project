<template>
  <div class="container-detail-class">
    <div class="detail">
      <div v-for="period in periods" class="post" :key="period._id">
        <div class="owner-post">
          <AvatarComponent></AvatarComponent>
        </div>
        <div class="description">
          <div>Đề thi</div>
          <div class="actions">
            <q-btn
              color="white"
              text-color="black"
              label="Làm đề"
              @click="() => doExam('65905053dc5fb4428295a053')"
            />
            <q-btn
              color="white"
              text-color="black"
              label="Sửa đề"
              @click="() => editExam('65905053dc5fb4428295a053')"
            />
            <q-btn
              color="white"
              text-color="black"
              label="Lịch sử"
              @click="() => historyExam('65905053dc5fb4428295a053')"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="toolbar-class">
      <div>
        <q-input rounded outlined v-model="text">
          <template v-slot:append> </template>
        </q-input>
      </div>
      <div class="item">
        <div>
          <img
            class="icon-32px"
            src="../../core/assets/pictures/file-and-folder.png"
            alt=""
          />
        </div>
        <span>Tài liệu</span>
      </div>
      <div class="item expand" @click="changeStatusExpand">
        <span>Thành viên</span>
        <span v-if="isExpandingMember"
          ><q-icon name="expand_less" size="32px"></q-icon
        ></span>
        <span v-if="!isExpandingMember"
          ><q-icon name="expand_more" size="32px"></q-icon
        ></span>
      </div>
      <div class="members" v-if="isExpandingMember">
        <div class="member">Nguyễn Văn A</div>
        <div class="member">Nguyễn Văn B</div>
        <div class="add-member">
          <q-icon name="add_circle_outline" size="20px"></q-icon>
          <span>Thêm thành viên</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import AvatarComponent from 'src/modules/core/components/avatar/AvatarComponent.vue';
import { ref } from 'vue';
import { getPeriodsByClassID } from '../services/classroomService';
import router from '../../../router/index';

export default {
  name: 'DetailClassroom',
  components: { AvatarComponent },
  async created() {
    this.periods = await getPeriodsByClassID('6590184b7f8e81ae83f6c124');
  },
  setup() {
    const isExpandingMember = ref(false);
    const periods = ref([]);
    function changeStatusExpand() {
      isExpandingMember.value = !isExpandingMember.value;
    }
    function doExam(examID: string) {
      router.push({
        name: 'exam',
        params: {
          id: examID,
        },
        query: {
          editMode: 1,
        },
      });
    }
    function editExam(examID: string) {
      router.push({
        name: 'exam',
        params: {
          id: examID,
        },
        query: {
          editMode: 2,
        },
      });
    }
    function historyExam(examID: string) {
      router.push({
        name: 'exam',
        params: {
          id: examID,
        },
        query: {
          editMode: 3,
        },
      });
    }
    return {
      periods,
      doExam,
      editExam,
      historyExam,
      isExpandingMember,
      changeStatusExpand,
    };
  },
};
</script>
<style src="../css/index.scss" lang="scss" scoped></style>
