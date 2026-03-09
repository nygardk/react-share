import { IconBase, type IconProps } from './icons/IconBase';

export function NativeShareIcon(props: IconProps) {
  return (
    <IconBase color="#0A84FF" {...props}>
      <path d="M32 14L21 25h7v14h8V25h7L32 14zm-9 29c-3.314 0-6 2.686-6 6v1h30v-1c0-3.314-2.686-6-6-6H23z" />
    </IconBase>
  );
}
