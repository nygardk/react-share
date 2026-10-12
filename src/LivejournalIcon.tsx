import { RawIconBase, type RawIconProps } from './icons/RawIconBase';

// Layered from the Simple Icons mark so the pencil keeps its own navy and
// white colors instead of being cut out of the circle.
export function LivejournalIcon(props: RawIconProps) {
  return (
    <RawIconBase color="#00B0EA" viewBox="0 0 24 24" {...props}>
      <circle cx="12.76" cy="12.771" r="11.24" />
      <path d="M2.475 8.317 0 5.85C1.125 3.237 3.216 1.14 5.823 0h.006l2.469 2.463c-2.606 1.14-4.695 3.24-5.823 5.854z" />
      <path
        fill="#15374C"
        d="m2.475 8.317 9.143 9.114c1.125-2.613 3.218-4.71 5.823-5.85L8.306 2.461h-.008c-2.606 1.14-4.695 3.24-5.823 5.856z"
      />
      <path fill="white" d="M11.618 17.431c1.125-2.613 3.218-4.71 5.823-5.85l1.538 7.397z" />
      <path
        fill="#15374C"
        d="M18.09 14.696c-1.512.664-2.726 1.885-3.381 3.399l4.27.883-.886-4.282h-.003z"
      />
    </RawIconBase>
  );
}
