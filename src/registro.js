import React from 'react';
import './App.css';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//para validação dos campos foi utilizado React Hook Form para simplicação das validações
//schema foi escolhido para verificação dos campos pois o processo de entrada de dados e exibição para usuario é mais dinamico
const schema = yup
  .object({
    nome: yup.string()
    .required("O nome é obrigatório")
    .max(120, "ultrapassou limite de caracter exigido"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("O email é obrigatório")
      .max(120, "ultrapassou limite de caracter exigido"),
    password: yup
      .string()
      .min(6, "A senha deve ter pelo menos 6 digitos")
      .required("A senha é obrigatória"),
    confirmPassword: yup
      .string()
      .required("Confirmar a senha é obrigatório")
      .oneOf([yup.ref("password")], "As senhas devem ser iguais"),
  })
  .required();

function registro() {
  const { register, handleSubmit, watch, formState: { errors } } =useForm({
    resolver: yupResolver(schema),
  });

  
  { /* a função abaixo ira receber os dados do usuario assim que ele clicar em cadastrar*/ }
  function onSubmit(userData){
    console.log(userData)
  }

    console.log(errors)

  return (
   <form onSubmit={handleSubmit(onSubmit)}>  { /* Evento que será acionado quando o botão for acionado  */ }
   <h1>Cadastramento Usuario</h1>
   <label>
     Nome:
     <input {...register("nome")}/>
            <span> <p>{errors.nome?.message}</p></span>           { /* irar mostrar mensagem de erro caso aconteça algum */ }

   </label>
   <label>
     Email:
     <input {...register("email")}/>
            <span> <p>{errors.email?.message}</p></span>

   </label>
     <label>
     Senha:
     <input type="password"{...register("password")}/>
     <span> <p>{errors.password?.message}</p></span>

   </label>


   <label>
     Confirmar Senha:
     <input type="password" {...register("confirmPassword")}/>
     <span> <p>{errors.confirmPassword?.message}</p></span>

   </label>

    <button type='submit'>cadastrar</button>

   </form>
  );
  
}
export default registro;
