import { RawIconBase, type RawIconProps } from './icons/RawIconBase';

// Lucide "share" (ISC license).
export function NativeShareIcon(props: RawIconProps) {
  return (
    <RawIconBase badge={{ scale: 0.6 }} color="#0A84FF" outlined {...props}>
      <path d="M12 2v13" />
      <path d="m16 6-4-4-4 4" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    </RawIconBase>
  );
}
