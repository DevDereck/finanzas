import React, { useState } from 'react';
import { useForm } from 'react-form-hook'; // wait, it's react-hook-form
import { useForm as useRHForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useRHForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setError('');
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Credenciales incorrectas o ha ocurrido un error. Inténtalo nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-text">Bienvenido de nuevo</h3>
        <p className="mt-1 text-sm text-text-secondary">Ingresa a tu cuenta para continuar</p>
      </div>

      {error && (
        <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
          <p className="text-sm text-danger">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="tu@correo.com"
          {...register('email')}
          error={errors.email?.message}
        />
        
        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          error={errors.password?.message}
        />

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link to="/auth/forgot-password" className="font-medium text-primary hover:text-primary-hover">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Iniciar sesión
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-text-secondary">¿No tienes una cuenta? </span>
        <Link to="/auth/register" className="font-medium text-primary hover:text-primary-hover">
          Regístrate
        </Link>
      </div>
    </div>
  );
};
