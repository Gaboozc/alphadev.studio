import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // La clave de servicio de Supabase bypasa RLS por completo. Existe
    // porque quien compra una guía no tiene sesión, y lib/ventas.ts es el
    // único lugar que necesita ese privilegio. Si algún otro archivo la
    // importa, es casi seguro un error — y si de verdad hace falta en otro
    // lado, se agrega ese archivo a `ignores` explícitamente, a la vista,
    // en vez de dejar que cualquiera la importe sin darse cuenta.
    files: ["**/*.{ts,tsx}"],
    ignores: ["lib/ventas.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/lib/supabase/admin",
              message:
                "La clave de servicio bypasa RLS. Solo lib/ventas.ts la usa — " +
                "si esto necesita escribir una venta, agrega la función ahí.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
