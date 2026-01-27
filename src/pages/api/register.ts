import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
);

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

  return new Response(JSON.stringify({ message: "Éxito" }), { status: 200 });
};