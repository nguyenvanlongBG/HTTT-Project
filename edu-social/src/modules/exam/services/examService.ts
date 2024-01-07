import request from '../../core/utils/request';

export async function getExamByID(examID: string) {
  const response = await request({
    url: 'exam/65905053dc5fb4428295a053',
    method: 'get',
  });
  if (response && response.content) {
    return response.content;
  }
  return [];
}

export async function getAnswersUser() {
  const response = await request({
    url: 'submission/exam-period/659048ada1718a77667f89b9',
    method: 'get',
  });
  if (response && response[0]) return response[0];
  return null;
}

export async function createSubmission(data: any) {
  const response = await request({
    url: 'submission/create',
    method: 'post',
    data: data,
  });
}
