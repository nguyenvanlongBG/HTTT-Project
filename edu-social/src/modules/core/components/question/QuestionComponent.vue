<template>
  <div class="container-question" v-if="!isRefresh">
    <div class="toolbar-question">
      <q-btn
        rounded
        label="Sửa"
        size="16px"
        color="teal"
        @click="changeEditStatus(true)"
        v-if="!isEdit && statusEdit"
      />
      <q-btn
        rounded
        label="Lưu"
        size="16px"
        color="teal"
        @click="saveDataQuestion()"
        v-if="isEdit && statusEdit"
      />
      <q-btn
        rounded
        label="Quay lại"
        size="16px"
        color="teal"
        @click="rollBackDataQuestion()"
        v-if="isEdit && statusEdit"
      />
    </div>
    <div class="question-content">
      <div class="select-subject-level" v-if="isEdit">
        <div class="choose-subject">
          <q-select
            v-model="questionLocal.question.subject_id"
            :options="subjects"
            option-label="subject_name"
            :emit-value="true"
            option-value="subject_id"
            filled
            label="Chọn môn học"
          />
        </div>

        <div class="choose-level">
          <q-select
            v-model="questionLocal.question.level"
            :options="levels"
            option-label="name"
            :emit-value="true"
            option-value="value"
            filled
            label="Chọn mức độ"
          />
        </div>
      </div>
      <EditorComponent
        v-model:content="questionLocal.question.description"
        :isReadonly="!isEdit"
      />
    </div>
    <q-list class="answers" v-if="questionLocal.question.question_type == 1">
      <q-item
        :active="isActive(choose) ? true : false"
        :active-class="isActive(choose)"
        class="answer"
        color="teal"
        tag="label"
        v-for="choose in questionLocal.answers"
        :key="choose._id"
        v-ripple
        @click="updateChooseAnswer(choose._id)"
      >
        <q-item-section class="hidden" avatar top>
          <q-radio
            :disable="isEdit"
            v-model="answer"
            :val="choose._id"
          ></q-radio>
        </q-item-section>
        <q-item-section>
          <div class="content-answer">
            <EditorComponent
              v-model:content="choose.description"
              :isReadonly="!isEdit"
            />
          </div>
        </q-item-section>
      </q-item>
      <div class="add-answer" @click="createAnswer" v-if="isEdit">
        Thêm câu trả lời
      </div>
    </q-list>

    <q-list class="answers" v-if="questionLocal.question.question_type == 2">
      <q-item
        :active="results.includes(answer._id) ? true : false"
        active-class="result"
        class="answer"
        color="teal"
        tag="label"
        v-for="answer in questionLocal.answers"
        :key="answer._id"
        v-ripple
      >
        <q-item-section avatar top>
          <q-checkbox
            :disable="isEdit"
            v-model="results"
            :val="answer._id"
          ></q-checkbox>
        </q-item-section>
        <q-item-section>
          <div class="content-answer">
            <EditorComponent :isReadonly="!isEdit" />
          </div>
        </q-item-section>
      </q-item>
      <div class="add-answer" @click="createAnswer" v-if="isEdit">
        Thêm câu trả lời
      </div>
    </q-list>
  </div>
</template>
<script src="../ts/question.ts" lang="ts"></script>
<style src="../../css/question.scss" lang="scss"></style>
