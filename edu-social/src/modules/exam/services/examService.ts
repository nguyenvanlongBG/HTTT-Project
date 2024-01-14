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
}
export async function createPeriod(data: any) {
  const response = await request({
    url: 'period/create',
    method: 'post',
    data: data,
  });
  return response;
}
