import Link from 'next/link';
import {
  ExternalLink,
  Mail,
  AlertCircle,
  Info,
  Shield,
  FileText,
} from 'lucide-react';

export interface LegalSectionProps {
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

export function LegalSection({ id, title, icon: Icon, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-5 flex items-center gap-3">
        {Icon && (
          <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-muted)] text-[var(--accent)]">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <h2 className="text-xl font-bold tracking-[-0.02em] text-[var(--foreground)] md:text-2xl">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-[var(--foreground-secondary)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export interface LegalCardProps {
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: 'default' | 'accent' | 'warning';
  children: React.ReactNode;
}

export function LegalCard({
  title,
  icon: Icon,
  variant = 'default',
  children,
}: LegalCardProps) {
  const variants = {
    default:
      'bg-[var(--surface)] border-[var(--border)]',
    accent:
      'bg-[var(--accent-muted)] border-[var(--accent-muted)]',
    warning:
      'bg-amber-50/70 border-amber-200',
  };

  return (
    <div className={`rounded-2xl border p-5 ${variants[variant]}`}>
      {title && (
        <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-[var(--foreground)]">
          {Icon && <Icon className="h-4 w-4 text-[var(--accent)]" />}
          {title}
        </h3>
      )}
      <div className="text-sm leading-relaxed text-[var(--foreground-secondary)]">
        {children}
      </div>
    </div>
  );
}

export interface LegalListProps {
  items: React.ReactNode[];
}

export function LegalList({ items }: LegalListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[var(--foreground-secondary)]">
          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export interface ExternalLegalLinkProps {
  href: string;
  children: React.ReactNode;
}

export function ExternalLegalLink({ href, children }: ExternalLegalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-hover)] hover:underline"
    >
      {children}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

export interface EmailLinkProps {
  email: string;
}

export function EmailLink({ email }: EmailLinkProps) {
  return (
    <a
      href={`mailto:${email}`}
      className="inline-flex items-center gap-1.5 text-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-hover)] hover:underline"
    >
      <Mail className="h-3.5 w-3.5" />
      {email}
    </a>
  );
}

export interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export function InternalLink({ href, children }: InternalLinkProps) {
  return (
    <Link
      href={href}
      className="text-[var(--accent)] underline-offset-4 transition-colors hover:text-[var(--accent-hover)] hover:underline"
    >
      {children}
    </Link>
  );
}

export { AlertCircle, Info, Shield, FileText };
