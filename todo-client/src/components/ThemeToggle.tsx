import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const root = document.documentElement;
  useEffect(() => {
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [isDark, root.classList]);

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => setIsDark((prev) => !prev)}
        className="flex items-center gap-2 hover:cursor-pointer"
      >
        {isDark ? <Sun size={12} /> : <Moon size={12} />}
      </Button>
    </div>
  );
};
