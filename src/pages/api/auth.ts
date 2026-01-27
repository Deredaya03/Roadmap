import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const nombre = data.get('nombre');
  const email = data.get('email');
  const password = data.get('password');

  const { error } = await supabase
    .from('usuarios')
    .insert([{ nombre, email, password }]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ message: "Registro exitoso" }), { status: 200 });
};