<template>
  <div class="container-exam">
    <div class="body">
      <div class="toolbar-exam">
        <q-btn
          color="primary"
          class="create-question"
          label="Thêm câu hỏi"
          @click="createQuestion()"
        />
      </div>
      <div>
        <QuestionComponent
          v-for="question in questions"
          :key="question._id"
          :question="question"
          :isShowResult="true"
          statusEdit="true"
          :mode="2"
          :subjects="subjects"
        />
      </div>
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
<script src="../ts/bank" lang="ts"></script>
<style src="../css/index.scss" lang="scss"></style>
