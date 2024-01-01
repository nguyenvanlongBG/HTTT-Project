import request from '../../core/utils/request';
import { setAccessToken } from '../../core/utils/cookies';
import { Classroom } from '../models';

export async function getClassByUser(userId: string) {
  const response = await request({
    url: `/classes/user/${userId}`,
    method: 'get',
  });
  if (response) {
    const classrooms: Classroom[] = response as Classroom[];
    return classrooms;
  }
  return [];
}

export async function getDetailClass(classId: string) {
  const response = await request({
    url: `/classes/${classId}`,
    method: 'get',
  });
  if (response) {
    const classrooms: Classroom = response as Classroom;
    return classrooms;
  }
  return null;
}
