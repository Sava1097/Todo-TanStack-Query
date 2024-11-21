import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import clsx from 'clsx';

const languages = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'ru', label: 'Русский', flag: 'RU' },
  { code: 'pl', label: 'Polish', flag: 'PL' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const handleChange = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute top-1 right-2 md:top-2 md:right-3" asChild>
        <Button
          variant="outline"
          size="default"
          className="flex items-center justify-center gap-2 hover:cursor-pointer"
        >
          <Globe className="w-3 h-3" />
          {languages.find((lng) => lng.code === currentLang)?.flag}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-1" align="start">
        {languages.map((lng) => (
          <DropdownMenuItem
            key={lng.code}
            onClick={() => handleChange(lng.code)}
            className={clsx(
              'flex items-center justify-between hover:cursor-pointer',
              currentLang === lng.code && 'font-semibold bg-muted'
            )}
          >
            <span>{lng.flag}</span>
            <span>{lng.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
