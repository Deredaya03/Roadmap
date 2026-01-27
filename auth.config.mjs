import { defineConfig } from 'auth-astro';
import Google from '@auth/core/providers/google';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY
);

export default defineConfig({
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { error } = await supabase
        .from('users')
        .upsert({ 
          email: user.email, 
          name: user.name, 
          image: user.image,
        }, { onConflict: 'email' });

      if (error) {
        console.error("Error en Supabase:", error.message);
        return true;
      }
      return true;
    }
  }
});