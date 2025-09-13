'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Logo from '../icons/Logo';
import { cn } from '@/lib/utils';
import { mockUser } from '@/lib/data';
import { LayoutDashboard, BarChart, User, LogOut, Shield, Bot, ShieldCheck } from 'lucide-react';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/coach', label: 'AI Coach', icon: Bot },
  { href: '/leaderboard', label: 'Leaderboard', icon: BarChart },
];

const adminLinks = [
    { href: '/admin', label: 'Submissions', icon: Shield },
    { href: '/admin/heatmaps', label: 'Heatmaps', icon: ShieldCheck },
];

export default function Header() {
  const pathname = usePathname();
  const user = mockUser;
  const isAdmin = true; // In a real app, this would be based on user roles

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">SAI Talent Scout</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              {isAdmin && (
                <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Admin</DropdownMenuLabel>
                    {adminLinks.map(link => (
                         <DropdownMenuItem asChild key={link.href}>
                            <Link href={link.href}>
                                <link.icon className="mr-2 h-4 w-4" />
                                <span>{link.label}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
