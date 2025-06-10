// FORMS

export type LoginFormType = {
  username: string;
  password: string;
  captcha?: string;
};

export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
