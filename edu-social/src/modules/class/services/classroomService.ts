import request from '../../core/utils/request';
import { Classroom } from '../models';

export async function createClassroom(data = {}) {
  const response = await request({
    url: '/classes',
    method: 'post',
    data: data,
  });
  if (response && response.content) {
    return response.content as Classroom;
  }
  return null;
}

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

export async function getExamByPeriodID(periodID: string) {
  const response = await request({
    url: `exam/period/${periodID}`,
    method: 'get',
  });
  if (response) {
    return response;
  }
  return [];
}
export async function getEnrollsInClass(classID: string) {
  const response = await request({
    url: `enrollment/${classID}`,
    method: 'get',
  });
  if (response) {
    return response;
  }
  return [];
}
export async function requestJoinClass(classCode: string) {
  const response = await request({
    url: 'enrollment',
    method: 'post',
    data: {
      class_code: classCode,
    },
  });
  if (response) {
    return response;
  }
  return null;
}
export async function addStudent(classID: string, email: string) {
  const response = await request({
    url: `classes/${classID}/add-student`,
    method: 'post',
    data: {
      emails: [email],
    },
  });
  if (response) {
    return response;
  }
  return null;
}
export async function acceptRequestToClass(enrollID: string) {
  const response = await request({
    url: 'enrollment/update-status',
    method: 'put',
    data: {
      enrollmentId: enrollID,
      status: '2',
    },
  });
  if (response) {
    return response;
  }
  return null;
}
