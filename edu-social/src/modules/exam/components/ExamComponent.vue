<template>
  <div class="container-exam">
    <div v-if="!isAfterExam" class="body">
      <div class="toolbar-exam" v-if="editMode == 2">
        <q-btn
          color="primary"
          class="create-question"
          label="Thêm câu hỏi"
          @click="createQuestion()"
        />
      </div>
      <div v-if="editMode == 1">
        <QuestionComponent
          v-for="(question, index) in questions"
          :key="question._id"
          :question="question"
          v-model:answer="answersUser[index]"
        />
      </div>
      <div v-if="editMode == 2">
        <QuestionComponent
          v-for="(question, index) in questions"
          :key="question._id"
          :question="question"
          :statusEdit="hasRoleEdit"
          :isShowResult="true"
          :answer="answersUser[index]"
          :mode="editMode"
        />
      </div>
      <div v-if="editMode == 3">
        <QuestionComponent
          v-for="(question, index) in questions"
          :key="question._id"
          :question="question"
          :statusEdit="false"
          :isShowAnswer="true"
          :isShowResult="true"
          :answer="answersUser[index]"
          :mode="editMode"
        />
      </div>
      <div class="toolbar-exam" v-if="editMode == 1">
        <q-btn
          color="primary"
          class="create-question"
          label="Nộp bài"
          @click="submit"
        />
      </div>
    </div>
    <div
      class="body text-h3 flex-center text-primary"
      v-if="isAfterExam && editMode == 1"
    >
      Bạn đã nộp bài thành công
    </div>
    <div class="navbar-questions">
      <div class="numeric-question-board">
        <div class="numeric-question">1</div>
        <div class="numeric-question">2</div>
        <div class="numeric-question">3</div>
        <div class="numeric-question">4</div>
        <div class="numeric-question">5</div>
        <div class="numeric-question">6</div>
        <div class="numeric-question">7</div>
        <div class="numeric-question">8</div>
        <div class="numeric-question">9</div>
        <div class="numeric-question">10</div>
      </div>
    </div>
  </div>
</template>
<script src="../ts/exam.ts" lang="ts"></script>
<style src="../css/index.scss" lang="scss"></style>
