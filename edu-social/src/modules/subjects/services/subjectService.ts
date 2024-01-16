import request from '../../core/utils/request';
import { Subject } from '../models';

export async function getAllSubject() {
  const response = await request({
    url: '/subject/all',
    method: 'get',
  });
  if (response) {
    const subjects: Subject[] = response as Subject[];
    return subjects;
  }
  return [];
}
