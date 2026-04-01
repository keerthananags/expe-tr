import React from "react";

interface Props { password: string }

const getStrength = (pw: string) => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

const labels = ["", "Weak", "Fair", "Good", "Strong"];
const colors = ["", "#ff4d7d", "#f59e0b", "#10d9a0", "#6c63ff"];

export const PasswordStrength = ({ password }: Props) => {
  if (!password) return null;
  const strength = getStrength(password);
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ background: i <= strength ? colors[strength] : "#1e1e2e" }}
          />
        ))}
      </div>
      <p className="text-xs" style={{ color: colors[strength] }}>
        {labels[strength]}
      </p>
    </div>
  );
};