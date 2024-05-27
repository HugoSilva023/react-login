import * as yup from 'yup';

export const useValidation = () => {
  return yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().email("Digite um email válido").required("O email é obrigatório"),
    password: yup.string().min(6, "A senha deve ter pelo menos 6 digitos").required("A senha é obrigatória"),
    passwordConfirm: yup.string().required("A senha é obrigatória").oneOf([yup.ref("password")], "As senhas devem ser iguais"),
  }).required();
}