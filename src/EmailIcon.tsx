import { RawIconBase, type RawIconProps } from './icons/RawIconBase';

// Lucide "mail" (ISC license).
export function EmailIcon(props: RawIconProps) {
  return (
    <RawIconBase badge={{ scale: 0.6 }} color="#7f7f7f" outlined {...props}>
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </RawIconBase>
  );
}
