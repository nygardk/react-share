// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard

/**
 * Interface copyToClipboard params
 */
interface IClipboard {
  /** String value */
  value: string;
}

const copyToClipboard = async ({ value }: IClipboard) => {
  try {
    if (!navigator.clipboard) {
      throw new Error("Browser doesn't have support for native clipboard.");
    }
    return navigator.clipboard.writeText(value);
  } catch (error) {
    throw new Error(String(error));
  }
};

export default copyToClipboard;
