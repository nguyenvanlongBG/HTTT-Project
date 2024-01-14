import { QuestionWithAnswer } from 'src/modules/core/models';
import request from '../../core/utils/request';

export async function getQuestionsBySubject(subjectID: string) {
  const response = await request({
    url: `question/subject/${subjectID}`,
    method: 'get',
  });
  if (response) {
    return response as QuestionWithAnswer[];
  }
  return [];
}
