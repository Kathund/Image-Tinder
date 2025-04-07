'use client';

type SelectDirectoryProps = {
  showNextButton: () => void;
};

export default function SelectDirectory({ showNextButton }: SelectDirectoryProps) {
  async function getDir() {
    if (window.showDirectoryPicker === undefined) return;
    window.chosenHandle = await window.showDirectoryPicker();
    const fileHandle = await window.chosenHandle.getFileHandle('hi.txt', { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write('this is a file that grants me permission to edit files');
    await writable.close();

    await window.chosenHandle.getDirectoryHandle('trash', { create: true });
    await window.chosenHandle.removeEntry('hi.txt');

    setTimeout(() => {
      showNextButton();
    }, 300);
  }

  return (
    <>
      <div className="flex h-full w-full items-center justify-center rounded-b-2xl" onClick={getDir}>
        <div className="flex w-full flex-col items-center justify-center text-sm">
          <p>Click me to Select Folder</p>
          {window.chosenHandle?.name ? <p>{`You selected ${window.chosenHandle.name}`}</p> : <></>}
        </div>
      </div>
    </>
  );
}
