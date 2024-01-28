import request from '../../core/utils/request';

export async function getExamByID(examID: string) {
  const response = await request({
    url: `exam/${examID}`,
    method: 'get',
  });
  if (response && response.content) {
    return response.content;
  }
  return [];
}

export async function getAnswersUser(userID: string) {
  const response = await request({
    url: $`submission/user/${userID}`,
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
  return response;
}
export async function createPeriod(data: any) {
  const response = await request({
    url: 'period/create',
    method: 'post',
    data: data,
  });
  return response;
}
export async function createExamByPeriod(periodID: string) {
  const response = await request({
    url: `exam/create-exams/${periodID}`,
    method: 'post',
  });
  return response;
}
export async function getExamsByPeriodID(periodID: string) {
  const response = await request({
    url: `exam/period/${periodID}`,
    method: 'get',
  });
  if (response) return response as Exam[];
  return [];
}
