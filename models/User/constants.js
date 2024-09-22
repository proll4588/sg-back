export const GROUP_DEF = {
  id: true,
  title: true,
};

export const STUDENT_DEF = {
  passbookNumber: true,
  name: true,
  Group: { select: GROUP_DEF },
};

export const ROLE_DEF = {
  id: true,
  title: true,
};

export const USER_DEF = {
  id: true,
  login: true,
  Role: { select: ROLE_DEF },
  Student: { select: STUDENT_DEF },
};
