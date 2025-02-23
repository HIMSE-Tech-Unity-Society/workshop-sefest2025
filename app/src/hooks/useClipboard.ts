/* eslint-disable @typescript-eslint/no-unused-vars */
const useClipboard = () => {
  const copy = async (txt: string) => {
    try {
      await navigator.clipboard.writeText(txt);
      alert('Copied to clipboard!'); // replace this line with your toast notification
    } catch (_err) {
      alert('Failed to copy to clipboard!'); // replace this line with your toast notification
    }
  };

  return { copy };
};

export default useClipboard;
