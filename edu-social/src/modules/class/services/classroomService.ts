import request from '../../core/utils/request';
import { Classroom } from '../models';

export async function getClassByUser(userId: string) {
  const response = await request({
    url: `/classes/user/${userId}`,
    method: 'get',
  });
  if (response && response.content) {
    const classrooms: Classroom[] = response.content as Classroom[];
    console.log(classrooms);
    return classrooms;
  }
  return [];
}

export async function getDetailClass(classId: string) {
  const response = await request({
    url: `/classes/${classId}`,
    method: 'get',
  });
  if (response && response.content) {
    const classrooms: Classroom = response.content as Classroom;
    return classrooms;
  }
  return null;
}
export async function getPeriodsByClassID(classID: string) {
  const response = await request({
    url: `period/class/${classID}`,
    method: 'get',
  });
  if (response) {
    return response;
  }
  return [];
}
