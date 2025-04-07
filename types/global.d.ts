export {};

declare global {
  interface Window {
    showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
    chosenHandle?: FileSystemDirectoryHandle;
  }

  interface FileSystemDirectoryHandle {
    values(): AsyncIterable<FileSystemHandle>;
  }
}
