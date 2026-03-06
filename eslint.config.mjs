import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/components/dashboard/*", "../dashboard/*", "../../dashboard/*"],
              message: "Landing components cannot import dashboard components. Keep landing and dashboard areas separate.",
            },
          ],
        },
      ],
    },
    overrides: [
      {
        files: ["components/dashboard/**/*"],
        rules: {
          "no-restricted-imports": [
            "error",
            {
              patterns: [
                {
                  group: ["@/components/landing/*", "../landing/*", "../../landing/*"],
                  message: "Dashboard components cannot import landing components. Keep landing and dashboard areas separate.",
                },
              ],
            },
          ],
        },
      },
    ],
  },
];

export default eslintConfig;
