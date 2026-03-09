import IconBase, { type IconProps } from './icons/IconBase';

export default function EmailIcon(props: IconProps) {
  return (
    <IconBase color="#7f7f7f" {...props}>
      <path d="M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z" />
    </IconBase>
  );
}
