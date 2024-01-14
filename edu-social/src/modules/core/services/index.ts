import request from '../../core/utils/request';

export async function updateQuestion(questionID: string, data: any) {
  const response = await request({
    url: `question/${questionID}`,
    method: 'put',
    data: data,
  });
  return response;
}

export async function createQuestion(data: any) {
  const response = await request({
    url: 'question/create',
    method: 'post',
    data: data,
  });
  return response;
}
